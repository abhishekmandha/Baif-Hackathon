const USERS_KEY = "baif_users";
const SESSION_KEY = "baif_session";
const JOBS_KEY = "baif_jobs";

const DEFAULT_USER = { name: "Admin", email: "admin@baif.com", password: "admin123" };

export function getUsers() {
  if (typeof window === "undefined") return [DEFAULT_USER];
  const raw = localStorage.getItem(USERS_KEY);
  const users = raw ? JSON.parse(raw) : [];
  if (!users.find((u) => u.email === DEFAULT_USER.email)) users.unshift(DEFAULT_USER);
  return users;
}

export function saveUser(user) {
  const users = getUsers();
  if (users.find((u) => u.email === user.email)) {
    throw new Error("Email already registered");
  }
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function login(email, password) {
  const user = getUsers().find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Invalid email or password");
  const session = { name: user.name, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession() {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getJobs() {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(JOBS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveJobs(jobs) {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
}

export function addJob(job) {
  const jobs = getJobs();
  jobs.unshift(job);
  saveJobs(jobs);
  return jobs;
}
