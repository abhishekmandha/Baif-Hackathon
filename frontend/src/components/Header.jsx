import { Languages, LogOut, UserCircle2 } from "lucide-react";

export default function Header({ user, onLogout }) {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <div className="flex items-center gap-3">
          <div className="brand-mark"><Languages size={22} /></div>
          <div>
            <h1 className="brand-title">BAIF AI Translation Platform</h1>
            <p className="brand-sub">AI Translation for Bharat</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <UserCircle2 color="var(--brand)" size={20} />
            <span className="font-semibold">{user?.name}</span>
          </div>
          <button onClick={onLogout} className="btn btn-ghost">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}
