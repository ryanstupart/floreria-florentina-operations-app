"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";

type Employee = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  role: "owner" | "admin" | "staff" | null;
  is_active: boolean | null;
};

export default function EmployeesClient() {
  const supabase = createClient();

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"owner" | "admin" | "staff">("staff");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function loadEmployees() {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }

    setEmployees(data ?? []);
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  async function addEmployee(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("employees").insert({
      full_name: fullName,
      email: email || null,
      phone: phone || null,
      role,
      is_active: true,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setFullName("");
    setEmail("");
    setPhone("");
    setRole("staff");
    setMessage("Employee record added successfully.");
    await loadEmployees();
    setLoading(false);
  }

  async function provisionAccount() {
    if (!fullName || !email || !password) {
      setMessage("Full name, email, and password are required to provision an account.");
      return;
    }

    setLoading(true);
    setMessage("");

    const response = await fetch("/api/provision-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        password,
        role,
      }),
    });

  let result: { error?: string; success?: boolean } = {};

try {
  result = await response.json();
} catch {
  result = { error: "No JSON response returned from the provisioning API." };
}

    if (!response.ok) {
      setMessage(result.error || "Provisioning failed.");
      setLoading(false);
      return;
    }

    await supabase.from("employees").insert({
      full_name: fullName,
      email,
      phone: phone || null,
      role,
      is_active: true,
    });

    setFullName("");
    setEmail("");
    setPhone("");
    setRole("staff");
    setPassword("");
    setMessage("Account provisioned successfully.");
    await loadEmployees();
    setLoading(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
      <form onSubmit={addEmployee} className="rounded-3xl bg-white/90 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-[#5b2e1f]">Employee Setup</h3>
        <p className="mt-1 text-sm text-gray-600">
          Add an employee record, or provision a login account.
        </p>

        <div className="mt-5 space-y-4">
          <input
            className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#a44a5e]"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#a44a5e]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#a44a5e]"
            placeholder="Phone optional"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <select
            className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#a44a5e]"
            value={role}
            onChange={(e) => setRole(e.target.value as "owner" | "admin" | "staff")}
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
            <option value="owner">Owner</option>
          </select>

          <input
            className="w-full rounded-xl border border-rose-100 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#a44a5e]"
            placeholder="Temporary password for login account"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#a44a5e] px-4 py-3 font-semibold text-white shadow-md hover:bg-[#87394b]"
          >
            {loading ? "Saving..." : "Add Employee Record Only"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={provisionAccount}
            className="w-full rounded-xl bg-[#7a3f2a] px-4 py-3 font-semibold text-white shadow-md hover:bg-[#633222]"
          >
            {loading ? "Provisioning..." : "Provision Login Account"}
          </button>

          {message && (
            <p className="rounded-xl bg-[#fff7f3] p-3 text-sm text-[#7a3f2a]">
              {message}
            </p>
          )}
        </div>
      </form>

      <div className="rounded-3xl bg-white/90 p-6 shadow-xl">
        <h3 className="text-lg font-bold text-[#5b2e1f]">Employees</h3>
        <p className="mt-1 text-sm text-gray-600">
          Active employees and provisioned users.
        </p>

        <div className="mt-5 space-y-3">
          {employees.length === 0 ? (
            <p className="text-sm text-gray-500">No employees yet.</p>
          ) : (
            employees.map((employee) => (
              <div
                key={employee.id}
                className="rounded-2xl border border-rose-100 bg-[#fffaf7] p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">{employee.full_name}</p>
                    <p className="text-sm text-gray-600">
                      {employee.email || "No email"} • {employee.phone || "No phone"}
                    </p>
                  </div>

                  <span className="rounded-full bg-[#f4d6d9] px-3 py-1 text-xs font-semibold text-[#7a3f2a]">
                    {employee.role}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}