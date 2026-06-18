import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

const STEPS = [
  "File Validation",
  "Audio Extraction",
  "Speech Recognition",
  "Translation",
  "Voice Generation",
  "Subtitle Generation",
  "Final Output Creation",
];

export default function ProcessingModal({ open, onComplete }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      if (i >= STEPS.length) {
        setStep(STEPS.length);
        setDone(true);
        clearInterval(interval);
      } else {
        setStep(i);
      }
    }, 700);
    return () => clearInterval(interval);
  }, [open]);

  if (!open) return null;
  const progress = Math.round((step / STEPS.length) * 100);

  return (
    <div className="modal-backdrop">
      <div className="card max-w-lg" style={{ padding: 24 }}>
        <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
          <div className="icon-box">
            {done ? <CheckCircle2 color="var(--green)" /> : <Sparkles color="var(--brand)" />}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 15 }}>
              {done ? "Translation completed successfully" : "Processing translation"}
            </h3>
            <p className="text-xs muted" style={{ margin: "2px 0 0" }}>
              {done ? "Your outputs are ready in My Jobs" : "Please keep this window open"}
            </p>
          </div>
        </div>

        <div className="progress-track"><div className="progress-bar" style={{ width: `${progress}%` }} /></div>

        <ul className="step-list">
          {STEPS.map((label, idx) => {
            const isDone = idx < step;
            const isActive = idx === step && !done;
            return (
              <li key={label} className={isDone ? "done" : isActive ? "active" : ""}>
                <span style={{ width: 20, display: "inline-flex", justifyContent: "center" }}>
                  {isDone ? <CheckCircle2 color="var(--green)" size={18} />
                    : isActive ? <Loader2 color="var(--brand)" size={18} className="spin" />
                    : <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--border)" }} />}
                </span>
                {label}
              </li>
            );
          })}
        </ul>

        {done && (
          <button onClick={onComplete} className="btn btn-success w-full" style={{ marginTop: 20 }}>
            View in My Jobs
          </button>
        )}
      </div>
    </div>
  );
}
