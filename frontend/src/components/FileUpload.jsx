import { useRef } from "react";
import { Upload, FileText, X } from "lucide-react";

const ACCEPT = ".txt,.docx,.pdf,.mp3,.wav,.aac,.m4a,.flac,.wma,.ogg,.mp4,.mov,.avi,.wmv,.mkv,.flv,.webm";

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function FileUpload({ file, onChange }) {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) onChange(e.dataTransfer.files[0]);
  };

  return (
    <div className="card card-pad">
      <div className="section-head">
        <Upload color="var(--brand)" size={18} />
        <h3>Upload File</h3>
      </div>
      {!file ? (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="dropzone"
        >
          <Upload color="var(--brand)" size={32} />
          <p className="dz-title">Click to upload or drag and drop</p>
          <p className="dz-sub">
            Text (TXT, DOCX, PDF) · Audio (MP3, WAV, AAC, M4A, FLAC, WMA, OGG) · Video (MP4, MOV, AVI, WMV, MKV, FLV, WebM)
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            style={{ display: "none" }}
            onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="file-row">
          <div className="flex items-center gap-3">
            <div className="icon-box"><FileText size={20} /></div>
            <div>
              <p className="font-semibold text-sm" style={{ margin: 0 }}>{file.name}</p>
              <p className="text-xs muted" style={{ margin: "2px 0 0" }}>{formatSize(file.size)}</p>
            </div>
          </div>
          <button onClick={() => onChange(null)} className="icon-btn"><X size={18} /></button>
        </div>
      )}
    </div>
  );
}
