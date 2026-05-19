import AppShell from "../../components/AppShell";

const employees = [
  { name: "Yajaira", role: "Owner", status: "Active", access: "Full access" },
  { name: "Robert", role: "Admin", status: "Active", access: "Can manage operations" },
  { name: "Designer Placeholder", role: "Staff", status: "Later", access: "Not provisioned yet" },
];

export default function EmployeesPage() {
  return (
    <AppShell title="Employees" subtitle="Manage staff records separately from Supabase Auth account provisioning.">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_18px_50px_rgba(122,63,42,0.10)]">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-[#a44a5e]">Access Rule</p>
          <h3 className="mt-3 text-2xl font-black">Only Owner/Admin can create accounts.</h3>
          <p className="mt-3 text-sm leading-6 text-[#6d5a50]">For MVP testing, only Yajaira and Robert should have active login accounts. Employee records can exist without login access.</p>
        </div>
        <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_18px_50px_rgba(122,63,42,0.10)]">
          <div className="space-y-3">
            {employees.map((employee) => (
              <div key={employee.name} className="flex flex-col gap-3 rounded-3xl bg-[#fffaf7] p-4 md:flex-row md:items-center md:justify-between">
                <div><p className="font-black text-[#5b2e1f]">{employee.name}</p><p className="text-sm text-[#6d5a50]">{employee.access}</p></div>
                <div className="flex gap-2 text-xs font-black"><span className="rounded-full bg-[#f4d6d9] px-3 py-1 text-[#a44a5e]">{employee.role}</span><span className="rounded-full bg-[#edf2e8] px-3 py-1 text-[#62725a]">{employee.status}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
