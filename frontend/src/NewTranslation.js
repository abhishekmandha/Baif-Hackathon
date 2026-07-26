import React, { useState } from 'react';
import { ArrowRight, FileText, Music, Type, Video } from 'lucide-react';
import FileUploadArea from './components/FileUploadArea';

const LANGUAGE_OPTIONS = [
  'Hindi (auto-detect)',
  'English',
  'Marathi',
  'Telugu',
  'Tamil',
  'Kannada',
  'Malayalam',
  'Gujarati',
];

const OUTPUT_FORMATS = [
  { id: 'txt', label: 'Translated text', icon: FileText },
  { id: 'audio', label: 'Dubbed audio', icon: Music },
  { id: 'srt', label: 'SRT Subtitles', icon: Type },
  { id: 'video', label: 'Captioned video', icon: Video },
];

const NewTranslation = ({ onStart }) => {
  const [sourceLanguage, setSourceLanguage] = useState('Hindi (auto-detect)');
  const [targetLanguage, setTargetLanguage] = useState('Marathi');
  const [selectedFormats, setSelectedFormats] = useState(['txt', 'audio', 'srt', 'video']);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileSelect = (file) => {
    setUploadedFile(file);
  };

  const toggleFormat = (formatId) => {
    setSelectedFormats(prev => 
      prev.includes(formatId) 
        ? prev.filter(id => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handleStartTranslation = () => {
    if (!uploadedFile) {
      alert('Please upload a file first');
      return;
    }
    onStart?.();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Upload Section */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Upload Your Media</h2>
        <FileUploadArea onFileSelect={handleFileSelect} />
        {uploadedFile && (
          <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
            <div className="w-5 h-5 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
            <span className="text-sm font-medium text-green-800 dark:text-green-300">{uploadedFile.name} uploaded successfully</span>
          </div>
        )}
      </div>

      {/* Language Configuration */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Configure Languages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Source language</label>
            <select 
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white font-medium"
            >
              {LANGUAGE_OPTIONS.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Target language</label>
            <select 
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white font-medium"
            >
              {LANGUAGE_OPTIONS.filter(lang => lang !== sourceLanguage).map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Output Formats */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Select Output Formats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {OUTPUT_FORMATS.map(format => (
            <button
              key={format.id}
              onClick={() => toggleFormat(format.id)}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-3 ${
                selectedFormats.includes(format.id)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
              }`}
            >
              <format.icon className={`w-6 h-6 ${
                selectedFormats.includes(format.id)
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400'
              }`} />
              <span className={`text-xs font-medium text-center leading-tight ${
                selectedFormats.includes(format.id)
                  ? 'text-blue-700 dark:text-blue-300'
                  : 'text-slate-700 dark:text-slate-300'
              }`}>
                {format.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Translation Summary</h3>
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <p><span className="font-medium">File:</span> {uploadedFile?.name || 'No file selected'}</p>
          <p><span className="font-medium">Languages:</span> {sourceLanguage} → {targetLanguage}</p>
          <p><span className="font-medium">Outputs:</span> {selectedFormats.length} format(s) selected</p>
        </div>
      </div>

      {/* Start Button */}
      <button 
        onClick={handleStartTranslation}
        disabled={!uploadedFile}
        className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
          uploadedFile
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30'
            : 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
        }`}
      >
        <span>▷ Start Translation</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default NewTranslation;