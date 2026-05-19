import AppShell from "../../components/AppShell";

const messages = [
  { name: "Carla", lang: "Spanish", msg: "¿Hacen arreglos para entrega mañana?", status: "New" },
  { name: "David", lang: "English", msg: "Can I order a custom rose bouquet for pickup?", status: "Open" },
  { name: "Lupita", lang: "Spanish", msg: "Necesito precio para ramo buchón.", status: "Needs Reply" },
];

export default function CustomerMessagesPage() {
  return (
    <AppShell title="Customer Messages" subtitle="Future home for the custom Squarespace chat widget inbox.">
      <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_18px_50px_rgba(122,63,42,0.10)]">
        <div className="space-y-3">
          {messages.map((message) => (
            <div key={message.name} className="rounded-3xl bg-[#fffaf7] p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="font-black text-[#5b2e1f]">{message.name}</p>
                <div className="flex gap-2 text-xs font-black"><span className="rounded-full bg-[#edf2e8] px-3 py-1 text-[#62725a]">{message.lang}</span><span className="rounded-full bg-[#f4d6d9] px-3 py-1 text-[#a44a5e]">{message.status}</span></div>
              </div>
              <p className="text-[#6d5a50]">{message.msg}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
