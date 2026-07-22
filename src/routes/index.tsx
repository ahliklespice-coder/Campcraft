import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-forest-dark via-forest to-forest-light px-4 pb-20 pt-16 sm:pb-28 sm:pt-24">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-4 top-8 text-6xl sm:left-16 sm:top-12 sm:text-8xl">
            🌲
          </div>
          <div className="absolute right-6 top-16 text-5xl sm:right-20 sm:top-20 sm:text-7xl">
            ⛺
          </div>
          <div className="absolute bottom-12 left-8 text-4xl sm:bottom-16 sm:left-24 sm:text-6xl">
            🔥
          </div>
          <div className="absolute bottom-8 right-8 text-5xl sm:bottom-12 sm:right-16 sm:text-7xl">
            ⭐
          </div>
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            🌿 AI-Powered Camping Concierge
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your adventure
            <br />
            <span className="text-amber-light">starts here</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            Plan the perfect camping trip in minutes — smart itineraries,
            packing checklists, meal plans, and campsite discovery, all in one
            place.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/plan"
              className="inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-amber/30 no-underline transition-all hover:bg-amber-dark hover:shadow-xl"
            >
              Plan Your First Trip
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="#features"
              className="text-sm font-medium text-white/70 no-underline transition-colors hover:text-white"
            >
              See what CampCraft does ↓
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-cream px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-forest-dark sm:text-4xl">
              Everything you need to camp with confidence
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-bark-light">
              No experience? No problem. CampCraft guides you every step of the
              way.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="rounded-2xl border border-stone-warm/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 text-4xl">🗺️</div>
              <h3 className="mb-2 text-lg font-bold text-forest-dark">
                Smart Trip Planning
              </h3>
              <p className="text-sm leading-relaxed text-bark-light">
                Personalized itineraries built for your group size, experience
                level, and interests — in minutes, not hours.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-stone-warm/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 text-4xl">🎒</div>
              <h3 className="mb-2 text-lg font-bold text-forest-dark">
                Never Forget a Thing
              </h3>
              <p className="text-sm leading-relaxed text-bark-light">
                Adaptive packing checklists that adjust to your destination,
                weather, and activities — so you're always prepared.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-stone-warm/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 text-4xl">🏞️</div>
              <h3 className="mb-2 text-lg font-bold text-forest-dark">
                Campsite Discovery
              </h3>
              <p className="text-sm leading-relaxed text-bark-light">
                Find the perfect spot — from family-friendly campgrounds to
                secluded backcountry sites that match your vibe.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-stone-warm/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="mb-4 text-4xl">🍳</div>
              <h3 className="mb-2 text-lg font-bold text-forest-dark">
                Camp Kitchen Made Easy
              </h3>
              <p className="text-sm leading-relaxed text-bark-light">
                Meal plans that work over a campfire or camp stove — with simple
                recipes and grocery lists included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="bg-stone-warm px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-amber/15 px-4 py-1.5 text-sm font-medium text-amber-dark">
            👋 You belong here
          </span>
          <h2 className="mt-6 text-3xl font-bold text-forest-dark sm:text-4xl">
            Built for first-time campers, families, and anyone returning to the
            outdoors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-bark-light">
            We believe the outdoors should be accessible to everyone — not just
            experienced adventurers. Whether you're pitching your first tent,
            introducing your children to the outdoors, or rediscovering camping
            after years away, CampCraft replaces uncertainty with confidence and
            complexity with simplicity.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-medium text-bark-light">
            <span className="flex items-center gap-2">
              <span className="text-lg">🌲</span> Weekend campers
            </span>
            <span className="flex items-center gap-2">
              <span className="text-lg">👨‍👩‍👧‍👦</span> Families
            </span>
            <span className="flex items-center gap-2">
              <span className="text-lg">🥾</span> Solo explorers
            </span>
            <span className="flex items-center gap-2">
              <span className="text-lg">🔄</span> Returning campers
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to get outside?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Your first camping trip is a click away. No experience required —
            just bring your sense of adventure.
          </p>
          <Link
            to="/plan"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber px-8 py-3.5 text-lg font-semibold text-white shadow-lg shadow-amber/30 no-underline transition-all hover:bg-amber-dark"
          >
            Start Planning Free
            <span aria-hidden="true">🏕️</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bark px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            <span className="font-semibold text-white/80">CampCraft</span> —
            Making the outdoors accessible to everyone
          </p>
          <p>
            Built with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            using{" "}
            <a
              href="https://cto.new"
              className="underline underline-offset-2 transition-colors hover:text-white/80"
            >
              cto.new
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
