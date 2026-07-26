import React from 'react';
import { FileText, Music, Type, Video, Download } from 'lucide-react';

const DownloadGrid = ({ outputs, fileName }) => {
  const downloadItems = [
    { id: 'transcript', label: 'Translated transcript', format: '.txt', icon: FileText, size: outputs?.transcript || '24KB' },
    { id: 'audio', label: 'Dubbed audio', format: '.wav', icon: Music, size: outputs?.audio || '12MB' },
    { id: 'subtitles', label: 'Subtitles', format: '.srt', icon: Type, size: outputs?.subtitles || '45KB' },
    { id: 'video', label: 'Captioned video', format: '.mp4', icon: Video, size: outputs?.video || '180MB' },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Available Downloads</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {downloadItems.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.format} • {item.size}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-blue-500 hover:text-white text-slate-400 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DownloadGrid;
