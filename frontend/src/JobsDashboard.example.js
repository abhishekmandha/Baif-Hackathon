/**
 * EXAMPLE: Updated JobsDashboard with Real Backend Integration
 * 
 * This is a reference implementation showing how to replace mock data
 * with real API calls. Follow this pattern for other components.
 * 
 * Steps to implement:
 * 1. Replace the current JobsDashboard.js with this pattern
 * 2. Update the MOCK_JOBS reference to use jobsAPI.getAll()
 * 3. Add loading/error states
 * 4. Add polling or WebSocket for real-time updates
 */

import React, { useState, useEffect } from 'react';
import DashboardCards from './components/DashboardCards';
import JobListTable from './components/JobListTable';
import ProcessingDetail from './components/ProcessingDetail';
import { jobsAPI, APIError } from './services/api';
import { AlertCircle, Loader } from 'lucide-react';

const JobsDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await jobsAPI.getAll();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        const message = err instanceof APIError ? err.message : 'Failed to load jobs';
        setError(message);
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    // Optional: Poll for updates every 10 seconds
    const interval = setInterval(fetchJobs, 10000);
    return () => clearInterval(interval);
  }, []);

  // Manually refresh jobs
  const handleRefresh = async () => {
    try {
      setError(null);
      const data = await jobsAPI.getAll();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      const message = err instanceof APIError ? err.message : 'Failed to refresh jobs';
      setError(message);
    }
  };

  const selectedJob = jobs.find(job => job.id === selectedJobId);

  const metrics = {
    totalJobs: jobs.length,
    inProgress: jobs.filter(j => j.status === 'processing').length,
    completed: jobs.filter(j => j.status === 'done').length,
    failed: jobs.filter(j => j.status === 'failed').length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="ml-2 flex-1">
            <p className="text-sm font-semibold text-red-800">Error loading jobs</p>
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-sm text-red-600 hover:text-red-800 font-semibold"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      <DashboardCards metrics={metrics} />
      
      <JobListTable
        jobs={jobs}
        onJobSelect={setSelectedJobId}
        selectedJobId={selectedJobId}
      />

      {selectedJob && (
        <ProcessingDetail job={selectedJob} />
      )}
    </div>
  );
};

export default JobsDashboard;
