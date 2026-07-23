import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie, deleteCookie } from "@tanstack/start-server-core";
import bcrypt from "bcryptjs";
import { sql } from "~/db";
import { ensureSchema } from "~/lib/db/migrate";

// ── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  premium_until: string | null;
  stripe_customer_id: string | null;
}

export interface TripData {
  id?: string;          // present for updates
  destination: string;
  startDate: string;
  endDate: string;
  adults?: number;
  children?: number;
  experienceLevel?: string;
  tripStyle?: string;
  itinerary?: unknown;
  packingChecklist?: unknown;
  mealPlan?: unknown;
}

export interface Trip {
  id: string;
  user_id: string;
  destination: string;
  start_date: string;
  end_date: string;
  adults: number;
  children: number;
  experience_level: string | null;
  trip_style: string | null;
  itinerary: unknown;
  packing_checklist: unknown;
  meal_plan: unknown;
  created_at: string;
  updated_at: string;
}

const SESSION_COOKIE = "campcraft_session";
const SESSION_DAYS = 30;
const MAX_FREE_TRIPS = 3;

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseSessionCookie(): string | null {
  return getCookie(SESSION_COOKIE) ?? null;
}

async function getUserByToken(token: string): Promise<User | null> {
  await ensureSchema();
  const db = sql();
  const rows = await db`
    SELECT u.id, u.email, u.name, u.created_at, u.premium_until, u.stripe_customer_id
    FROM users u
    JOIN sessions s ON s.user_id = u.id
    WHERE s.token = ${token} AND s.expires_at > now()
  `;
  if (rows.length === 0) return null;
  const r = rows[0];
  return {
    id: String(r.id),
    email: String(r.email),
    name: r.name ? String(r.name) : null,
    created_at: String(r.created_at),
    premium_until: r.premium_until ? String(r.premium_until) : null,
    stripe_customer_id: r.stripe_customer_id ? String(r.stripe_customer_id) : null,
  };
}

function isUserPremium(user: User): boolean {
  if (!user.premium_until) return false;
  return new Date(user.premium_until) > new Date();
}

async function createSession(userId: string): Promise<string> {
  const token = crypto.randomUUID();
  const db = sql();
  await db`
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES (${userId}, ${token}, now() + interval '${SESSION_DAYS} days')
  `;
  setCookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
  return token;
}

// ── Auth Server Functions ────────────────────────────────────────────────────

