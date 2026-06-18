import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Languages } from "lucide-react";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";

export default function AuthPage() {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();

  return (
    <div className="auth-wrap">
      <div className="max-w-md">
        <div className="text-center" style={{ marginBottom: 24 }}>
          <div className="auth-logo"><Languages size={28} /></div>
          <h1 className="auth-title">BAIF AI Translation Platform</h1>
          <p className="auth-sub">AI Translation for Bharat</p>
        </div>

        <div className="card card-pad">
          <div className="tab-row">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`tab-btn ${tab === t ? "active" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
          {tab === "login" ? (
            <Login onSuccess={() => navigate("/dashboard")} />
          ) : (
            <Register onRegistered={() => setTab("login")} />
          )}
        </div>

        <p className="text-center text-xs muted" style={{ marginTop: 24 }}>
          © 2026 BAIF Development Research Foundation
        </p>
      </div>
    </div>
  );
}
