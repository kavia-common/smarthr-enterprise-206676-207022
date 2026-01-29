"use client";

import React, { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Field from "@/components/ui/Field";
import { useAuth } from "@/components/auth/AuthProvider";

type LeaveRow = {
  id: string;
  type: "Casual" | "Sick" | "Earned";
  from: string;
  to: string;
  days: number;
  status: "Pending" | "Approved" | "Rejected";
};

export default function LeavesPage() {
  const { role } = useAuth();
  const [rows, setRows] = useState<LeaveRow[]>([
    {
      id: "LV-1001",
      type: "Casual",
      from: "2026-01-10",
      to: "2026-01-11",
      days: 2,
      status: "Approved",
    },
    {
      id: "LV-1002",
      type: "Sick",
      from: "2026-01-18",
      to: "2026-01-18",
      days: 1,
      status: "Pending",
    },
  ]);

  const [form, setForm] = useState({
    type: "Casual" as LeaveRow["type"],
    from: "",
    to: "",
  });

  const columns = useMemo(
    () => [
      { key: "id", label: "Request ID" },
      { key: "type", label: "Type" },
      { key: "from", label: "From" },
      { key: "to", label: "To" },
      { key: "days", label: "Days" },
      { key: "status", label: "Status" },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-4">
      <Card
        title="Leaves"
        subtitle="Request leaves, track status, view balances (demo)."
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
          <div className="retro-card retro-card--flat">
            <div className="retro-body flex flex-col gap-3">
              <div className="font-extrabold">New leave request</div>

              <Field label="Leave type">
                <select
                  className="retro-input"
                  value={form.type}
                  onChange={(e) =>
                    setForm((s) => ({
                      ...s,
                      type: e.target.value as LeaveRow["type"],
                    }))
                  }
                >
                  <option value="Casual">Casual</option>
                  <option value="Sick">Sick</option>
                  <option value="Earned">Earned</option>
                </select>
              </Field>

              <Field label="From">
                <input
                  className="retro-input"
                  type="date"
                  value={form.from}
                  onChange={(e) => setForm((s) => ({ ...s, from: e.target.value }))}
                />
              </Field>

              <Field label="To">
                <input
                  className="retro-input"
                  type="date"
                  value={form.to}
                  onChange={(e) => setForm((s) => ({ ...s, to: e.target.value }))}
                />
              </Field>

              <button
                className="retro-btn retro-btn-primary"
                onClick={() => {
                  const id = `LV-${1000 + rows.length + 1}`;
                  setRows((prev) => [
                    {
                      id,
                      type: form.type,
                      from: form.from || "2026-01-20",
                      to: form.to || "2026-01-20",
                      days: 1,
                      status: "Pending",
                    },
                    ...prev,
                  ]);
                  setForm({ type: "Casual", from: "", to: "" });
                }}
              >
                Submit request
              </button>

              <small>
                Managers/HR can approve via the Approvals module. Your role:{" "}
                <strong>{role}</strong>
              </small>
            </div>
          </div>

          <div className="retro-card retro-card--flat">
            <div className="retro-body flex flex-col gap-3">
              <div className="font-extrabold">My requests</div>
              <Table
                columns={columns}
                rows={rows.map((r) => ({
                  ...r,
                  status: <span className="retro-chip">{r.status}</span>,
                }))}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
