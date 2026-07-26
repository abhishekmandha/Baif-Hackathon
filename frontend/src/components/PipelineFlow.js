import React from 'react';
import { CheckCircle2, Loader2, Clock, AlertCircle } from 'lucide-react';

const PipelineFlow = ({ stages }) => {
  const stageConfig = {
    complete: { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' },
    active: { icon: Loader2, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' },
    pending: { icon: Clock, color: 'text-slate-400', bg: 'bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600' },
    failed: { icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' },
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 mb-6">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Pipeline Progress</h3>
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        {stages.map((stage, idx) => {
          const config = stageConfig[stage.status];
          const Icon = config.icon;
          
          return (
            <React.Fragment key={idx}>
              <div className={`flex flex-col items-center gap-2 min-w-max`}>
                <div className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center ${config.bg} ${config.color}`}>
                  {stage.status === 'active' ? (
                    <Icon className="w-8 h-8 animate-spin" />
                  ) : (
                    <Icon className="w-8 h-8" />
                  )}
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center">{stage.name}</span>
              </div>
              {idx < stages.length - 1 && (
                <div className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 mb-8 min-w-[20px]" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineFlow;
