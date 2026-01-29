"use client";

import React from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { useAuth } from "@/components/auth/AuthProvider";
import type { Role } from "@/lib/routes";

function dashboardCopy(role: Role) {
  switch (role) {
    case "admin":
      return {
        title: "Admin Dashboard",
        desc: "System oversight, RBAC, audit visibility, and global controls.",
      };
    case "hr":
      return {
        title: "HR Dashboard",
        desc: "Employee lifecycle, leaves, holidays, payroll, and compliance workflows.",
      };
    case "manager":
      return {
        title: "Manager Dashboard",
        desc: "Team attendance, leave approvals, and quick team insights.",
      };
    case "employee":
      return {
        title: "Employee Dashboard",
        desc: "Clock in/out, request leave, and view balances & holidays.",
      };
  }
}

export default function AppHome() {
  const { role } = useAuth();
  if (!role) return null;

  const copy = dashboardCopy(role);

  return (
    <div className="flex flex-col gap-4">
      <Card title={copy.title} subtitle={copy.desc}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="retro-card retro-card--flat">
            <div className="retro-body flex flex-col gap-2">
              <div className="font-extrabold">Quick Actions</div>
              <div className="flex flex-wrap gap-2">
                <Link className="retro-btn retro-btn-primary" href="/app/attendance">
                  Attendance
                </Link>
                <Link className="retro-btn" href="/app/leaves">
                  Leaves
                </Link>
                {role !== "employee" ? (
                  <Link className="retro-btn" href="/app/employees">
                    Employees
                  </Link>
                ) : null}
              </div>
              <small>
                Backend integration is prepared; endpoints will populate these cards once available.
              </small>
            </div>
          </div>

          <div className="retro-card retro-card--flat">
            <div className="retro-body flex flex-col gap-2">
              <div className="font-extrabold">Leave Balance</div>
              <div className="text-3xl font-black">12.0</div>
              <small>Demo value • will be fetched from API</small>
            </div>
          </div>

          <div className="retro-card retro-card--flat">
            <div className="retro-body flex flex-col gap-2">
              <div className="font-extrabold">Today</div>
              <div className="text-lg font-black">
                {new Date().toLocaleDateString()}
              </div>
              <small>Holiday + attendance status will appear here</small>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
