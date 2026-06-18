import { Languages, ArrowRight } from "lucide-react";

const LANGUAGES = ["Marathi", "Hindi", "English"];

export default function LanguageSelector({ source, target, onSourceChange, onTargetChange }) {
  return (
    <div className="card card-pad">
      <div className="section-head">
        <Languages color="var(--brand)" size={18} />
        <h3>Language Selection</h3>
      </div>
      <div className="grid grid-lang">
        <div>
          <label className="field-label">Source Language</label>
          <select className="input no-icon" value={source} onChange={(e) => onSourceChange(e.target.value)}>
            {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="flex items-center justify-center" style={{ paddingBottom: 8 }}>
          <ArrowRight color="var(--ink-muted)" />
        </div>
        <div>
          <label className="field-label">Target Language</label>
          <select className="input no-icon" value={target} onChange={(e) => onTargetChange(e.target.value)}>
            {LANGUAGES.filter((l) => l !== source).map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
