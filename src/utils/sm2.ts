import { Card } from '../types';

const DEFAULT_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

export const calculateNextReview = (card: Card, score: number): Partial<Card> => {
  // Clone card data to avoid modifying original
  let easeFactor = card.easeFactor;
  let interval = card.interval;
  let repetition = card.repetition;
  
  // Implementation of SM2 algorithm
  if (score >= 3) {
    // Update ease factor if recall was successful
    easeFactor = easeFactor + (0.1 - (5 - score) * (0.08 + (5 - score) * 0.02));
    
    // Make sure ease factor is at least 1.3
    easeFactor = Math.max(easeFactor, MIN_EASE_FACTOR);
    
    // Calculate next interval
    if (repetition === 0) {
      interval = 1;
    } else if (repetition === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    
    // Increment repetition count
    repetition += 1;
  } else {
    // If recall was difficult, reset repetition and interval
    repetition = 0;
    interval = 1;
    
    // Ease factor is decreased but maintained above minimum
    easeFactor = Math.max(easeFactor - 0.2, MIN_EASE_FACTOR);
  }
  
  // Calculate next review date (days from now)
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  
  return {
    easeFactor,
    interval,
    repetition,
    lastReviewed: new Date().toISOString(),
    nextReviewDate: nextReviewDate.toISOString()
  };
};

export const isCardDue = (card: Card): boolean => {
  if (card.nextReviewDate === null) return true;
  
  const nextReviewTime = new Date(card.nextReviewDate).getTime();
  const currentTime = new Date().getTime();
  
  return currentTime >= nextReviewTime;
};

export const getNumberWordMap = (): Record<number, string> => {
  const numberWords: Record<number, string> = {
    1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five',
    6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten',
    11: 'Eleven', 12: 'Twelve', 13: 'Thirteen', 14: 'Fourteen', 15: 'Fifteen',
    16: 'Sixteen', 17: 'Seventeen', 18: 'Eighteen', 19: 'Nineteen', 20: 'Twenty',
    30: 'Thirty', 40: 'Forty', 50: 'Fifty', 60: 'Sixty', 70: 'Seventy',
    80: 'Eighty', 90: 'Ninety', 100: 'One Hundred'
  };
  
  // Fill in 21-99
  for (let i = 21; i <= 99; i++) {
    if (!numberWords[i]) {
      const tens = Math.floor(i / 10) * 10;
      const ones = i % 10;
      if (ones !== 0) {
        numberWords[i] = `${numberWords[tens]}-${numberWords[ones]}`;
      }
    }
  }
  
  return numberWords;
};