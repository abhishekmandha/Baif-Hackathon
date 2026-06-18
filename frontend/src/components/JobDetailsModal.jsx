import { X, Download, FileText, Mic, Subtitles, Video } from "lucide-react";
import { outputFileMeta } from "../data/dummyJobs.js";

const ICONS = { text: FileText, audio: Mic, srt: Subtitles, video: Video };

export default function JobDetailsModal({ job, onClose }) {
  if (!job) return null;
  const outputs = job.outputs?.length ? job.outputs : [];

  const download = (key) => {
    const meta = outputFileMeta[key];
    const blob = new Blob(
      [`BAIF demo output: ${meta.label}\nJob: ${job.id}\nFile: ${job.fileName}`],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${job.id}_${meta.label.replace(/\s+/g, "_")}${meta.ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop">
      <div className="card max-w-2xl" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <div className="modal-head">
          <div>
            <h3 style={{ margin: 0, fontSize: 15 }}>Job Details — {job.id}</h3>
            <p className="text-xs muted" style={{ margin: "2px 0 0" }}>
              {job.fileName} · {job.sourceLanguage} → {job.targetLanguage}
            </p>
          </div>
          <button onClick={onClose} className="icon-btn"><X size={20} /></button>
        </div>
        <div className="modal-body flex-col gap-3">
          {outputs.length === 0 ? (
            <p className="text-sm muted text-center" style={{ padding: "24px 0" }}>
              No outputs generated for this job.
            </p>
          ) : (
            outputs.map((key) => {
              const meta = outputFileMeta[key];
              const Icon = ICONS[key];
              return (
                <div key={key} className="file-row" style={{ background: "#fff" }}>
                  <div className="flex items-center gap-3">
                    <div className="icon-box"><Icon size={20} /></div>
                    <div>
                      <p className="font-semibold text-sm" style={{ margin: 0 }}>{meta.label} ({meta.ext})</p>
                      <p className="text-xs muted" style={{ margin: "2px 0 0" }}>File Size: {meta.size}</p>
                    </div>
                  </div>
                  <button onClick={() => download(key)} className="btn btn-primary">
                    <Download size={16} /> Download
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
