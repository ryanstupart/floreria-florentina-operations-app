"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 text-[#2e2a27]">
      <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#f4d6d9]/70 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#c9a46c]/25 blur-3xl" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/70 shadow-[0_24px_90px_rgba(122,63,42,0.18)] backdrop-blur-xl md:grid-cols-[1.1fr_0.9fr]">
        <section className="hidden bg-gradient-to-br from-[#a44a5e] via-[#be6b79] to-[#7a3f2a] p-10 text-white md:block">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 text-3xl shadow-lg">❋</div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/75">Floreria Florentina</p>
              <h1 className="mt-3 text-5xl font-black tracking-tight">Operations, beautifully organized.</h1>
              <p className="mt-5 max-w-md text-white/80">Chat, orders, schedules, team notes, and payment workflows in one calm internal dashboard.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">Website Chat</div>
              <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">Order Calendar</div>
              <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">Square Links</div>
              <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">Team Schedule</div>
            </div>
          </div>
        </section>

        <section className="p-7 md:p-10">
          <div className="mb-8 md:hidden">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a44a5e] to-[#c9a46c] text-2xl text-white">❋</div>
            <h1 className="text-3xl font-black text-[#5b2e1f]">Florentina Ops</h1>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a44a5e]">Secure Staff Login</p>
          <h2 className="mt-2 text-3xl font-black text-[#2e2a27]">Welcome back</h2>
          <p className="mt-2 text-sm text-[#6d5a50]">Only approved Floreria Florentina accounts can access this internal app.</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-bold text-[#5b2e1f]">Email</label>
              <input className="mt-2 w-full rounded-2xl border border-[#ead8cf] bg-white/80 px-4 py-3 text-gray-900 shadow-sm transition focus:border-[#a44a5e] focus:ring-4 focus:ring-[#f4d6d9]" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-sm font-bold text-[#5b2e1f]">Password</label>
              <input className="mt-2 w-full rounded-2xl border border-[#ead8cf] bg-white/80 px-4 py-3 text-gray-900 shadow-sm transition focus:border-[#a44a5e] focus:ring-4 focus:ring-[#f4d6d9]" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {errorMessage && <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{errorMessage}</p>}
            <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-[#a44a5e] to-[#7a3f2a] px-5 py-3 font-black text-white shadow-lg shadow-[#a44a5e]/25 transition hover:-translate-y-0.5 hover:shadow-xl">Log in to dashboard</button>
          </form>
        </section>
      </div>
    </main>
  );
}
