import AppShell from "../../components/AppShell";

const orders = [
  { customer: "Maria Lopez", source: "Chat", date: "May 20", time: "12:30 PM", status: "Paid", payment: "Square Link", notes: "Pink roses + Spanish card" },
  { customer: "Jose Martinez", source: "Phone", date: "May 20", time: "3:00 PM", status: "Unpaid", payment: "Needs Invoice", notes: "Delivery to Chamblee" },
  { customer: "Ana Rivera", source: "Squarespace", date: "May 21", time: "10:00 AM", status: "Paid", payment: "Receipt Linked", notes: "Birthday arrangement" },
];

export default function OrdersPage() {
  return (
    <AppShell title="Order Calendar" subtitle="Track future-dated, pickup, delivery, Square, Squarespace, phone, chat, and in-store orders.">
      <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_18px_50px_rgba(122,63,42,0.10)]">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-xl font-black">Upcoming Orders</h3>
          <button className="rounded-full bg-gradient-to-r from-[#a44a5e] to-[#7a3f2a] px-5 py-2 text-sm font-black text-white shadow-lg shadow-[#a44a5e]/20">+ Manual Order</button>
        </div>
        <div className="overflow-hidden rounded-3xl border border-[#f0ddd3]">
          {orders.map((order) => (
            <div key={order.customer} className="grid gap-3 border-b border-[#f0ddd3] bg-[#fffaf7] p-4 last:border-b-0 md:grid-cols-[1fr_0.8fr_0.8fr_1fr] md:items-center">
              <div><p className="font-black text-[#5b2e1f]">{order.customer}</p><p className="text-sm text-[#6d5a50]">{order.notes}</p></div>
              <p className="text-sm font-bold text-[#6d5a50]">{order.date} • {order.time}</p>
              <p className="text-sm font-bold text-[#a44a5e]">{order.source} • {order.status}</p>
              <p className="rounded-full bg-white px-3 py-2 text-center text-xs font-black text-[#7a3f2a]">{order.payment}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
