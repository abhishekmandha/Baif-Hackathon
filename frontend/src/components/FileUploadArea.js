import React from 'react';
import { UploadCloud, FileText, Music, Type, Video } from 'lucide-react';

const FileUploadArea = ({ onFileSelect }) => {
  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.mp4,.mkv,.mp3,.wav,.avi,.txt';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) onFileSelect?.(file);
    };
    input.click();
  };

  return (
    <div 
      onClick={handleClick}
      className="border-2 border-dashed border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-12 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"
    >
      <div className="w-20 h-20 bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-200 dark:border-blue-800">
        <UploadCloud className="w-10 h-10" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Upload your content</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4">Drag & drop your file here, or click to browse</p>
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-slate-400 font-medium border border-slate-200 dark:border-slate-700">
        Supports MP4, MKV, MP3, WAV, AVI, TXT — Max 2 GB
      </div>
    </div>
  );
};

export default FileUploadArea;
