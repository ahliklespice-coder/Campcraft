import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plan")({
  component: Plan,
});

function Plan() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="text-5xl">🏕️</span>
      <h1 className="text-3xl font-bold text-forest-dark sm:text-4xl">
        Plan a Trip
      </h1>
      <p className="max-w-md text-lg text-bark-light">
        Our AI trip planner is coming soon! Soon you'll be able to create
        personalized camping itineraries in minutes.
      </p>
      <Link
        to="/"
        className="mt-4 rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white no-underline transition-colors hover:bg-forest-dark"
      >
        ← Back home
      </Link>
    </main>
  );
}
