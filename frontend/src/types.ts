// Job Status Types
export type JobStatus = 'done' | 'processing' | 'queued' | 'failed';
export type PipelineStageStatus = 'complete' | 'active' | 'pending' | 'failed';

// Job Interface
export interface Job {
  id: string;
  fileName: string;
  sourceLang: string;
  targetLang: string;
  status: JobStatus;
  progress: number;
  submitted: string;
  fileSize?: string;
  outputs?: JobOutputs;
  pipeline?: PipelineStage[];
  logs?: ProcessingLog[];
}

// Job Outputs
export interface JobOutputs {
  transcript?: string;
  audio?: string;
  subtitles?: string;
  video?: string;
}

// Pipeline Stage
export interface PipelineStage {
  name: string;
  status: PipelineStageStatus;
  startTime?: string;
  endTime?: string;
}

// Processing Log Entry
export interface ProcessingLog {
  timestamp: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

// Download Item
export interface DownloadItem {
  id: string;
  label: string;
  format: string;
  size: string;
  icon: any;
}

// Dashboard Metrics
export interface DashboardMetrics {
  totalJobs: number;
  inProgress: number;
  completed: number;
  failed: number;
}

// User Profile
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
