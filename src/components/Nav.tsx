"use client";

import { Link } from "@tanstack/react-router";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/plan", label: "Plan a Trip" },
  { to: "/guides", label: "Guides" },
  { to: "/about", label: "About" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="hidden items-center gap-6 md:flex">
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
          <Link
            to="/plan"
            className="rounded-full bg-amber px-5 py-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-amber-dark"
          >
            Get Started
          </Link>
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
            <Link
              to="/plan"
              className="mt-2 rounded-full bg-amber px-5 py-2.5 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-amber-dark"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
