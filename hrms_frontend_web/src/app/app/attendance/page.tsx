"use client";

import React, { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";

type AttendanceEntry = {
  date: string;
  inTime: string;
  outTime: string;
  hours: string;
  mode: "Remote" | "On-site";
};

export default function AttendancePage() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [mode, setMode] = useState<AttendanceEntry["mode"]>("Remote");

  const [entries, setEntries] = useState<AttendanceEntry[]>([
    {
      date: new Date(Date.now() - 86400000).toLocaleDateString(),
      inTime: "10:04",
      outTime: "18:13",
      hours: "8h 09m",
      mode: "On-site",
    },
  ]);

  const columns = useMemo(
    () => [
      { key: "date", label: "Date" },
      { key: "inTime", label: "In" },
      { key: "outTime", label: "Out" },
      { key: "hours", label: "Hours" },
      { key: "mode", label: "Mode" },
    ],
    []
  );

  return (
    <div className="flex flex-col gap-4">
      <Card
        title="Attendance"
        subtitle="Clock in/out + timesheets (demo). Replace with backend attendance endpoints."
      >
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="retro-input w-auto"
            value={mode}
            onChange={(e) => setMode(e.target.value as AttendanceEntry["mode"])}
            aria-label="Work mode"
          >
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>

          {!isClockedIn ? (
            <button
              className="retro-btn retro-btn-primary"
              onClick={() => setIsClockedIn(true)}
            >
              Clock in
            </button>
          ) : (
            <button
              className="retro-btn retro-btn-danger"
              onClick={() => {
                setIsClockedIn(false);
                const today = new Date().toLocaleDateString();
                setEntries((prev) => [
                  {
                    date: today,
                    inTime: "09:55",
                    outTime: "18:05",
                    hours: "8h 10m",
                    mode,
                  },
                  ...prev,
                ]);
              }}
            >
              Clock out
            </button>
          )}

          <span className="retro-chip">
            Status: {isClockedIn ? "Clocked in" : "Clocked out"}
          </span>
        </div>

        <div className="pt-4">
          <Table columns={columns} rows={entries} />
        </div>
      </Card>
    </div>
  );
}
