import React, { useState } from 'react';
import DashboardCards from './components/DashboardCards';
import JobListTable from './components/JobListTable';
import ProcessingDetail from './components/ProcessingDetail';

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
      { timestamp: '11:19:02', message: 'Processing audio format conversion', type: 'info' },
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
  },
  {
    id: '4',
    fileName: 'crop_rotation_guide.mp4',
    sourceLang: 'English',
    targetLang: 'Hindi',
    status: 'failed',
    progress: 30,
    submitted: '2023-10-24 09:45 AM'
  },
];

const JobsDashboard = () => {
  const [selectedJobId, setSelectedJobId] = useState(null);

  const selectedJob = MOCK_JOBS.find(job => job.id === selectedJobId);
  
  const metrics = {
    totalJobs: MOCK_JOBS.length,
    inProgress: MOCK_JOBS.filter(j => j.status === 'processing').length,
    completed: MOCK_JOBS.filter(j => j.status === 'done').length,
    failed: MOCK_JOBS.filter(j => j.status === 'failed').length,
  };

  return (
    <div className="space-y-6">
      <DashboardCards metrics={metrics} />
      <JobListTable 
        jobs={MOCK_JOBS} 
        onJobSelect={setSelectedJobId}
        selectedJobId={selectedJobId}
      />
      {selectedJob && (
        <ProcessingDetail 
          job={selectedJob} 
          onClose={() => setSelectedJobId(null)}
        />
      )}
    </div>
  );
};

export default JobsDashboard;