import React, { useState } from 'react';
import { useFlashcardStore } from '../store/flashcardStore';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ProgressBar from './ProgressBar';

const StatsPanel: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { stats, cards } = useFlashcardStore(state => ({ 
    stats: state.stats,
    cards: state.cards
  }));

  // Calculate bucket distribution
  const today = new Date();
  const todayDate = today.setHours(0, 0, 0, 0);
  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(todayDate);
    date.setDate(date.getDate() + i);
    return date.getTime();
  });

  const buckets = nextDays.map(date => {
    return {
      day: formatDistanceToNow(date, { addSuffix: true }).replace('in ', ''),
      count: cards.filter(card => {
        const reviewDate = new Date(card.nextReviewDate).setHours(0, 0, 0, 0);
        return reviewDate === date;
      }).length
    };
  });

  // Calculate level distribution
  const levelDistribution = [
    {
      level: 'New',
      count: cards.filter(card => card.repetition === 0).length
    },
    {
      level: 'Learning',
      count: cards.filter(card => card.repetition > 0 && card.repetition < 5).length
    },
    {
      level: 'Review',
      count: cards.filter(card => card.repetition >= 5).length
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
    >
      <div 
        className="p-4 cursor-pointer flex justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="font-semibold text-lg">Learning Statistics</h2>
        <button 
          className={`p-1 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          aria-label={expanded ? 'Collapse statistics' : 'Expand statistics'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div>
      
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="p-4 pt-0 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Total Flashcards
              </h3>
              <p className="text-2xl font-bold">{cards.length}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Reviews Today
              </h3>
              <p className="text-2xl font-bold">{stats.completedToday}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Success Rate
              </h3>
              <p className="text-2xl font-bold">
                {stats.totalReviewed > 0
                  ? `${Math.round((stats.correctReviews / stats.totalReviewed) * 100)}%`
                  : '0%'}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Mastery Level Progress
            </h3>
            <div className="flex flex-wrap gap-3">
              {levelDistribution.map(level => (
                <div key={level.level} className="flex-1 min-w-[150px]">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{level.level}</span>
                    <span>{level.count} cards</span>
                  </div>
                  <ProgressBar 
                    value={level.count} 
                    max={cards.length}
                    color={
                      level.level === 'New' 
                        ? 'blue' 
                        : level.level === 'Learning' 
                          ? 'yellow' 
                          : 'green'
                    }
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
              Upcoming Reviews
            </h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={buckets}
                  margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <YAxis 
                    allowDecimals={false}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: '#E5E7EB' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '0.5rem',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsPanel;