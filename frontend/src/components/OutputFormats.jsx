import { FileText, Mic, Subtitles, Video, Check } from "lucide-react";

const OPTIONS = [
  { key: "text", icon: FileText, title: "Translated Text", desc: "Generate translated transcript (.txt)" },
  { key: "audio", icon: Mic, title: "Dubbed Audio", desc: "Generate translated voice (.wav)" },
  { key: "srt", icon: Subtitles, title: "SRT Subtitles", desc: "Generate subtitle file (.srt)" },
  { key: "video", icon: Video, title: "Captioned Video", desc: "Generate translated video with captions (.mp4)" },
];

export default function OutputFormats({ selected, onToggle }) {
  return (
    <div className="card card-pad">
      <div className="section-head">
        <Check color="var(--brand)" size={18} />
        <h3>Output Formats</h3>
      </div>
      <div className="format-grid">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const active = selected.includes(opt.key);
          return (
            <button
              type="button"
              key={opt.key}
              onClick={() => onToggle(opt.key)}
              className={`format-card ${active ? "active" : ""}`}
            >
              <div className="format-icon"><Icon size={20} /></div>
              <div style={{ flex: 1 }}>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm" style={{ margin: 0 }}>{opt.title}</p>
                  <div className="checkbox-sq">{active && <Check size={14} />}</div>
                </div>
                <p className="text-xs muted" style={{ margin: "4px 0 0" }}>{opt.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
