import React from 'react';

const InputField = ({ name, label, type = 'text', icon: Icon, value, onChange, error, disabled, placeholder }) => (
  <div className="space-y-1">
    <label className="text-sm font-semibold text-slate-700">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-3 w-5 h-5 text-slate-400" />}
      <input
        type={type}
        name={name}
        required
        disabled={disabled}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 ${
          error ? 'border-red-300 focus:ring-red-500/20' : 'border-slate-200'
        }`}
        placeholder={placeholder || (type === 'password' ? '••••••••' : `Enter your ${label.toLowerCase()}`)}
      />
    </div>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
);

export default InputField;