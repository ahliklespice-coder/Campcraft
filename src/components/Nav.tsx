"use client";

import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "~/lib/auth-context";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/plan", label: "Plan a Trip" },
  { to: "/discover", label: "Discover" },
  { to: "/checklist", label: "Packing List" },
  { to: "/meals", label: "Meal Planner" },
  { to: "/guides", label: "Guides" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, isPremium, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-stone-warm/80 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-forest no-underline"
        >
          <span aria-hidden="true">🏕️</span>
          <span>CampCraft</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-bark-light no-underline transition-colors hover:text-forest"
              activeProps={{ className: "text-forest font-semibold" }}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth actions */}
          {isLoading ? null : isAuthenticated ? (
            <>
              {isPremium ? (
                <span className="rounded-full bg-gradient-to-r from-amber to-amber-light px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
                  ✨ Premium
                </span>
              ) : (
                <a
                  href="/pricing"
                  className="rounded-full border border-amber/50 bg-gradient-to-r from-amber to-amber-light px-4 py-1.5 text-sm font-semibold text-white no-underline shadow-sm transition-all hover:from-amber-dark hover:to-amber hover:shadow-md"
                >
                  ✨ Upgrade
                </a>
              )}
              <Link
                to="/account"
                className="text-sm font-medium text-bark-light no-underline transition-colors hover:text-forest"
                activeProps={{ className: "text-forest font-semibold" }}
              >
                {user?.name ?? "Account"}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-bark-light transition-colors hover:text-red-600"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-bark-light no-underline transition-colors hover:text-forest"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-amber px-5 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-amber-dark"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex items-center rounded-lg p-2 text-bark-light md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-stone-warm/60 bg-cream px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-bark-light no-underline transition-colors hover:bg-stone-warm hover:text-forest"
                activeProps={{ className: "bg-stone-warm text-forest font-semibold" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Divider */}
            <div className="my-1 border-t border-stone-warm/60" />

            {/* Mobile auth */}
            {isLoading ? null : isAuthenticated ? (
              <>
                {isPremium ? (
                  <span className="rounded-full bg-gradient-to-r from-amber to-amber-light px-4 py-2 text-center text-sm font-semibold text-white shadow-sm">
                    ✨ Premium Member
                  </span>
                ) : (
                  <a
                    href="/pricing"
                    className="rounded-full bg-gradient-to-r from-amber to-amber-light px-5 py-2.5 text-center text-sm font-semibold text-white no-underline shadow-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    ✨ Upgrade to Premium
                  </a>
                )}
                <Link
                  to="/account"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-bark-light no-underline transition-colors hover:bg-stone-warm hover:text-forest"
                  activeProps={{ className: "bg-stone-warm text-forest font-semibold" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {user?.name ?? "My Account"}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  🚪 Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-bark-light no-underline transition-colors hover:bg-stone-warm hover:text-forest"
                  onClick={() => setMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-amber px-5 py-2.5 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-amber-dark"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
