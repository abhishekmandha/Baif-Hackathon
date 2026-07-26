import React from 'react';
import { CheckCircle2, Loader2, Clock, AlertCircle, Download, Play, RotateCcw } from 'lucide-react';

const JobListTable = ({ jobs, onJobSelect, selectedJobId }) => {
  const statusConfig = {
    done: { icon: CheckCircle2, label: 'Done', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    processing: { icon: Loader2, label: 'Processing', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    queued: { icon: Clock, label: 'Queued', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
    failed: { icon: AlertCircle, label: 'Failed', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">File Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">Languages</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">Submitted</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {jobs.map((job) => {
              const status = statusConfig[job.status];
              const StatusIcon = status.icon;
              const isSelected = selectedJobId === job.id;

              return (
                <tr 
                  key={job.id}
                  onClick={() => onJobSelect(job.id)}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium dark:text-slate-200">{job.fileName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{job.sourceLang} → {job.targetLang}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 w-fit px-2.5 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      {job.status === 'processing' ? <StatusIcon className="w-4 h-4 animate-spin" /> : <StatusIcon className="w-4 h-4" />}
                      {status.label}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{job.progress}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{job.submitted}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {job.status === 'done' && (
                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Download">
                          <Download className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        </button>
                      )}
                      {job.status === 'processing' && (
                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="View Details">
                          <Play className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        </button>
                      )}
                      {job.status === 'failed' && (
                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Retry">
                          <RotateCcw className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobListTable;
