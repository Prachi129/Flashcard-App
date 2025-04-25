import React from 'react';
import { motion } from 'framer-motion';

interface RecallButtonsProps {
  onSelectScore: (score: number) => void;
  isDisabled: boolean;
}

const recallOptions = [
  { score: 0, label: "I didn't know this", description: "Completely forgot" },
  { score: 1, label: "Incorrect, wrong guess", description: "Tried but guessed wrong" },
  { score: 2, label: "Incorrect, remembered with hint", description: "Missed at first, recalled with help" },
  { score: 3, label: "Correct, but difficult", description: "Struggled but got it right" },
  { score: 4, label: "Correct with hesitation", description: "Right, but took a moment" },
  { score: 5, label: "Perfect recall", description: "Remembered instantly and confidently" }
];

const RecallButtons: React.FC<RecallButtonsProps> = ({ onSelectScore, isDisabled }) => {
  const getButtonColor = (score: number) => {
    if (score <= 1) return 'bg-red-500 hover:bg-red-600 focus:ring-red-300 dark:focus:ring-red-800';
    if (score === 2) return 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-300 dark:focus:ring-orange-800';
    if (score === 3) return 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300 dark:focus:ring-yellow-800';
    if (score === 4) return 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 dark:focus:ring-blue-800';
    return 'bg-green-500 hover:bg-green-600 focus:ring-green-300 dark:focus:ring-green-800';
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-center mb-4">How well did you remember this?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {recallOptions.map((option, index) => (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            key={option.score}
            onClick={() => !isDisabled && onSelectScore(option.score)}
            disabled={isDisabled}
            className={`${getButtonColor(option.score)} text-white px-4 py-3 rounded-xl 
              font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 
              transition-all duration-200 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-xl font-bold">{option.score}</span>
              <div className="text-left">
                <span className="block font-medium leading-none">{option.label}</span>
                <span className="text-xs opacity-80">{option.description}</span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RecallButtons;