export function StatusChip({ status }) {
  const cls = status === "Completed" ? "chip-green" : status === "In Process" ? "chip-amber" : "chip-red";
  return <span className={`chip ${cls}`}>{status}</span>;
}

export function SummaryCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="card card-pad">
      <div className="flex items-center justify-between">
        <div>
          <p className="summary-label">{label}</p>
          <p className="summary-value">{value}</p>
        </div>
        <div className="summary-icon" style={{ background: bg, color }}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
