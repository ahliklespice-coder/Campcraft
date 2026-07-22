"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  generateItinerary,
  formatExperienceLevel,
  formatTripStyle,
  type TripInput,
  type Itinerary,
  type ExperienceLevel,
  type TripStyle,
} from "~/lib/itinerary-generator";

export const Route = createFileRoute("/plan")({
  component: Plan,
});

// ── Constants ──────────────────────────────────────────────────────────────

const EXPERIENCE_OPTIONS: { value: ExperienceLevel; label: string; emoji: string }[] = [
  { value: "first-time", label: "First time camper", emoji: "🌱" },
  { value: "been-a-few-times", label: "Been a few times", emoji: "🥾" },
  { value: "pretty-experienced", label: "Pretty experienced", emoji: "⛰️" },
];

const STYLE_OPTIONS: { value: TripStyle; label: string; emoji: string }[] = [
  { value: "relaxed", label: "Relaxed getaway", emoji: "🌿" },
  { value: "adventure", label: "Adventure packed", emoji: "🧗" },
  { value: "family", label: "Family fun", emoji: "👨‍👩‍👧‍👦" },
];

// ── Component ──────────────────────────────────────────────────────────────

function Plan() {
  // Form state
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | "">("");
  const [tripStyle, setTripStyle] = useState<TripStyle | "">("");

  // UI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Form validation
  const isFormValid =
    destination.trim().length > 0 &&
    startDate !== "" &&
    endDate !== "" &&
    adults > 0 &&
    experienceLevel !== "";

  const dateError =
    startDate && endDate && new Date(endDate) < new Date(startDate)
      ? "End date must be on or after start date"
      : null;

  // Handle submit
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFormValid || dateError) return;

      setIsGenerating(true);

      // Brief artificial delay for the "AI magic" feel (and smooth UX)
      setTimeout(() => {
        const input: TripInput = {
          destination: destination.trim(),
          startDate,
          endDate,
          adults,
          children,
          experienceLevel: experienceLevel as ExperienceLevel,
          tripStyle: tripStyle || undefined,
        };

        const result = generateItinerary(input);
        setItinerary(result);
        setIsGenerating(false);

        // Scroll to results after a short delay for render
        setTimeout(() => {
          itineraryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }, 1200);
    },
    [destination, startDate, endDate, adults, children, experienceLevel, tripStyle, isFormValid, dateError],
  );

  const handleStartOver = useCallback(() => {
    setItinerary(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSaveTrip = useCallback(() => {
    setToast("✨ Trip saved! (Persistence coming soon — your itinerary is safe on this page for now.)");
  }, []);

  // Build checklist search params from the generated itinerary
  const checklistSearchParams = useMemo((): Record<string, string> | undefined => {
    if (!itinerary) return undefined;
    const sp: Record<string, string> = {
      destination: itinerary.destination,
      adults: String(itinerary.adults),
      children: String(itinerary.children),
      experienceLevel: itinerary.experienceLevel,
      totalDays: String(itinerary.totalDays),
    };
    if (itinerary.tripStyle) sp.tripStyle = itinerary.tripStyle;
    return sp;
  }, [itinerary]);

  return (
    <main className="min-h-dvh bg-cream">
      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-bark px-6 py-3 text-sm font-medium text-white shadow-lg animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}

      {/* Hero banner */}
      <section className="bg-gradient-to-b from-forest-dark to-forest px-4 pb-12 pt-10 sm:pb-16 sm:pt-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium text-white/90">
            🏕️ Trip Planner
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Plan your perfect camping trip
          </h1>
          <p className="mt-3 text-base leading-relaxed text-white/75 sm:text-lg">
            Tell us about your trip and we'll create a personalized day-by-day itinerary —
            no experience required.
          </p>
        </div>
      </section>

      {/* Form + Results */}
      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-2xl">
          {/* Form card */}
          {!itinerary && (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-stone-warm/80 bg-white p-6 shadow-sm sm:p-8"
            >
              {/* Destination */}
              <div className="mb-6">
                <label
                  htmlFor="destination"
                  className="mb-1.5 block text-sm font-semibold text-bark"
                >
                  Where are you headed?
                </label>
                <input
                  id="destination"
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Yosemite National Park, Big Sur, Shenandoah..."
                  className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-3 text-base text-bark placeholder:text-bark-light/50 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                />
              </div>

              {/* Dates */}
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="startDate"
                    className="mb-1.5 block text-sm font-semibold text-bark"
                  >
                    Start date
                  </label>
                  <input
                    id="startDate"
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-3 text-base text-bark transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="endDate"
                    className="mb-1.5 block text-sm font-semibold text-bark"
                  >
                    End date
                  </label>
                  <input
                    id="endDate"
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-xl border border-stone-warm bg-cream px-4 py-3 text-base text-bark transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20"
                  />
                </div>
              </div>
              {dateError && (
                <p className="-mt-4 mb-6 text-sm text-red-500">{dateError}</p>
              )}

              {/* Group size */}
              <fieldset className="mb-6">
                <legend className="mb-1.5 text-sm font-semibold text-bark">
                  Who's coming along?
                </legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="adults"
                      className="mb-1 block text-xs font-medium text-bark-light"
                    >
                      Adults
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAdults((n) => Math.max(1, n - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm"
                        aria-label="Decrease adults"
                      >
                        −
                      </button>
                      <span className="min-w-[2ch] text-center text-xl font-bold text-bark">
                        {adults}
                      </span>
                      <button
                        type="button"
                        onClick={() => setAdults((n) => Math.min(12, n + 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm"
                        aria-label="Increase adults"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="children"
                      className="mb-1 block text-xs font-medium text-bark-light"
                    >
                      Children
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setChildren((n) => Math.max(0, n - 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm"
                        aria-label="Decrease children"
                      >
                        −
                      </button>
                      <span className="min-w-[2ch] text-center text-xl font-bold text-bark">
                        {children}
                      </span>
                      <button
                        type="button"
                        onClick={() => setChildren((n) => Math.min(12, n + 1))}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-warm bg-cream text-lg font-medium text-bark transition-colors hover:bg-stone-warm"
                        aria-label="Increase children"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Experience level */}
              <fieldset className="mb-6">
                <legend className="mb-3 text-sm font-semibold text-bark">
                  How's your camping experience?
                </legend>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                        experienceLevel === opt.value
                          ? "border-forest bg-forest/5 ring-1 ring-forest/30"
                          : "border-stone-warm bg-cream hover:bg-stone-warm/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="experience"
                        value={opt.value}
                        checked={experienceLevel === opt.value}
                        onChange={() => setExperienceLevel(opt.value)}
                        className="sr-only"
                      />
                      <span className="text-xl">{opt.emoji}</span>
                      <span className="text-sm font-medium text-bark">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Trip style (optional) */}
              <fieldset className="mb-8">
                <legend className="mb-3 text-sm font-semibold text-bark">
                  What's your vibe?{" "}
                  <span className="font-normal text-bark-light">(optional)</span>
                </legend>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {STYLE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                        tripStyle === opt.value
                          ? "border-amber bg-amber/5 ring-1 ring-amber/30"
                          : "border-stone-warm bg-cream hover:bg-stone-warm/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="tripStyle"
                        value={opt.value}
                        checked={tripStyle === opt.value}
                        onChange={() => setTripStyle(opt.value)}
                        className="sr-only"
                      />
                      <span className="text-xl">{opt.emoji}</span>
                      <span className="text-sm font-medium text-bark">{opt.label}</span>
                    </label>
                  ))}
                </div>
                {/* Clear style button */}
                {tripStyle && (
                  <button
                    type="button"
                    onClick={() => setTripStyle("")}
                    className="mt-2 text-xs text-bark-light underline underline-offset-2 hover:text-bark"
                  >
                    Clear selection
                  </button>
                )}
              </fieldset>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isFormValid || !!dateError || isGenerating}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-amber px-8 py-3.5 text-lg font-semibold text-white shadow-md shadow-amber/20 transition-all hover:bg-amber-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
              >
                {isGenerating ? (
                  <>
                    <Spinner />
                    Crafting your itinerary...
                  </>
                ) : (
                  <>
                    Generate My Itinerary
                    <span aria-hidden="true">✨</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Loading overlay for generating state on re-submit */}
          {isGenerating && itinerary && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Spinner size="lg" />
              <p className="text-lg font-medium text-bark-light">
                Crafting your new itinerary...
              </p>
            </div>
          )}

          {/* Itinerary results */}
          {itinerary && !isGenerating && (
            <div ref={itineraryRef}>
              {/* Action buttons */}
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="flex items-center justify-center gap-2 rounded-full border border-stone-warm bg-white px-5 py-2.5 text-sm font-medium text-bark transition-colors hover:bg-stone-warm"
                >
                  ← Start Over
                </button>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/checklist"
                    search={checklistSearchParams}
                    className="flex items-center justify-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-amber/20 transition-all hover:bg-amber-dark hover:shadow-md"
                  >
                    🎒 Packing Checklist
                  </Link>
                  <button
                    type="button"
                    onClick={handleSaveTrip}
                    className="flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-dark"
                  >
                    💾 Save This Trip
                  </button>
                </div>
              </div>

              {/* Summary card */}
              <div className="mb-6 rounded-2xl bg-gradient-to-r from-forest to-forest-light p-5 text-white shadow-md sm:p-6">
                <p className="text-sm font-medium text-white/70">Your Trip Summary</p>
                <h2 className="mt-1 text-xl font-bold leading-snug sm:text-2xl">
                  {itinerary.summary}
                </h2>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full bg-white/15 px-3 py-1">
                    {formatExperienceLevel(itinerary.experienceLevel)}
                  </span>
                  {itinerary.tripStyle && (
                    <span className="rounded-full bg-white/15 px-3 py-1">
                      {formatTripStyle(itinerary.tripStyle)}
                    </span>
                  )}
                  <span className="rounded-full bg-white/15 px-3 py-1">
                    {itinerary.totalDays} {itinerary.totalDays === 1 ? "day" : "days"}
                  </span>
                </div>
              </div>

              {/* Weather reminder */}
              <div className="mb-6 rounded-xl border border-amber/30 bg-amber/5 p-4 text-sm leading-relaxed text-bark">
                {itinerary.weatherReminder}
              </div>

              {/* Beginner tip */}
              {itinerary.beginnerTip && (
                <div className="mb-6 rounded-xl border border-forest/30 bg-forest/5 p-4 text-sm leading-relaxed text-bark">
                  {itinerary.beginnerTip}
                </div>
              )}

              {/* Day-by-day cards */}
              <div className="space-y-4">
                {itinerary.days.map((day) => (
                  <DayCard key={day.dayNumber} day={day} />
                ))}
              </div>

              {/* Bottom action buttons */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  to="/checklist"
                  search={checklistSearchParams}
                  className="flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-semibold text-white shadow-md shadow-amber/20 transition-all hover:bg-amber-dark hover:shadow-lg"
                >
                  🎒 View Packing Checklist
                </Link>
                <button
                  type="button"
                  onClick={handleStartOver}
                  className="flex items-center justify-center gap-2 rounded-full border border-stone-warm bg-white px-6 py-3 text-sm font-medium text-bark transition-colors hover:bg-stone-warm"
                >
                  ← Start Over & Plan a New Trip
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function DayCard({ day }: { day: Itinerary["days"][number] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-warm/80 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Day header */}
      <div className="border-b border-stone-warm/60 bg-stone-warm/40 px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">
            {day.dayNumber}
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-bark-light">
              Day {day.dayNumber}
            </p>
            <p className="text-base font-bold text-bark">{day.label}</p>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="divide-y divide-stone-warm/40">
        <ActivityRow emoji={day.morning.emoji} title={day.morning.title} description={day.morning.description} timeOfDay="☀️ Morning" />
        <ActivityRow emoji={day.afternoon.emoji} title={day.afternoon.title} description={day.afternoon.description} timeOfDay="🌤️ Afternoon" />
        <ActivityRow emoji={day.evening.emoji} title={day.evening.title} description={day.evening.description} timeOfDay="🌙 Evening" />
      </div>
    </div>
  );
}

function ActivityRow({
  emoji,
  title,
  description,
  timeOfDay,
}: {
  emoji: string;
  title: string;
  description: string;
  timeOfDay: string;
}) {
  return (
    <div className="flex gap-4 px-5 py-4">
      <div className="mt-0.5 flex-shrink-0 text-2xl">{emoji}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-bark-light">{timeOfDay}</p>
        <p className="mt-0.5 text-sm font-semibold text-bark">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-bark-light">{description}</p>
      </div>
    </div>
  );
}

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
