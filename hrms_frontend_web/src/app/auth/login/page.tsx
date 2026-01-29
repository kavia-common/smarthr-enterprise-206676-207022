"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/ui/Card";
import Field from "@/components/ui/Field";
import { useAuth } from "@/components/auth/AuthProvider";
import type { Role } from "@/lib/routes";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z.enum(["admin", "hr", "manager", "employee"]),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", role: "employee" },
  });

  async function onSubmit(values: FormValues) {
    setError(null);

    try {
      /**
       * Backend OpenAPI currently contains only / health check.
       * For now we simulate login by generating a token-like string and storing role.
       * Once backend auth endpoints exist, replace this block with apiFetch().
       */
      const fakeToken = `demo.${btoa(values.email)}.${Date.now()}`;
      auth.signIn({ token: fakeToken, role: values.role as Role, email: values.email });
      router.push("/app");
    } catch {
      setError("Login failed. Please try again.");
    }
  }

  return (
    <main className="min-h-screen">
      <div className="container-shell">
        <Card
          title="Sign in"
          subtitle="Use your credentials. Role controls what you can see in the app."
        >
          <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <Field
              label="Email"
              error={form.formState.errors.email?.message}
            >
              <input className="retro-input" type="email" {...form.register("email")} />
            </Field>

            <Field
              label="Password"
              hint="(Demo accepts any password ≥ 4 chars)"
              error={form.formState.errors.password?.message}
            >
              <input className="retro-input" type="password" {...form.register("password")} />
            </Field>

            <Field label="Role" hint="Demo role switch" error={form.formState.errors.role?.message}>
              <select className="retro-input" {...form.register("role")}>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="hr">HR</option>
                <option value="admin">Admin</option>
              </select>
            </Field>

            {error ? (
              <div className="retro-card retro-card--flat">
                <div className="retro-body text-[var(--danger)] font-bold">{error}</div>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              <button className="retro-btn retro-btn-primary" type="submit">
                Sign in
              </button>
              <button
                className="retro-btn"
                type="button"
                onClick={() => router.push("/auth/register")}
              >
                Create account
              </button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
