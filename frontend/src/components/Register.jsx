import { useState } from "react";
import { User, Mail, Lock, UserPlus, CheckCircle2 } from "lucide-react";
import { saveUser } from "../lib/baifAuth.js";

export default function Register({ onRegistered }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (form.password !== form.confirm) return setError("Passwords do not match");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    try {
      saveUser({ name: form.name, email: form.email, password: form.password });
      setSuccess("Registration successful. Please login.");
      setForm({ name: "", email: "", password: "", confirm: "" });
      if (onRegistered) setTimeout(onRegistered, 1200);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={submit} className="flex-col gap-3">
      <Field icon={User} label="Full Name" value={form.name} onChange={update("name")} type="text" />
      <Field icon={Mail} label="Email" value={form.email} onChange={update("email")} type="email" />
      <Field icon={Lock} label="Password" value={form.password} onChange={update("password")} type="password" />
      <Field icon={Lock} label="Confirm Password" value={form.confirm} onChange={update("confirm")} type="password" />
      {error && <div className="alert alert-error">{error}</div>}
      {success && (
        <div className="alert alert-success">
          <CheckCircle2 size={16} /> {success}
        </div>
      )}
      <button type="submit" className="btn btn-success w-full">
        <UserPlus size={16} /> Register
      </button>
    </form>
  );
}

function Field({ icon: Icon, label, ...rest }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="relative">
        <Icon className="input-icon" size={16} />
        <input className="input" required {...rest} />
      </div>
    </div>
  );
}
