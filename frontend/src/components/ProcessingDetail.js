import React from 'react';
import { X, ArrowLeft } from 'lucide-react';
import PipelineFlow from './PipelineFlow';
import ProcessingLog from './ProcessingLog';
import DownloadGrid from './DownloadGrid';

const ProcessingDetail = ({ job, onClose }) => {
  if (!job) return null;

  const isProcessing = job.status === 'processing';
  const isComplete = job.status === 'done';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{job.fileName}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {job.sourceLang} → {job.targetLang} • Job ID: {job.id}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {isProcessing && (
            <>
              {job.pipeline && <PipelineFlow stages={job.pipeline} />}
              {job.logs && <ProcessingLog logs={job.logs} />}
            </>
          )}

          {isComplete && (
            <>
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                <p className="text-sm font-medium text-green-800 dark:text-green-300">Translation completed successfully</p>
              </div>
              <DownloadGrid outputs={job.outputs} fileName={job.fileName} />
            </>
          )}

          {job.status === 'failed' && (
            <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">✕</div>
              <p className="text-sm font-medium text-red-800 dark:text-red-300">Translation failed. Please try again.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-slate-200 dark:border-slate-700 sticky bottom-0 bg-white dark:bg-slate-800">
          <button 
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          {job.status === 'failed' && (
            <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Retry Translation
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessingDetail;
