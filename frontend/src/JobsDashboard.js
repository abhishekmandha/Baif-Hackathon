import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  Clock, 
  AlertCircle, 
  Video, 
  ChevronRight, 
  FileText, 
  Music, 
  Type, 
  Download 
} from 'lucide-react';

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

const JobsDashboard = () => {
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
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Total jobs', value: 24, color: 'bg-white dark:bg-slate-800 dark:text-white' },
          { label: 'In progress', value: 3, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400' },
          { label: 'Completed', value: 19, color: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' },
          { label: 'Failed', value: 2, color: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm ${stat.color}`}>
            <p className="text-sm font-medium opacity-80 uppercase tracking-wider dark:text-slate-400">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-semibold">
            <tr>
              <th className="px-6 py-4">File Name</th>
              <th className="px-6 py-4">Languages</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Progress</th>
              <th className="px-6 py-4">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {MOCK_JOBS.map((job) => (
              <tr key={job.id} onClick={() => setSelectedJob(job)} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors">
                <td className="px-6 py-4 font-medium flex items-center gap-2 dark:text-slate-200">
                  <Video className="w-4 h-4 text-slate-400" /> {job.fileName}
                </td>
                <td className="px-6 py-4 text-sm dark:text-slate-300">
                  {job.sourceLang} → {job.targetLang}
                </td>
                <td className="px-6 py-4 capitalize text-sm font-semibold flex items-center gap-2 dark:text-slate-300">
                  {renderStatusIcon(job.status)} {job.status}
                </td>
                <td className="px-6 py-4 w-48">
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all" style={{ width: `${job.progress}%` }} />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{job.submitted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Panel */}
      {selectedJob && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-end z-50">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-800 h-screen shadow-2xl p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold dark:text-white">{selectedJob.fileName}</h2>
              <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
                <ChevronRight className="w-6 h-6 dark:text-slate-400" />
              </button>
            </div>

            {selectedJob.status === 'processing' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase text-slate-500 dark:text-slate-400 mb-4 tracking-wider">Pipeline Flow</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedJob.pipeline.map((stage, i) => (
                      <div key={i} className={`flex items-center gap-2 px-4 py-2 rounded-lg border dark:border-slate-700 text-sm font-medium ${
                        stage.status === 'complete' ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400' :
                        stage.status === 'active' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-400' : 'bg-slate-50 dark:bg-slate-700 text-slate-400'
                      }`}>
                        {stage.name}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 h-64 overflow-y-auto">
                  {selectedJob.logs.map((log, i) => (
                    <div key={i} className="mb-2">
                      <span className="text-slate-500">[{log.timestamp}]</span> {log.message}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedJob.status === 'done' && (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Transcript (.txt)', icon: FileText },
                  { label: 'Audio (.wav)', icon: Music },
                  { label: 'Subtitles (.srt)', icon: Type },
                  { label: 'Video (.mp4)', icon: Video },
                ].map((out, i) => (
                  <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                    <out.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                    <p className="text-sm font-bold mb-4 dark:text-slate-200">{out.label}</p>
                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsDashboard;