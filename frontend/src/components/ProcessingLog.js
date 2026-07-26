import React, { useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const ProcessingLog = ({ logs }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const logIcons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
    warning: AlertCircle,
  };

  const logColors = {
    success: 'text-green-600 dark:text-green-400',
    error: 'text-red-600 dark:text-red-400',
    info: 'text-blue-600 dark:text-blue-400',
    warning: 'text-yellow-600 dark:text-yellow-400',
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Processing Log</h3>
      <div 
        ref={scrollRef}
        className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs space-y-2 border border-slate-200 dark:border-slate-700"
      >
        {logs && logs.length > 0 ? (
          logs.map((log, idx) => {
            const IconComponent = logIcons[log.type] || Info;
            
            return (
              <div key={idx} className="flex gap-2 items-start text-slate-600 dark:text-slate-400">
                <IconComponent className={`w-4 h-4 mt-0.5 flex-shrink-0 ${logColors[log.type]}`} />
                <span className="text-slate-500 dark:text-slate-500 min-w-[70px]">{log.timestamp}</span>
                <span className="flex-1">{log.message}</span>
              </div>
            );
          })
        ) : (
          <div className="text-slate-400 dark:text-slate-500 text-center py-8">
            No logs available yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingLog;
