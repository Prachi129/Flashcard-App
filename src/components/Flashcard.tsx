import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFlashcardStore } from '../store/flashcardStore';
import RecallButtons from './RecallButtons';

const Flashcard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  
  const { currentCard, recordAnswer } = useFlashcardStore(state => ({
    currentCard: state.getCurrentCard(),
    recordAnswer: state.recordAnswer
  }));

  const handleFlip = () => {
    if (!isAnswering) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleRecallScore = (score: number) => {
    setIsAnswering(true);
    
    // Save previous card for animation purposes
    setTimeout(() => {
      recordAnswer(score);
      setIsFlipped(false);
      setIsAnswering(false);
    }, 300);
  };

  if (!currentCard) return null;

  return (
    <div className="perspective-1000">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <div 
          onClick={handleFlip}
          className={`relative preserve-3d cursor-pointer transition-all duration-500 ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s' }}
        >
          {/* Front of card */}
          <div 
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 h-64 flex flex-col items-center justify-center backface-hidden transition-transform ${
              isFlipped ? 'rotate-y-180 absolute inset-0' : ''
            }`}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              position: isFlipped ? 'absolute' : 'relative',
              top: 0,
              left: 0,
              width: '100%'
            }}
          >
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Number
            </span>
            <h2 className="text-5xl font-bold mb-2">{currentCard.front}</h2>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-4">
                <div>
                  <span className="block text-xs">Ease Factor</span>
                  <span className="font-medium">{currentCard.easeFactor.toFixed(2)}</span>
                </div>
                <div>
                  <span className="block text-xs">Interval</span>
                  <span className="font-medium">{currentCard.interval} days</span>
                </div>
                <div>
                  <span className="block text-xs">Reviews</span>
                  <span className="font-medium">{currentCard.repetition}</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="text-xs text-gray-400 dark:text-gray-500 italic">Click to flip</span>
            </div>
          </div>
          
          {/* Back of card */}
          <div 
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 h-64 flex flex-col items-center justify-center backface-hidden transition-transform ${
              !isFlipped ? 'rotate-y-180 absolute inset-0' : ''
            }`}
            style={{ 
              backfaceVisibility: 'hidden',
              transform: !isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              position: !isFlipped ? 'absolute' : 'relative',
              top: 0,
              left: 0,
              width: '100%'
            }}
          >
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              Spelled Out
            </span>
            <h2 className="text-4xl font-bold mb-4">{currentCard.back}</h2>
            <div className="absolute bottom-3 right-3">
              <span className="text-xs text-gray-400 dark:text-gray-500 italic">Click to flip back</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <RecallButtons onSelectScore={handleRecallScore} isDisabled={isAnswering} />
        </motion.div>
      )}
    </div>
  );
};

export default Flashcard;