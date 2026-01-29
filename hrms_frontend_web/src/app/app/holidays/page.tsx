"use client";

import React, { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Field from "@/components/ui/Field";
import EmptyState from "@/components/ui/EmptyState";
import { useAuth } from "@/components/auth/AuthProvider";

type HolidayRow = {
  date: string;
  name: string;
  region: string;
};

export default function HolidaysPage() {
  const { role } = useAuth();

  const [rows, setRows] = useState<HolidayRow[]>([
    { date: "2026-01-01", name: "New Year", region: "All" },
    { date: "2026-01-26", name: "Republic Day", region: "IN" },
  ]);

  const [form, setForm] = useState<HolidayRow>({
    date: "",
    name: "",
    region: "All",
  });

  const columns = useMemo(
    () => [
      { key: "date", label: "Date" },
      { key: "name", label: "Holiday" },
      { key: "region", label: "Region" },
      { key: "actions", label: "Actions" },
    ],
    []
  );

  if (role !== "admin" && role !== "hr") {
    return (
      <EmptyState
        title="Access restricted"
        description="Holiday management is available for Admin/HR roles."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card title="Holidays" subtitle="Create and manage holiday calendar (demo).">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          <div className="retro-card retro-card--flat">
            <div className="retro-body flex flex-col gap-3">
              <div className="font-extrabold">Holiday list</div>
              <Table
                columns={columns}
                rows={rows.map((r) => ({
                  ...r,
                  actions: (
                    <button
                      className="retro-btn"
                      onClick={() =>
                        setRows((prev) =>
                          prev.filter((x) => !(x.date === r.date && x.name === r.name))
                        )
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
              <div className="font-extrabold">Add holiday</div>

              <Field label="Date">
                <input
                  className="retro-input"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
                />
              </Field>

              <Field label="Name">
                <input
                  className="retro-input"
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                />
              </Field>

              <Field label="Region">
                <input
                  className="retro-input"
                  value={form.region}
                  onChange={(e) => setForm((s) => ({ ...s, region: e.target.value }))}
                />
              </Field>

              <button
                className="retro-btn retro-btn-primary"
                onClick={() => {
                  setRows((prev) => [
                    { ...form, date: form.date || "2026-02-01", name: form.name || "New Holiday" },
                    ...prev,
                  ]);
                  setForm({ date: "", name: "", region: "All" });
                }}
              >
                Create
              </button>

              <small>Connect to backend /holidays endpoints once available.</small>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
