"use client";

import React, { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Field from "@/components/ui/Field";
import EmptyState from "@/components/ui/EmptyState";
import { useAuth } from "@/components/auth/AuthProvider";

type EmployeeRow = {
  id: string;
  name: string;
  email: string;
  department: string;
  manager: string;
  status: "Active" | "Onboarding";
};

export default function EmployeesPage() {
  const { role } = useAuth();
  const [rows, setRows] = useState<EmployeeRow[]>([
    {
      id: "EMP-001",
      name: "Asha Iyer",
      email: "asha@smarthr.ai",
      department: "Engineering",
      manager: "Manager One",
      status: "Active",
    },
    {
      id: "EMP-002",
      name: "Rohan Kumar",
      email: "rohan@smarthr.ai",
      department: "Design",
      manager: "Manager Two",
      status: "Onboarding",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    manager: "",
  });

  const columns = useMemo(
    () => [
      { key: "id", label: "Employee ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "department", label: "Department" },
      { key: "manager", label: "Manager" },
      { key: "status", label: "Status" },
      { key: "actions", label: "Actions" },
    ],
    []
  );

  if (role === "employee") {
    return (
      <EmptyState
        title="Access restricted"
        description="Employees module is available for Admin/HR/Manager roles."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card
        title="Employees"
        subtitle="Directory + onboarding (demo data). Wire this page to backend /employees endpoints once available."
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          <div className="retro-card retro-card--flat">
            <div className="retro-body flex flex-col gap-3">
              <div className="font-extrabold">Directory</div>
              <Table
                columns={columns}
                rows={rows.map((r) => ({
                  ...r,
                  status: <span className="retro-chip">{r.status}</span>,
                  actions: (
                    <button
                      className="retro-btn"
                      onClick={() =>
                        setRows((prev) => prev.filter((x) => x.id !== r.id))
                      }
                    >
                      Remove
                    </button>
                  ),
                }))}
              />
            </div>
          </div>

          <div className="retro-card retro-card--flat">
            <div className="retro-body flex flex-col gap-3">
              <div className="font-extrabold">Add employee</div>

              <Field label="Name">
                <input
                  className="retro-input"
                  value={form.name}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, name: e.target.value }))
                  }
                />
              </Field>

              <Field label="Email">
                <input
                  className="retro-input"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, email: e.target.value }))
                  }
                />
              </Field>

              <Field label="Department">
                <input
                  className="retro-input"
                  value={form.department}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, department: e.target.value }))
                  }
                />
              </Field>

              <Field label="Manager">
                <input
                  className="retro-input"
                  value={form.manager}
                  onChange={(e) =>
                    setForm((s) => ({ ...s, manager: e.target.value }))
                  }
                />
              </Field>

              <button
                className="retro-btn retro-btn-primary"
                onClick={() => {
                  const id = `EMP-${String(rows.length + 1).padStart(3, "0")}`;
                  setRows((prev) => [
                    ...prev,
                    {
                      id,
                      name: form.name || "New Employee",
                      email: form.email || "new@smarthr.ai",
                      department: form.department || "General",
                      manager: form.manager || "Unassigned",
                      status: "Onboarding",
                    },
                  ]);
                  setForm({ name: "", email: "", department: "", manager: "" });
                }}
              >
                Create
              </button>

              <small>
                Replace local state with API create/list/delete calls once backend
                endpoints are available.
              </small>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
