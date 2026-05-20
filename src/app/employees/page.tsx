import AppShell from "../../components/AppShell";
import EmployeesClient from "./EmployeesClient";

export default function EmployeesPage() {
  return (
    <AppShell
      title="Employees"
      subtitle="Manage Floreria Florentina staff records and login access."
    >
      <EmployeesClient />
    </AppShell>
  );
}