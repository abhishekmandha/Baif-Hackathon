import React, { useState } from 'react';
import './App.css';
import { 
  LayoutGrid, 
  PlusCircle, 
  Database, 
  Settings, 
  User, 
  Video, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Loader2,
  ArrowRight,
  FileText,
  Music,
  Type,
  Download,
  UploadCloud,
  ChevronRight
} from 'lucide-react';

// Mock Data
const MOCK_JOBS = [
  {
    id: '1',
    fileName: 'krishivaarta_ep12.mp4',
    sourceLang: 'Hindi',
    targetLang: 'Marathi',
    status: 'done',
    progress: 100,
    submitted: '2023-10-24 10:00 AM',
    outputs: { transcript: '24KB', audio: '12MB', subtitles: '45KB', video: '180MB' }
  },
  {
    id: '2',
    fileName: 'soil_health_webinar.mp4',
    sourceLang: 'Hindi',
    targetLang: 'Marathi',
    status: 'processing',
    progress: 65,
    submitted: '2023-10-24 11:15 AM',
    pipeline: [
      { name: 'Validate', status: 'complete' },
      { name: 'FFmpeg', status: 'complete' },
      { name: 'Whisper', status: 'complete' },
      { name: 'IndicTrans2', status: 'active' },
      { name: 'Piper TTS', status: 'pending' },
      { name: 'Output', status: 'pending' }
    ],
    logs: [
      { timestamp: '11:15:02', message: 'File uploaded successfully', type: 'success' },
      { timestamp: '11:15:45', message: 'FFmpeg extraction complete', type: 'success' },
      { timestamp: '11:18:12', message: 'Whisper transcription finished', type: 'success' },
      { timestamp: '11:18:14', message: 'Translating text via IndicTrans2...', type: 'info' },
    ]
  },
  {
    id: '3',
    fileName: 'dairy_farming_tips.mp4',
    sourceLang: 'Hindi',
    targetLang: 'Marathi',
    status: 'queued',
    progress: 0,
    submitted: '2023-10-24 11:20 AM'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState('new');
  const [selectedJob, setSelectedJob] = useState(null);

  const renderStatusIcon = (status) => {
    switch(status) {
      case 'done': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'processing': return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'queued': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white p-1.5 rounded-lg">
              <Video className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">BAIF Translation Platform</h1>
          </div>
          <div className="flex items-center gap-3 bg-blue-800 px-4 py-1.5 rounded-full border border-blue-600">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Welcome, Ravi</span>
          </div>
        </div>
      </header>

      {/* Main Nav Tabs */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex gap-8">
          {[
            { id: 'new', label: 'New translation', icon: PlusCircle },
            { id: 'jobs', label: 'My jobs', icon: LayoutGrid },
            { id: 'repo', label: 'Repository', icon: Database },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedJob(null); }}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'new' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-blue-200">
                <UploadCloud className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload your content</h3>
              <p className="text-slate-500 mb-6">Drag & drop your file here, or click to browse</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg text-xs text-slate-500 font-medium">
                Supports MP4, MKV, MP3, WAV, AVI — Max 2 GB
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Source language</label>
                <select className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option>Hindi (auto-detect)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Target language</label>
                <select className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500">
                  <option>Marathi</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <label className="text-sm font-semibold text-slate-700 block mb-3">Output Formats</label>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { id: 'txt', label: 'Translated text', icon: FileText },
                  { id: 'audio', label: 'Dubbed audio', icon: Music },
                  { id: 'srt', label: 'SRT Subtitles', icon: Type },
                  { id: 'video', label: 'Captioned video', icon: Video },
                ].map(format => (
                  <div key={format.id} className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg bg-white cursor-pointer hover:border-blue-500 transition-colors">
                    <format.icon className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">{format.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('jobs')}
              className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
            >
              Start translation <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Total jobs', value: 24, color: 'bg-white' },
                { label: 'In progress', value: 3, color: 'bg-blue-50 text-blue-700' },
                { label: 'Completed', value: 19, color: 'bg-green-50 text-green-700' },
                { label: 'Failed', value: 2, color: 'bg-red-50 text-red-700' },
              ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-xl border border-slate-200 shadow-sm ${stat.color}`}>
                  <p className="text-sm font-medium opacity-80 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Job Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm font-semibold">
                  <tr>
                    <th className="px-6 py-4">File Name</th>
                    <th className="px-6 py-4">Languages</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Progress</th>
                    <th className="px-6 py-4">Submitted</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_JOBS.map((job) => (
                    <tr 
                      key={job.id} 
                      className="hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedJob(job)}
                    >
                      <td className="px-6 py-4 font-medium flex items-center gap-2">
                        <Video className="w-4 h-4 text-slate-400" /> {job.fileName}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{job.sourceLang}</span>
                        <span className="mx-2 text-slate-300">→</span>
                        <span className="bg-blue-50 px-2 py-1 rounded text-blue-700">{job.targetLang}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold capitalize ${
                          job.status === 'done' ? 'bg-green-100 text-green-700' :
                          job.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                          job.status === 'queued' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {renderStatusIcon(job.status)}
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 w-48">
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${job.status === 'failed' ? 'bg-red-500' : 'bg-blue-600'}`} 
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">{job.submitted}</td>
                      <td className="px-6 py-4">
                        {job.status === 'done' ? (
                          <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">Download</button>
                        ) : (
                          <button className="text-slate-400 hover:text-slate-600 font-semibold text-sm">View Details</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Detail View Container */}
            {selectedJob && (
              <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-end z-50">
                <div className="w-full max-w-2xl bg-white h-screen shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">{selectedJob.fileName}</h2>
                    <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-slate-100 rounded-full">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>

                  {selectedJob.status === 'processing' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-sm font-semibold uppercase text-slate-500 mb-4 tracking-wider">Pipeline Flow</h3>
                        <div className="flex flex-wrap gap-3">
                          {selectedJob.pipeline.map((stage, i) => (
                            <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium ${
                              stage.status === 'complete' ? 'bg-green-50 border-green-200 text-green-700' :
                              stage.status === 'active' ? 'bg-blue-50 border-blue-300 text-blue-700 animate-pulse' :
                              'bg-slate-50 border-slate-200 text-slate-400'
                            }`}>
                              {stage.status === 'complete' && <CheckCircle2 className="w-4 h-4" />}
                              {stage.status === 'active' && <Loader2 className="w-4 h-4 animate-spin" />}
                              {stage.name}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold uppercase text-slate-500 mb-4 tracking-wider">Processing Log</h3>
                        <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 h-64 overflow-y-auto">
                          {selectedJob.logs.map((log, i) => (
                            <div key={i} className="mb-2 flex gap-3">
                              <span className="text-slate-500">[{log.timestamp}]</span>
                              <span className={log.type === 'success' ? 'text-green-400' : 'text-blue-400'}>
                                {log.type === 'success' ? '✓' : '•'} {log.message}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedJob.status === 'done' && (
                    <div className="space-y-6">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4">
                        <div className="bg-green-500 text-white p-2 rounded-full">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-green-800">Translation Complete</p>
                          <p className="text-sm text-green-700">All requested assets have been generated.</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Translated transcript (.txt)', size: selectedJob.outputs.transcript, icon: FileText },
                          { label: 'Dubbed audio (.wav)', size: selectedJob.outputs.audio, icon: Music },
                          { label: 'Subtitles (.srt)', size: selectedJob.outputs.subtitles, icon: Type },
                          { label: 'Captioned video (.mp4)', size: selectedJob.outputs.video, icon: Video },
                        ].map((out, i) => (
                          <div key={i} className="p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group cursor-pointer">
                            <out.icon className="w-8 h-8 text-blue-600 mb-3" />
                            <p className="text-sm font-bold text-slate-800">{out.label}</p>
                            <p className="text-xs text-slate-500 mb-4">{out.size}</p>
                            <button className="w-full py-2 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                              <Download className="w-4 h-4" /> Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
