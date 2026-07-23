"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "~/lib/auth-context";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

function Signup() {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate({ to: "/account", replace: true });
    return null;
  }

  const validate = (): string | null => {
    if (!email.trim() || !password || !confirmPassword) {
      return "Please fill in all required fields";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (password !== confirmPassword) {
      return "Passwords don't match";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await signup(
        email.trim(),
        password,
        name.trim() || undefined,
      );
      navigate({ to: "/account", replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
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
            🌲 Join the Adventure
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Create your CampCraft account
          </h1>
          <p className="mt-2 text-base text-white/75">
            Save your trips, checklists, and meal plans — and get smarter
            recommendations every time you camp.
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

              {/* Name */}
              <div className="mb-5">
                <label
                  htmlFor="signup-name"
                  className="mb-1.5 block text-sm font-semibold text-bark"
                >
                  Name{" "}
                  <span className="font-normal text-bark-light">(optional)</span>
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-3 text-base text-bark placeholder:text-bark-light/50 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="signup-email"
                  className="mb-1.5 block text-sm font-semibold text-bark"
                >
                  Email
                </label>
                <input
                  id="signup-email"
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
              <div className="mb-5">
                <label
                  htmlFor="signup-password"
                  className="mb-1.5 block text-sm font-semibold text-bark"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-3 text-base text-bark placeholder:text-bark-light/50 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>

              {/* Confirm password */}
              <div className="mb-6">
                <label
                  htmlFor="signup-confirm"
                  className="mb-1.5 block text-sm font-semibold text-bark"
                >
                  Confirm password
                </label>
                <input
                  id="signup-confirm"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Same as above"
                  autoComplete="new-password"
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
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-bark-light">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-forest no-underline hover:underline"
              >
                Log in
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
