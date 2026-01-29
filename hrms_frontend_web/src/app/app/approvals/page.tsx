"use client";

import React, { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import EmptyState from "@/components/ui/EmptyState";
import { useAuth } from "@/components/auth/AuthProvider";

type ApprovalRow = {
  id: string;
  employee: string;
  type: string;
  from: string;
  to: string;
  status: "Pending" | "Approved" | "Rejected";
};

export default function ApprovalsPage() {
  const { role } = useAuth();
  const [rows, setRows] = useState<ApprovalRow[]>([
    {
      id: "LV-1002",
      employee: "Rohan Kumar",
      type: "Sick",
      from: "2026-01-18",
      to: "2026-01-18",
      status: "Pending",
    },
  ]);

  const columns = useMemo(
    () => [
      { key: "id", label: "Request ID" },
      { key: "employee", label: "Employee" },
      { key: "type", label: "Type" },
      { key: "from", label: "From" },
      { key: "to", label: "To" },
      { key: "status", label: "Status" },
      { key: "actions", label: "Actions" },
    ],
    []
  );

  if (!role || role === "employee") {
    return (
      <EmptyState
        title="Approvals unavailable"
        description="Only Managers/HR/Admin can approve or reject requests."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card
        title="Approvals"
        subtitle="Pending leave approvals (demo). Connect to backend approval workflow endpoints."
      >
        <Table
          columns={columns}
          rows={rows.map((r) => ({
            ...r,
            status: <span className="retro-chip">{r.status}</span>,
            actions:
              r.status === "Pending" ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    className="retro-btn retro-btn-primary"
                    onClick={() =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === r.id ? { ...x, status: "Approved" } : x
                        )
                      )
                    }
                  >
                    Approve
                  </button>
                  <button
                    className="retro-btn retro-btn-danger"
                    onClick={() =>
                      setRows((prev) =>
                        prev.map((x) =>
                          x.id === r.id ? { ...x, status: "Rejected" } : x
                        )
                      )
                    }
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <small>No actions</small>
              ),
          }))}
        />
      </Card>
    </div>
  );
}
