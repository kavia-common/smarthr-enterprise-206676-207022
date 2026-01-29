"use client";

import React from "react";
import Card from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { useAuth } from "@/components/auth/AuthProvider";

export default function PayrollPage() {
  const { role } = useAuth();

  if (role !== "admin" && role !== "hr") {
    return (
      <EmptyState
        title="Access restricted"
        description="Payroll module is available for Admin/HR roles."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card
        title="Payroll"
        subtitle="Payroll data management (placeholder UI)."
      >
        <div className="retro-card retro-card--flat">
          <div className="retro-body flex flex-col gap-2">
            <div className="font-extrabold">Coming next</div>
            <small>
              This area will include payroll runs, salary components, payslips,
              and exports. Wire to backend payroll endpoints when present.
            </small>
          </div>
        </div>
      </Card>
    </div>
  );
}
