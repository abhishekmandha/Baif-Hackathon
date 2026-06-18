import { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { login } from "../lib/baifAuth.js";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    try {
      const session = login(email, password);
      onSuccess(session);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="flex-col gap-3">
      <div>
        <label className="field-label">Email</label>
        <div className="relative">
          <Mail className="input-icon" size={16} />
          <input
            type="email"
            className="input"
            placeholder="admin@baif.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label className="field-label">Password</label>
        <div className="relative">
          <Lock className="input-icon" size={16} />
          <input
            type="password"
            className="input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <button type="submit" className="btn btn-primary w-full">
        <LogIn size={16} /> Login
      </button>
      <p className="text-xs muted text-center" style={{ margin: 0 }}>
        Demo: <span className="mono">admin@baif.com</span> / <span className="mono">admin123</span>
      </p>
    </form>
  );
}
