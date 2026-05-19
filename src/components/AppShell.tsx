import Link from "next/link";
import LogoutButton from "./LogoutButton";

type AppShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
};

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "✦" },
  { href: "/orders", label: "Orders", icon: "❀" },
  { href: "/employees", label: "Employees", icon: "♡" },
  { href: "/schedule", label: "Employee Schedule", icon: "☼" },
  { href: "/customer-messages", label: "Customer Messages", icon: "✉" },
  { href: "/team-chat", label: "Team Chat", icon: "☻" },
];

export default function AppShell({ children, title, subtitle }: AppShellProps) {
  return (
    <main className="min-h-screen px-4 py-4 text-[#2e2a27] md:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 rounded-[2rem] border border-white/70 bg-white/70 px-5 py-4 shadow-[0_18px_60px_rgba(122,63,42,0.10)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a44a5e] via-[#c96b7b] to-[#c9a46c] text-2xl text-white shadow-lg shadow-[#a44a5e]/20">
                ❋
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#a44a5e]">Floreria Florentina</p>
                <h1 className="text-2xl font-black tracking-tight text-[#5b2e1f]">Florentina Ops</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-[#f4d6d9]/70 px-4 py-2 text-sm font-semibold text-[#7a3f2a] md:inline-flex">EN / ES Ready</span>
              <LogoutButton />
            </div>
          </div>
        </header>

        <div className="grid gap-5 md:grid-cols-[270px_1fr]">
          <aside className="rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-[0_18px_60px_rgba(122,63,42,0.10)] backdrop-blur-xl md:sticky md:top-4 md:h-[calc(100vh-2rem)]">
            <div className="mb-5 rounded-3xl bg-gradient-to-br from-[#fff7f2] to-[#f4d6d9]/50 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#a44a5e]">MVP Build</p>
              <p className="mt-1 text-sm text-[#6d5a50]">Dashboard foundation with mock operations data.</p>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-[#5b2e1f] transition hover:-translate-y-0.5 hover:bg-[#fff8f5] hover:shadow-md"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f8f3ed] text-[#a44a5e]">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <section className="min-w-0">
            <div className="mb-5 rounded-[2rem] border border-white/70 bg-white/60 p-6 shadow-[0_18px_60px_rgba(122,63,42,0.08)] backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a44a5e]">Operations Control Layer</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-[#2e2a27]">{title}</h2>
              {subtitle && <p className="mt-2 max-w-3xl text-[#6d5a50]">{subtitle}</p>}
            </div>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
