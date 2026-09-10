"use client";

import { useEffect, useState, type FormEvent } from "react";
import StaffInbox from "@/components/chat/StaffInbox";
import type { AdminRole } from "@/lib/content-types";

type AdminUser = { id?: string; email: string; name: string; role: AdminRole };

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/auth/session", { cache: "no-store" })
      .then(async (response) => (response.ok ? response.json() : { user: null }))
      .then(({ user: sessionUser }) => setUser(sessionUser))
      .catch(() => setError("Kunde inte kontrollera inloggningen."))
      .finally(() => setIsCheckingSession(false));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Kunde inte logga in.");
      setUser(payload.user);
      setPassword("");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Kunde inte logga in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignOut() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    setUser(null);
    setEmail("");
    setPassword("");
  }

  if (isCheckingSession) {
    return <main className="grid min-h-screen place-items-center bg-[#f4f5f7] text-sm font-bold text-slate-500">Kontrollerar säker session…</main>;
  }

  if (user) return <StaffInbox currentUser={user} onSignOut={handleSignOut} />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f5f7] px-4 py-10 text-slate-950">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.10)] sm:p-8">
        <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-2xl bg-[linear-gradient(180deg,#e72e8a,#d81b7d)] text-lg font-black text-white">H</span><div><p className="text-lg font-extrabold tracking-tight">hemläkare<span className="text-[#e72e8a]">.se</span></p><p className="text-xs font-semibold text-slate-400">Adminpanel</p></div></div>
        <div className="mt-8"><h1 className="text-2xl font-extrabold tracking-tight">Logga in</h1><p className="mt-2 text-sm leading-6 text-slate-500">Ange dina personliga adminuppgifter.</p></div>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block"><span className="text-xs font-bold text-slate-700">E-postadress</span><input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#e72e8a] focus:ring-4 focus:ring-pink-100" required /></label>
          <label className="block"><span className="text-xs font-bold text-slate-700">Lösenord</span><input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#e72e8a] focus:ring-4 focus:ring-pink-100" required /></label>
          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700">{error}</p>}
          <button disabled={isSubmitting} type="submit" className="btn-cta min-h-12 w-full rounded-xl px-4 text-sm font-extrabold disabled:cursor-wait disabled:opacity-70">{isSubmitting ? "Loggar in…" : "Logga in"}</button>
        </form>
      </section>
    </main>
  );
}
