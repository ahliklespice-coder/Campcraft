"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "~/lib/auth-context";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate({ to: "/account", replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Please fill in both email and password");
      return;
    }

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      navigate({ to: "/account", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-dvh bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-b from-forest-dark to-forest px-4 pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/90">
            👋 Welcome Back
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Log in to CampCraft
          </h1>
          <p className="mt-2 text-base text-white/75">
            Pick up right where you left off — your trips, checklists, and meal plans
            are waiting.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-stone-warm/80 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="login-email"
                  className="mb-1.5 block text-sm font-semibold text-bark"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-3 text-base text-bark placeholder:text-bark-light/50 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <label
                  htmlFor="login-password"
                  className="mb-1.5 block text-sm font-semibold text-bark"
                >
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-3 text-base text-bark placeholder:text-bark-light/50 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-amber px-8 py-3.5 text-lg font-semibold text-white shadow-md shadow-amber/20 transition-all hover:bg-amber-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Spinner />
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-bark-light">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-forest no-underline hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
