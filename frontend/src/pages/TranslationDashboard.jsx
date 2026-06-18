import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Loader2, CheckCircle2, XCircle, Play, Eye } from "lucide-react";
import Header from "../components/Header.jsx";
import LanguageSelector from "../components/LanguageSelector.jsx";
import FileUpload from "../components/FileUpload.jsx";
import OutputFormats from "../components/OutputFormats.jsx";
import ProcessingModal from "../components/ProcessingModal.jsx";
import JobDetailsModal from "../components/JobDetailsModal.jsx";
import { StatusChip, SummaryCard } from "../components/JobCard.jsx";
import { getSession, logout, getJobs, addJob } from "../lib/baifAuth.js";
import { initialJobs, summary } from "../data/dummyJobs.js";

export default function TranslationDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("translate");

  const [source, setSource] = useState("Marathi");
  const [target, setTarget] = useState("Hindi");
  const [file, setFile] = useState(null);
  const [outputs, setOutputs] = useState(["text", "audio", "srt", "video"]);
  const [processing, setProcessing] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(null);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      navigate("/");
      return;
    }
    setUser(s);
    const stored = getJobs();
    setJobs(stored.length ? [...stored, ...initialJobs] : initialJobs);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleOutput = (key) => {
    setOutputs((o) => (o.includes(key) ? o.filter((k) => k !== key) : [...o, key]));
  };

  const handleSourceChange = (v) => {
    setSource(v);
    if (v === target) setTarget(["Marathi", "Hindi", "English"].find((l) => l !== v));
  };

  const canStart = file && outputs.length > 0 && source !== target;

  const startTranslation = () => {
    if (!canStart) return;
    setProcessing(true);
  };

  const handleComplete = () => {
    const newJob = {
      id: `JOB${String(Math.floor(Math.random() * 900) + 100)}`,
      fileName: file.name,
      sourceLanguage: source,
      targetLanguage: target,
      status: "Completed",
      createdDate: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      outputs,
    };
    addJob(newJob);
    setJobs((prev) => [newJob, ...prev]);
    setProcessing(false);
    setFile(null);
    setTab("jobs");
  };

  const totals = useMemo(() => {
    const completed = jobs.filter((j) => j.status === "Completed").length;
    const inProcess = jobs.filter((j) => j.status === "In Process").length;
    const failed = jobs.filter((j) => j.status === "Failed").length;
    return {
      total: Math.max(summary.total, jobs.length),
      completed: Math.max(summary.completed, completed),
      inProcess: Math.max(summary.inProcess, inProcess),
      failed: Math.max(summary.failed, failed),
    };
  }, [jobs]);

  if (!user) return null;

  return (
    <div className="min-h-screen">
      <Header user={user} onLogout={handleLogout} />

      <div className="container">
        <div className="nav-tabs">
          {[
            { k: "translate", label: "BAIF Translation Platform" },
            { k: "jobs", label: "My Jobs" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={`nav-tab ${tab === t.k ? "active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "translate" ? (
          <div className="space-y max-w-4xl">
            <LanguageSelector
              source={source}
              target={target}
              onSourceChange={handleSourceChange}
              onTargetChange={setTarget}
            />
            <FileUpload file={file} onChange={setFile} />
            <OutputFormats selected={outputs} onToggle={toggleOutput} />
            <div className="flex justify-end">
              <button onClick={startTranslation} disabled={!canStart} className="btn btn-primary">
                <Play size={16} /> Start Translation
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y">
            <div className="summary-grid">
              <SummaryCard label="Total Jobs" value={totals.total} icon={Briefcase} color="var(--brand)" bg="#eff6ff" />
              <SummaryCard label="In Process" value={totals.inProcess} icon={Loader2} color="#d97706" bg="#fffbeb" />
              <SummaryCard label="Completed" value={totals.completed} icon={CheckCircle2} color="var(--green)" bg="#ecfdf5" />
              <SummaryCard label="Failed" value={totals.failed} icon={XCircle} color="var(--danger)" bg="#fef2f2" />
            </div>

            <div className="card" style={{ overflow: "hidden" }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border)" }}>
                <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600 }}>Translation Jobs</h3>
              </div>
              <div className="table-wrap">
                <table>
                  <thead className="t-head">
                    <tr>
                      {["Job ID", "File Name", "Source", "Target", "Status", "Created Date", "Action"].map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="mono">{job.id}</td>
                        <td>{job.fileName}</td>
                        <td className="muted">{job.sourceLanguage}</td>
                        <td className="muted">{job.targetLanguage}</td>
                        <td><StatusChip status={job.status} /></td>
                        <td className="muted">{job.createdDate}</td>
                        <td>
                          <button
                            onClick={() => setActiveJob(job)}
                            disabled={job.status !== "Completed"}
                            className="btn btn-ghost text-xs"
                            style={{ padding: "6px 10px" }}
                          >
                            <Eye size={14} /> View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <ProcessingModal open={processing} onComplete={handleComplete} />
      <JobDetailsModal job={activeJob} onClose={() => setActiveJob(null)} />
    </div>
  );
}
