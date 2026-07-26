import React from 'react';
import { TrendingUp, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

const DashboardCards = ({ metrics }) => {
  const cards = [
    { label: 'Total jobs', value: metrics.totalJobs, icon: TrendingUp, color: 'blue' },
    { label: 'In progress', value: metrics.inProgress, icon: Zap, color: 'orange' },
    { label: 'Completed', value: metrics.completed, icon: CheckCircle2, color: 'green' },
    { label: 'Failed', value: metrics.failed, icon: AlertCircle, color: 'red' },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card, idx) => (
        <div 
          key={idx} 
          className={`border-2 rounded-lg p-6 ${colorClasses[card.color]}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-75">{card.label}</p>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>
            <card.icon className="w-10 h-10 opacity-30" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
