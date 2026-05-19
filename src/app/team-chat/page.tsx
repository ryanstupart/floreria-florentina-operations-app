import AppShell from "../../components/AppShell";

const chats = [
  { sender: "Yajaira", text: "Please confirm the 3 PM delivery before starting the arrangement.", align: "left" },
  { sender: "Robert", text: "Got it. Payment link is still unpaid, I’ll follow up first.", align: "right" },
  { sender: "Yajaira", text: "Thank you. Add the note to the order once confirmed.", align: "left" },
];

export default function TeamChatPage() {
  return (
    <AppShell title="Team Chat" subtitle="Internal communication for orders, reminders, and daily coordination.">
      <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_18px_50px_rgba(122,63,42,0.10)]">
        <div className="space-y-4">
          {chats.map((chat, index) => (
            <div key={index} className={`flex ${chat.align === "right" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-[1.5rem] p-4 shadow-sm ${chat.align === "right" ? "bg-[#a44a5e] text-white" : "bg-[#fffaf7] text-[#5b2e1f]"}`}>
                <p className="text-xs font-black opacity-70">{chat.sender}</p>
                <p className="mt-1 text-sm leading-6">{chat.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-2 rounded-3xl bg-[#fffaf7] p-2">
          <input className="flex-1 rounded-2xl bg-white px-4 py-3 text-sm text-[#2e2a27]" placeholder="Type a team update..." />
          <button className="rounded-2xl bg-[#7a3f2a] px-5 py-3 text-sm font-black text-white">Send</button>
        </div>
      </div>
    </AppShell>
  );
}
