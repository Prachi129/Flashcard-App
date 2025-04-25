import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: 'blue' | 'green' | 'yellow' | 'red';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color = 'blue' }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  
  const getColorClasses = () => {
    switch (color) {
      case 'green':
        return 'bg-green-500 dark:bg-green-600';
      case 'yellow':
        return 'bg-yellow-500 dark:bg-yellow-600';
      case 'red':
        return 'bg-red-500 dark:bg-red-600';
      case 'blue':
      default:
        return 'bg-blue-500 dark:bg-blue-600';
    }
  };
  
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
      <div 
        className={`h-2.5 rounded-full ${getColorClasses()}`} 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;