"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "~/lib/auth-context";
import {
  getTrips,
  getTrip,
  deleteTrip,
  updateProfile,
  changePassword,
  type Trip,
} from "~/lib/auth";

export const Route = createFileRoute("/account")({
  component: Account,
});

type Tab = "trips" | "settings";

// ── Main Account Page ────────────────────────────────────────────────────────

function Account() {
  const { user, isAuthenticated, isLoading, isPremium, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("trips");

  if (isLoading) {
    return (
      <main className="min-h-dvh bg-cream">
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      </main>
    );
  }

  if (!isAuthenticated || !user) {
    navigate({ to: "/login", replace: true });
    return null;
  }

  return (
    <main className="min-h-dvh bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-b from-forest-dark to-forest px-4 pb-10 pt-10 sm:pb-14 sm:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/90">
            {isPremium ? "✨ Premium Member" : "🏕️ My Account"}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            {user.name ? `Welcome, ${user.name}` : "Welcome back!"}
          </h1>
          <p className="mt-2 text-base text-white/75">{user.email}</p>
        </div>
      </section>

      {/* Tab bar */}
      <section className="border-b border-stone-warm/80 bg-white">
        <div className="mx-auto flex max-w-2xl px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setTab("trips")}
            className={`px-4 py-3 text-sm font-semibold transition-colors ${
              tab === "trips"
                ? "border-b-2 border-forest text-forest"
                : "text-bark-light hover:text-bark"
            }`}
          >
            🗺️ My Trips
          </button>
          <button
            type="button"
            onClick={() => setTab("settings")}
            className={`px-4 py-3 text-sm font-semibold transition-colors ${
              tab === "settings"
                ? "border-b-2 border-forest text-forest"
                : "text-bark-light hover:text-bark"
            }`}
          >
            ⚙️ Settings
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-2xl">
          {tab === "trips" && <TripsTab />}
          {tab === "settings" && (
            <SettingsTab user={user} onLogout={logout} />
          )}
        </div>
      </section>
    </main>
  );
}

// ── Trips Tab ────────────────────────────────────────────────────────────────

function TripsTab() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingTrip, setViewingTrip] = useState<Trip | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const loadTrips = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getTrips();
      setTrips(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load trips");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleDelete = async (tripId: string) => {
    if (!confirm("Delete this trip? This can't be undone.")) return;
    setDeletingId(tripId);
    try {
      await deleteTrip({ data: { tripId } });
      setTrips((prev) => prev.filter((t) => t.id !== tripId));
      if (viewingTrip?.id === tripId) setViewingTrip(null);
      setToast("Trip deleted");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete trip");
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = async (tripId: string) => {
    try {
      const trip = await getTrip({ data: { tripId } });
      setViewingTrip(trip);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load trip");
    }
  };

  // Viewing a single trip's details
  if (viewingTrip) {
    return (
      <div>
        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setViewingTrip(null)}
            className="flex items-center gap-2 rounded-full border border-stone-warm bg-white px-4 py-2 text-sm font-medium text-bark transition-colors hover:bg-stone-warm"
          >
            ← Back to Trips
          </button>
        </div>
        <TripDetail trip={viewingTrip} />
      </div>
    );
  }

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-bark px-6 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-700">{error}</p>
          <button
            type="button"
            onClick={loadTrips}
            className="mt-3 text-sm font-medium text-forest underline"
          >
            Try again
          </button>
        </div>
      ) : trips.length === 0 ? (
        <div className="rounded-2xl border border-stone-warm/80 bg-white p-8 text-center shadow-sm">
          <span className="text-5xl">🏕️</span>
          <h3 className="mt-4 text-lg font-bold text-forest-dark">
            No trips yet
          </h3>
          <p className="mt-2 text-sm text-bark-light">
            Plan your first camping trip and save it here to come back anytime.
          </p>
          <Link
            to="/plan"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-white shadow-md shadow-amber/20 transition-all hover:bg-amber-dark"
          >
            Plan a Trip →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-bark-light">
              {trips.length} {trips.length === 1 ? "trip" : "trips"} saved
            </p>
            <Link
              to="/plan"
              className="rounded-full bg-amber px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-amber-dark"
            >
              + New Trip
            </Link>
          </div>

          {trips.map((trip) => (
            <div
              key={trip.id}
              className="rounded-2xl border border-stone-warm/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-forest-dark">
                    {trip.destination}
                  </h3>
                  <p className="mt-1 text-sm text-bark-light">
                    {trip.start_date}
                    {trip.start_date !== trip.end_date &&
                      ` — ${trip.end_date}`}
                    {" · "}
                    {trip.adults} {trip.adults === 1 ? "adult" : "adults"}
                    {trip.children > 0 && `, ${trip.children} children`}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {trip.experience_level && (
                      <span className="rounded-full bg-stone-warm px-2.5 py-0.5 text-xs font-medium text-bark-light">
                        {trip.experience_level === "first-time"
                          ? "🌱 First time"
                          : trip.experience_level === "been-a-few-times"
                            ? "🥾 Experienced"
                            : "⛰️ Expert"}
                      </span>
                    )}
                    {trip.trip_style && (
                      <span className="rounded-full bg-amber/10 px-2.5 py-0.5 text-xs font-medium text-amber-dark">
                        {trip.trip_style === "relaxed"
                          ? "🌿 Relaxed"
                          : trip.trip_style === "adventure"
                            ? "🧗 Adventure"
                            : "👨‍👩‍👧‍👦 Family"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-3 border-t border-stone-warm/60 pt-4">
                <button
                  type="button"
                  onClick={() => handleView(trip.id)}
                  className="flex items-center gap-1.5 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-dark"
                >
                  👁️ View
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(trip.id)}
                  disabled={deletingId === trip.id}
                  className="flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === trip.id ? (
                    <Spinner />
                  ) : (
                    "🗑️ Delete"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Trip Detail View ─────────────────────────────────────────────────────────

function TripDetail({ trip }: { trip: Trip }) {
  return (
    <div className="space-y-6">
      {/* Summary card */}
      <div className="rounded-2xl bg-gradient-to-r from-forest to-forest-light p-5 text-white shadow-md sm:p-6">
        <h2 className="text-xl font-bold">{trip.destination}</h2>
        <p className="mt-1 text-sm text-white/75">
          {trip.start_date} — {trip.end_date} · {trip.adults}{" "}
          {trip.adults === 1 ? "adult" : "adults"}
          {trip.children > 0 && `, ${trip.children} children`}
        </p>
      </div>

      {/* Itinerary */}
      {trip.itinerary && (
        <div className="rounded-2xl border border-stone-warm/80 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-forest-dark">
            🗺️ Your Itinerary
          </h3>
          <ItineraryDisplay data={trip.itinerary} />
        </div>
      )}

      {/* Packing checklist */}
      {trip.packing_checklist && (
        <div className="rounded-2xl border border-stone-warm/80 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-forest-dark">
            🎒 Packing Checklist
          </h3>
          <ChecklistDisplay data={trip.packing_checklist} />
        </div>
      )}

      {/* Meal plan */}
      {trip.meal_plan && (
        <div className="rounded-2xl border border-stone-warm/80 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-forest-dark">
            🍳 Meal Plan
          </h3>
          <MealPlanDisplay data={trip.meal_plan} />
        </div>
      )}

      {!trip.itinerary && !trip.packing_checklist && !trip.meal_plan && (
        <div className="rounded-2xl border border-stone-warm/80 bg-white p-8 text-center shadow-sm">
          <span className="text-4xl">📋</span>
          <p className="mt-3 text-bark-light">
            This trip was saved without itinerary, checklist, or meal plan
            details.
          </p>
        </div>
      )}
    </div>
  );
}

function ItineraryDisplay({ data }: { data: unknown }) {
  const it = data as Record<string, unknown> | null;
  if (!it) return <p className="text-sm text-bark-light">No itinerary data</p>;

  return (
    <div>
      {it.summary && (
        <p className="mb-4 text-sm leading-relaxed text-bark">
          {String(it.summary)}
        </p>
      )}
      <div className="space-y-3">
        {Array.isArray(it.days) &&
          it.days.map((day: Record<string, unknown>, i: number) => (
            <div
              key={i}
              className="rounded-xl border border-stone-warm/60 bg-stone-warm/30 p-4"
            >
              <p className="text-sm font-bold text-forest-dark">
                Day {day.dayNumber}: {String(day.label ?? "Day")}
              </p>
              {day.morning && (
                <p className="mt-1 text-xs text-bark-light">
                  ☀️ Morning:{" "}
                  {String(
                    (day.morning as Record<string, unknown>).title ?? "",
                  )}
                </p>
              )}
              {day.afternoon && (
                <p className="mt-0.5 text-xs text-bark-light">
                  🌤️ Afternoon:{" "}
                  {String(
                    (day.afternoon as Record<string, unknown>).title ?? "",
                  )}
                </p>
              )}
              {day.evening && (
                <p className="mt-0.5 text-xs text-bark-light">
                  🌙 Evening:{" "}
                  {String(
                    (day.evening as Record<string, unknown>).title ?? "",
                  )}
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

function ChecklistDisplay({ data }: { data: unknown }) {
  const cl = data as Record<string, unknown> | null;
  if (!cl) return <p className="text-sm text-bark-light">No checklist data</p>;

  const categories = cl.categories as
    | Map<string, unknown>
    | Record<string, unknown>
    | undefined;
  if (!categories)
    return <p className="text-sm text-bark-light">No checklist categories</p>;

  const entries = Object.entries(categories);
  if (entries.length === 0)
    return <p className="text-sm text-bark-light">Empty checklist</p>;

  return (
    <div className="space-y-3">
      {entries.map(([, catData], idx) => {
        const cat = catData as
          | { label?: string; items?: Array<{ name: string; essential?: boolean }> }
          | undefined;
        if (!cat?.items?.length) return null;
        return (
          <div
            key={idx}
            className="rounded-xl border border-stone-warm/60 bg-stone-warm/30 p-4"
          >
            <p className="text-sm font-bold text-forest-dark">
              {cat.label ?? "Category"}
            </p>
            <ul className="mt-2 space-y-1">
              {cat.items.map((item, i) => (
                <li key={i} className="text-xs text-bark-light">
                  {item.essential ? "⭐ " : "• "}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function MealPlanDisplay({ data }: { data: unknown }) {
  const mp = data as Record<string, unknown> | null;
  if (!mp) return <p className="text-sm text-bark-light">No meal plan data</p>;

  return (
    <div>
      {mp.summary && (
        <p className="mb-4 text-sm leading-relaxed text-bark">
          {String(mp.summary)}
        </p>
      )}
      <div className="space-y-3">
        {Array.isArray(mp.days) &&
          mp.days.map((day: Record<string, unknown>, i: number) => (
            <div
              key={i}
              className="rounded-xl border border-stone-warm/60 bg-stone-warm/30 p-4"
            >
              <p className="text-sm font-bold text-forest-dark">
                Day {day.dayNumber}: {String(day.label ?? "Day")}
              </p>
              <div className="mt-2 space-y-1">
                {Array.isArray(day.meals) &&
                  day.meals.map(
                    (meal: Record<string, unknown>, j: number) => (
                      <p key={j} className="text-xs text-bark-light">
                        {String(meal.label ?? "")}:{" "}
                        {String(
                          (
                            (meal.recipe as Record<string, unknown>) ?? {}
                          ).name ?? "",
                        )}
                      </p>
                    ),
                  )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

// ── Settings Tab ─────────────────────────────────────────────────────────────

function SettingsTab({
  user,
  onLogout,
}: {
  user: {
    id: string;
    email: string;
    name: string | null;
    premium_until: string | null;
  };
  onLogout: () => Promise<void>;
}) {
  const isPremium = !!user.premium_until && new Date(user.premium_until) > new Date();
  const navigate = useNavigate();

  const [profileName, setProfileName] = useState(user.name ?? "");
  const [profileEmail, setProfileEmail] = useState(user.email);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSaving, setProfileSaving] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwMsg, setPwMsg] = useState<string | null>(null);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSaving, setPwSaving] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileError(null);
    setProfileSaving(true);
    try {
      await updateProfile({
        data: {
          name: profileName || undefined,
          email: profileEmail !== user.email ? profileEmail : undefined,
        },
      });
      setProfileMsg("Profile updated!");
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg(null);
    setPwError(null);

    if (newPassword.length < 8) {
      setPwError("New password must be at least 8 characters");
      return;
    }

    setPwSaving(true);
    try {
      await changePassword({ data: { oldPassword, newPassword } });
      setPwMsg("Password changed!");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setPwError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setPwSaving(false);
    }
  };

  const handleLogout = async () => {
    await onLogout();
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="space-y-8">
      {/* Membership card */}
      <div className="rounded-2xl border border-stone-warm/80 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-bark-light">
          Membership
        </h3>
        <div className="mt-3 flex items-center gap-4">
          <span className="text-3xl">{isPremium ? "✨" : "🏕️"}</span>
          <div>
            <p className="text-lg font-bold text-forest-dark">
              {isPremium ? "Premium Member" : "Free Plan"}
            </p>
            <p className="text-sm text-bark-light">
              {isPremium
                ? `Premium until ${new Date(user.premium_until!).toLocaleDateString()}`
                : "3 trips · basic planning tools"}
            </p>
          </div>
          {!isPremium && (
            <a
              href="/pricing"
              className="ml-auto rounded-full bg-gradient-to-r from-amber to-amber-light px-4 py-2 text-sm font-semibold text-white no-underline shadow-sm transition-all hover:from-amber-dark hover:to-amber"
            >
              ✨ Upgrade
            </a>
          )}
        </div>
      </div>

      {/* Profile form */}
      <div className="rounded-2xl border border-stone-warm/80 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-bark-light">
          Profile
        </h3>
        <form onSubmit={handleProfileUpdate} className="mt-4 space-y-4">
          {profileMsg && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {profileMsg}
            </div>
          )}
          {profileError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {profileError}
            </div>
          )}
          <div>
            <label
              htmlFor="settings-name"
              className="mb-1 block text-sm font-medium text-bark"
            >
              Name
            </label>
            <input
              id="settings-name"
              type="text"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-2.5 text-sm text-bark transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </div>
          <div>
            <label
              htmlFor="settings-email"
              className="mb-1 block text-sm font-medium text-bark"
            >
              Email
            </label>
            <input
              id="settings-email"
              type="email"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-2.5 text-sm text-bark transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </div>
          <button
            type="submit"
            disabled={profileSaving}
            className="flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-dark disabled:opacity-50"
          >
            {profileSaving ? <Spinner /> : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Change password */}
      <div className="rounded-2xl border border-stone-warm/80 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-bark-light">
          Change Password
        </h3>
        <form onSubmit={handlePasswordChange} className="mt-4 space-y-4">
          {pwMsg && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {pwMsg}
            </div>
          )}
          {pwError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {pwError}
            </div>
          )}
          <div>
            <label
              htmlFor="settings-oldpw"
              className="mb-1 block text-sm font-medium text-bark"
            >
              Current password
            </label>
            <input
              id="settings-oldpw"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-2.5 text-sm text-bark transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </div>
          <div>
            <label
              htmlFor="settings-newpw"
              className="mb-1 block text-sm font-medium text-bark"
            >
              New password
            </label>
            <input
              id="settings-newpw"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-2.5 text-sm text-bark transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
            />
          </div>
          <button
            type="submit"
            disabled={pwSaving}
            className="flex items-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-dark disabled:opacity-50"
          >
            {pwSaving ? <Spinner /> : "Change Password"}
          </button>
        </form>
      </div>

      {/* Logout */}
      <div className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-red-600">
          Danger Zone
        </h3>
        <p className="mt-2 text-sm text-bark-light">
          Log out of your account on this device.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 rounded-full border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
        >
          🚪 Log Out
        </button>
      </div>
    </div>
  );
}

// ── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ size = "md" }: { size?: "md" | "lg" }) {
  const sizeClass = size === "lg" ? "h-8 w-8" : "h-5 w-5";
  return (
    <svg
      className={`animate-spin ${sizeClass} text-current`}
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