export const signup = createServerFn({ method: "POST" })
  .handler(async ({ data }) => {
    await ensureSchema();

    const { email, password, name } = data as {
      email: string;
      password: string;
      name?: string;
    };

    // Validate
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    const db = sql();

    // Check existing user
    const existing = await db`SELECT id FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      throw new Error("An account with this email already exists");
    }

    // Hash password and create user
    const passwordHash = await bcrypt.hash(password, 12);
    const rows = await db`
      INSERT INTO users (email, password_hash, name)
      VALUES (${email}, ${passwordHash}, ${name ?? null})
      RETURNING id, email, name, created_at, premium_until, stripe_customer_id
    `;
    const user = rows[0];

    await createSession(String(user.id));

    return {
      id: String(user.id),
      email: String(user.email),
      name: user.name ? String(user.name) : null,
      created_at: String(user.created_at),
      premium_until: user.premium_until ? String(user.premium_until) : null,
      stripe_customer_id: user.stripe_customer_id ? String(user.stripe_customer_id) : null,
    };
  });

export const login = createServerFn({ method: "POST" })
  .handler(async ({ data }) => {
    await ensureSchema();

    const { email, password } = data as { email: string; password: string };

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const db = sql();
    const rows = await db`
      SELECT id, email, name, password_hash, created_at, premium_until, stripe_customer_id
      FROM users
      WHERE email = ${email}
    `;

    if (rows.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, String(user.password_hash));
    if (!valid) {
      throw new Error("Invalid email or password");
    }

    await createSession(String(user.id));

    return {
      id: String(user.id),
      email: String(user.email),
      name: user.name ? String(user.name) : null,
      created_at: String(user.created_at),
      premium_until: user.premium_until ? String(user.premium_until) : null,
      stripe_customer_id: user.stripe_customer_id ? String(user.stripe_customer_id) : null,
    };
  });

export const logout = createServerFn({ method: "POST" })
  .handler(async () => {
    await ensureSchema();
    const token = parseSessionCookie();
    if (token) {
      const db = sql();
      await db`DELETE FROM sessions WHERE token = ${token}`;
    }
    deleteCookie(SESSION_COOKIE, { path: "/" });
    return { success: true };
  });

export const getCurrentUser = createServerFn({ method: "GET" })
  .handler(async () => {
    await ensureSchema();
    const token = parseSessionCookie();
    if (!token) return null;
    return getUserByToken(token);
  });

export const updateProfile = createServerFn({ method: "POST" })
  .handler(async ({ data }) => {
    await ensureSchema();
    const token = parseSessionCookie();
    if (!token) throw new Error("Not authenticated");

    const user = await getUserByToken(token);
    if (!user) throw new Error("Not authenticated");

    const { name, email } = data as { name?: string; email?: string };

    const db = sql();
    if (email && email !== user.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) throw new Error("Invalid email format");

      const existing = await db`SELECT id FROM users WHERE email = ${email} AND id != ${user.id}`;
      if (existing.length > 0) throw new Error("Email already in use");

      await db`UPDATE users SET email = ${email} WHERE id = ${user.id}`;
    }

    if (name !== undefined) {
      await db`UPDATE users SET name = ${name || null} WHERE id = ${user.id}`;
    }

    return getUserByToken(token);
  });

export const changePassword = createServerFn({ method: "POST" })
  .handler(async ({ data }) => {
    await ensureSchema();
    const token = parseSessionCookie();
    if (!token) throw new Error("Not authenticated");

    const user = await getUserByToken(token);
    if (!user) throw new Error("Not authenticated");

    const { oldPassword, newPassword } = data as {
      oldPassword: string;
      newPassword: string;
    };

    if (!oldPassword || !newPassword) {
      throw new Error("Both old and new passwords are required");
    }
    if (newPassword.length < 8) {
      throw new Error("New password must be at least 8 characters");
    }

    const db = sql();
    const rows = await db`SELECT password_hash FROM users WHERE id = ${user.id}`;
    const valid = await bcrypt.compare(oldPassword, String(rows[0].password_hash));
    if (!valid) throw new Error("Current password is incorrect");

    const newHash = await bcrypt.hash(newPassword, 12);
    await db`UPDATE users SET password_hash = ${newHash} WHERE id = ${user.id}`;

    return { success: true };
  });

// ── Trip Server Functions ────────────────────────────────────────────────────

export const saveTrip = createServerFn({ method: "POST" })
  .handler(async ({ data }) => {
    await ensureSchema();
    const token = parseSessionCookie();
    if (!token) throw new Error("Not authenticated");

    const user = await getUserByToken(token);
    if (!user) throw new Error("Not authenticated");

    const trip = data as TripData;

    const db = sql();

    if (trip.id) {
      // Update existing
      await db`
        UPDATE trips SET
          destination = ${trip.destination},
          start_date = ${trip.startDate},
          end_date = ${trip.endDate},
          adults = ${trip.adults ?? 1},
          children = ${trip.children ?? 0},
          experience_level = ${trip.experienceLevel ?? null},
          trip_style = ${trip.tripStyle ?? null},
          itinerary = ${trip.itinerary ? JSON.stringify(trip.itinerary) : null}::jsonb,
          packing_checklist = ${trip.packingChecklist ? JSON.stringify(trip.packingChecklist) : null}::jsonb,
          meal_plan = ${trip.mealPlan ? JSON.stringify(trip.mealPlan) : null}::jsonb,
          updated_at = now()
        WHERE id = ${trip.id} AND user_id = ${user.id}
      `;
      return { id: trip.id };
    } else {
      const rows = await db`
        INSERT INTO trips (
          user_id, destination, start_date, end_date,
          adults, children, experience_level, trip_style,
          itinerary, packing_checklist, meal_plan
        ) VALUES (
          ${user.id}, ${trip.destination}, ${trip.startDate}, ${trip.endDate},
          ${trip.adults ?? 1}, ${trip.children ?? 0},
          ${trip.experienceLevel ?? null}, ${trip.tripStyle ?? null},
          ${trip.itinerary ? JSON.stringify(trip.itinerary) : null}::jsonb,
          ${trip.packingChecklist ? JSON.stringify(trip.packingChecklist) : null}::jsonb,
          ${trip.mealPlan ? JSON.stringify(trip.mealPlan) : null}::jsonb
        )
        RETURNING id
      `;
      return { id: String(rows[0].id) };
    }
  });

export const getTrips = createServerFn({ method: "GET" })
  .handler(async () => {
    await ensureSchema();
    const token = parseSessionCookie();
    if (!token) throw new Error("Not authenticated");

    const user = await getUserByToken(token);
    if (!user) throw new Error("Not authenticated");

    const db = sql();
    const rows = await db`
      SELECT * FROM trips
      WHERE user_id = ${user.id}
      ORDER BY created_at DESC
    `;

    return rows.map((r) => ({
      id: String(r.id),
      user_id: String(r.user_id),
      destination: String(r.destination),
      start_date: String(r.start_date),
      end_date: String(r.end_date),
      adults: Number(r.adults),
      children: Number(r.children),
      experience_level: r.experience_level ? String(r.experience_level) : null,
      trip_style: r.trip_style ? String(r.trip_style) : null,
      itinerary: r.itinerary,
      packing_checklist: r.packing_checklist,
      meal_plan: r.meal_plan,
      created_at: String(r.created_at),
      updated_at: String(r.updated_at),
    }));
  });

export const getTrip = createServerFn({ method: "GET" })
  .handler(async ({ data }) => {
    await ensureSchema();
    const token = parseSessionCookie();
    if (!token) throw new Error("Not authenticated");

    const user = await getUserByToken(token);
    if (!user) throw new Error("Not authenticated");

    const { tripId } = data as { tripId: string };

    const db = sql();
    const rows = await db`
      SELECT * FROM trips
      WHERE id = ${tripId} AND user_id = ${user.id}
    `;

    if (rows.length === 0) throw new Error("Trip not found");

    const r = rows[0];
    return {
      id: String(r.id),
      user_id: String(r.user_id),
      destination: String(r.destination),
      start_date: String(r.start_date),
      end_date: String(r.end_date),
      adults: Number(r.adults),
      children: Number(r.children),
      experience_level: r.experience_level ? String(r.experience_level) : null,
      trip_style: r.trip_style ? String(r.trip_style) : null,
      itinerary: r.itinerary,
      packing_checklist: r.packing_checklist,
      meal_plan: r.meal_plan,
      created_at: String(r.created_at),
      updated_at: String(r.updated_at),
    };
  });

export const deleteTrip = createServerFn({ method: "POST" })
  .handler(async ({ data }) => {
    await ensureSchema();
    const token = parseSessionCookie();
    if (!token) throw new Error("Not authenticated");

    const user = await getUserByToken(token);
    if (!user) throw new Error("Not authenticated");

    const { tripId } = data as { tripId: string };

    const db = sql();
    await db`DELETE FROM trips WHERE id = ${tripId} AND user_id = ${user.id}`;
    return { success: true };
  });

// ── Premium helpers ──────────────────────────────────────────────────────────

export const getTripCount = createServerFn({ method: "GET" })
  .handler(async () => {
    await ensureSchema();
    const token = parseSessionCookie();
    if (!token) return 0;

    const user = await getUserByToken(token);
    if (!user) return 0;

    const db = sql();
    const rows = await db`SELECT count(*) as count FROM trips WHERE user_id = ${user.id}`;
    return Number(rows[0].count);
  });

export const checkPremium = createServerFn({ method: "GET" })
  .handler(async () => {
    await ensureSchema();
    const token = parseSessionCookie();
    if (!token) return { isPremium: false, tripsRemaining: MAX_FREE_TRIPS };

    const user = await getUserByToken(token);
    if (!user) return { isPremium: false, tripsRemaining: MAX_FREE_TRIPS };

    const premium = isUserPremium(user);
    if (premium) return { isPremium: true, tripsRemaining: Infinity };

    const db = sql();
    const rows = await db`SELECT count(*) as count FROM trips WHERE user_id = ${user.id}`;
    const count = Number(rows[0].count);
    return {
      isPremium: false,
      tripsRemaining: Math.max(0, MAX_FREE_TRIPS - count),
    };
  });

// Export for use in other modules
export { isUserPremium, MAX_FREE_TRIPS };
