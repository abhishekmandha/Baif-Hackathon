import React from 'react';
import { UploadCloud, ArrowRight, FileText, Music, Type, Video } from 'lucide-react';

const NewTranslation = ({ onStart }) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-8 text-center">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-blue-200 dark:border-blue-800">
          <UploadCloud className="w-10 h-10" />
        </div>
        <h3 className="text-xl font-semibold mb-2 dark:text-white">Upload your content</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-6">Drag & drop your file here, or click to browse</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs text-slate-500 dark:text-slate-400 font-medium">
          Supports MP4, MKV, MP3, WAV, AVI — Max 2 GB
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Source language</label>
          <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white">
            <option>Hindi (auto-detect)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Target language</label>
          <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white">
            <option>Marathi</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-3">Output Formats</label>
        <div className="grid grid-cols-4 gap-4">
          {[
            { id: 'txt', label: 'Translated text', icon: FileText },
            { id: 'audio', label: 'Dubbed audio', icon: Music },
            { id: 'srt', label: 'SRT Subtitles', icon: Type },
            { id: 'video', label: 'Captioned video', icon: Video },
          ].map(format => (
            <div key={format.id} className="flex items-center gap-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 cursor-pointer hover:border-blue-500 transition-colors">
              <format.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium dark:text-slate-200">{format.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={onStart}
        className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
      >
        Start translation <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default NewTranslation;