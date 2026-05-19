import AppShell from "../../components/AppShell";

const shifts = [
  { person: "Yajaira", day: "Monday", time: "9:00 AM – 5:00 PM", area: "Shop / Owner" },
  { person: "Robert", day: "Tuesday", time: "10:00 AM – 4:00 PM", area: "Admin / Orders" },
  { person: "Designer", day: "Friday", time: "12:00 PM – 6:00 PM", area: "Arrangements" },
];

export default function SchedulePage() {
  return (
    <AppShell title="Employee Schedule" subtitle="This stays separate from the customer order calendar.">
      <div className="grid gap-4 md:grid-cols-3">
        {shifts.map((shift) => (
          <div key={shift.person} className="rounded-[2rem] border border-white/70 bg-white/75 p-5 shadow-[0_18px_50px_rgba(122,63,42,0.10)]">
            <p className="text-sm font-black text-[#a44a5e]">{shift.day}</p>
            <h3 className="mt-2 text-xl font-black text-[#5b2e1f]">{shift.person}</h3>
            <p className="mt-2 text-sm font-bold text-[#6d5a50]">{shift.time}</p>
            <p className="mt-4 rounded-full bg-[#fffaf7] px-3 py-2 text-center text-xs font-black text-[#7a3f2a]">{shift.area}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
