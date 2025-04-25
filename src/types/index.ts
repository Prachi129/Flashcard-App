export interface Card {
  id: string;
  front: string;
  back: string;
  easeFactor: number;
  interval: number;
  repetition: number;
  lastReviewed: string | null;
  nextReviewDate: string;
}

export interface Stats {
  totalReviewed: number;
  correctReviews: number;
  completedToday: number;
  streakDays: number;
  lastReviewDate: string | null;
}

export interface FlashcardState {
  cards: Card[];
  dueCards: Card[];
  currentCardIndex: number;
  stats: Stats;
  
  getCurrentCard: () => Card | null;
  recordAnswer: (score: number) => void;
  resetSession: () => void;
}