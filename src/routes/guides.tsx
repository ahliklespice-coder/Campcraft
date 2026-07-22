import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/guides")({
  component: Guides,
});

function Guides() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="text-5xl">📖</span>
      <h1 className="text-3xl font-bold text-forest-dark sm:text-4xl">
        Camping Guides
      </h1>
      <p className="max-w-md text-lg text-bark-light">
        Step-by-step guides for beginners are on the way! From pitching your
        first tent to campfire cooking, we've got you covered.
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
