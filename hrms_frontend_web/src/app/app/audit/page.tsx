"use client";

import React, { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import EmptyState from "@/components/ui/EmptyState";
import { useAuth } from "@/components/auth/AuthProvider";

type AuditRow = {
  at: string;
  actor: string;
  action: string;
  target: string;
};

export default function AuditPage() {
  const { role } = useAuth();
  const [rows] = useState<AuditRow[]>([
    {
      at: new Date().toISOString(),
      actor: "admin@smarthr.ai",
      action: "LOGIN",
      target: "auth",
    },
    {
      at: new Date(Date.now() - 3600_000).toISOString(),
      actor: "hr@smarthr.ai",
      action: "CREATE_HOLIDAY",
      target: "2026-01-26",
    },
  ]);

  const columns = useMemo(
    () => [
      { key: "at", label: "Timestamp" },
      { key: "actor", label: "Actor" },
      { key: "action", label: "Action" },
      { key: "target", label: "Target" },
    ],
    []
  );

  if (role !== "admin") {
    return (
      <EmptyState
        title="Access restricted"
        description="Audit logs are available for Admin only."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card title="Audit Logs" subtitle="Security + activity trail (demo).">
        <Table columns={columns} rows={rows} />
      </Card>
    </div>
  );
}
