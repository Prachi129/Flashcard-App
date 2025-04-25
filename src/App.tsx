import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Flashcard, Footer, Header, StatsPanel } from './components';
import { useFlashcardStore } from './store/flashcardStore';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

function App() {
  const { 
    dueCards, 
    currentCardIndex, 
    totalReviewed, 
    completedToday 
  } = useFlashcardStore(state => ({
    dueCards: state.dueCards,
    currentCardIndex: state.currentCardIndex,
    totalReviewed: state.stats.totalReviewed,
    completedToday: state.stats.completedToday
  }));

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl"
          >
            {dueCards.length > 0 ? (
              <>
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                    Card {currentCardIndex + 1} of {dueCards.length}
                  </span>
                </div>
                <Flashcard />
              </>
            ) : (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">All caught up!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {totalReviewed === 0
                    ? "You haven't reviewed any cards yet. Your first review session will be available soon."
                    : `You've completed all reviews for now. Next review will be available ${
                        formatDistanceToNow(new Date(Date.now() + 24 * 60 * 60 * 1000), { addSuffix: true })
                      }`}
                </p>
                {completedToday > 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    You've completed {completedToday} {completedToday === 1 ? 'card' : 'cards'} today
                  </p>
                )}
              </motion.div>
            )}
          </motion.div>
          
          <div className="mt-8 w-full max-w-4xl">
            <StatsPanel />
          </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;