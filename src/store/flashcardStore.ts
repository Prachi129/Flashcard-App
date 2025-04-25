import { create } from 'zustand';
import { calculateNextReview, isCardDue, getNumberWordMap } from '../utils/sm2';
import { Card, FlashcardState, Stats } from '../types';

const numberWords = getNumberWordMap();

// Initialize cards with numbers 1-100 and their written forms
const initialCards: Card[] = Array.from({ length: 100 }, (_, i) => {
  const num = i + 1;
  return {
    id: num.toString(),
    front: num.toString(),
    back: numberWords[num] || `Number ${num}`,
    easeFactor: 2.5,
    interval: 1,
    repetition: 0,
    lastReviewed: null,
    nextReviewDate: new Date().toISOString() // Initially all cards are due
  };
});

const initialStats: Stats = {
  totalReviewed: 0,
  correctReviews: 0, // score >= 3
  completedToday: 0,
  streakDays: 0,
  lastReviewDate: null
};

export const useFlashcardStore = create<FlashcardState>((set, get) => ({
  cards: initialCards,
  dueCards: initialCards.filter(card => isCardDue(card)),
  currentCardIndex: 0,
  stats: initialStats,
  
  getCurrentCard: () => {
    const { dueCards, currentCardIndex } = get();
    return dueCards[currentCardIndex] || null;
  },
  
  recordAnswer: (score: number) => {
    set(state => {
      const { cards, dueCards, currentCardIndex, stats } = state;
      const currentCard = dueCards[currentCardIndex];
      
      if (!currentCard) return state;
      
      // Update card with SM2 algorithm results
      const updatedCardData = calculateNextReview(currentCard, score);
      
      // Find this card in the main cards array
      const updatedCards = cards.map(card => 
        card.id === currentCard.id
          ? { ...card, ...updatedCardData }
          : card
      );
      
      // Filter out the current card from due cards
      const updatedDueCards = dueCards.filter((_, index) => index !== currentCardIndex);
      
      // Update stats
      const today = new Date().toISOString().split('T')[0];
      const lastReviewDate = stats.lastReviewDate ? 
        stats.lastReviewDate.split('T')[0] : null;
      
      let updatedStats = {
        ...stats,
        totalReviewed: stats.totalReviewed + 1,
        correctReviews: score >= 3 ? stats.correctReviews + 1 : stats.correctReviews,
        completedToday: lastReviewDate === today ? stats.completedToday + 1 : 1,
        lastReviewDate: new Date().toISOString()
      };
      
      // Handle streak counting
      if (lastReviewDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];
        
        updatedStats.streakDays = lastReviewDate === yesterdayString 
          ? stats.streakDays + 1 
          : 1;
      }
      
      return {
        cards: updatedCards,
        dueCards: updatedDueCards,
        currentCardIndex: Math.min(currentCardIndex, updatedDueCards.length - 1),
        stats: updatedStats
      };
    });
  },
  
  resetSession: () => {
    set(state => ({
      ...state,
      dueCards: state.cards.filter(card => isCardDue(card)),
      currentCardIndex: 0
    }));
  }
}));