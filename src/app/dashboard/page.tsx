import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import AppShell from "../../components/AppShell";

const cards = [
  { label: "Orders Today", value: "7", helper: "3 pickup • 4 delivery", tone: "from-[#a44a5e] to-[#c96b7b]" },
  { label: "Unread Messages", value: "4", helper: "2 Spanish requests", tone: "from-[#8d9b87] to-[#b8c4a8]" },
  { label: "Open Payment Links", value: "5", helper: "Square follow-up needed", tone: "from-[#c9a46c] to-[#e4c98d]" },
];

const todayOrders = [
  { name: "Maria Lopez", item: "Rose bear + bouquet", time: "12:30 PM", status: "Paid", type: "Pickup" },
  { name: "Jose Martinez", item: "Custom roses", time: "3:00 PM", status: "Unpaid", type: "Delivery" },
  { name: "Ana Rivera", item: "Birthday arrangement", time: "5:45 PM", status: "Partial", type: "Pickup" },
];

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  return (
    <AppShell title="Operations Dashboard" subtitle={`Welcome, ${profile?.full_name ?? user.email} • Role: ${profile?.role ?? "unknown"}`}>
      <div className="grid gap-4 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_18px_50px_rgba(122,63,42,0.10)]">
            <div className={`mb-5 h-2 rounded-full bg-gradient-to-r ${card.tone}`} />
            <p className="text-sm font-bold text-[#6d5a50]">{card.label}</p>
            <p className="mt-2 text-4xl font-black text-[#2e2a27]">{card.value}</p>
            <p className="mt-1 text-sm text-[#8b7569]">{card.helper}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_18px_50px_rgba(122,63,42,0.10)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-black text-[#2e2a27]">Today’s Order Flow</h3>
            <span className="rounded-full bg-[#f4d6d9] px-3 py-1 text-xs font-bold text-[#7a3f2a]">Mock Data</span>
          </div>
          <div className="space-y-3">
            {todayOrders.map((order) => (
              <div key={order.name} className="flex flex-col gap-3 rounded-3xl bg-[#fffaf7] p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-black text-[#5b2e1f]">{order.name}</p>
                  <p className="text-sm text-[#6d5a50]">{order.item}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-bold">
                  <span className="rounded-full bg-white px-3 py-1 text-[#7a3f2a]">{order.time}</span>
                  <span className="rounded-full bg-[#edf2e8] px-3 py-1 text-[#62725a]">{order.type}</span>
                  <span className="rounded-full bg-[#f4d6d9] px-3 py-1 text-[#a44a5e]">{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-gradient-to-br from-[#5b2e1f] to-[#a44a5e] p-6 text-white shadow-[0_18px_50px_rgba(122,63,42,0.18)]">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/65">Next Build</p>
          <h3 className="mt-3 text-2xl font-black">Employees + Orders</h3>
          <p className="mt-3 text-sm leading-6 text-white/80">The next real feature should connect the employee and order pages to Supabase so Yajaira and Robert can add records from the dashboard.</p>
          <div className="mt-6 rounded-3xl bg-white/15 p-4 text-sm backdrop-blur">Account provisioning remains restricted to Owner/Admin only.</div>
        </div>
      </div>
    </AppShell>
  );
}
