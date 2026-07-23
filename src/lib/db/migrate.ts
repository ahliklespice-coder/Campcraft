import { sql } from "~/db";

let schemaInitialized = false;

/**
 * Ensures the database schema is created. Safe to call multiple times —
 * uses IF NOT EXISTS on all table creation. Call before any query that
 * needs the schema.
 */
export async function ensureSchema(): Promise<void> {
  if (schemaInitialized) return;
  if (!process.env.DATABASE_URL) return;

  try {
    const db = sql();

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT,
        created_at TIMESTAMPTZ DEFAULT now(),
        premium_until TIMESTAMPTZ,
        stripe_customer_id TEXT
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        token TEXT UNIQUE NOT NULL,
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS trips (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        destination TEXT NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT NOT NULL,
        adults INTEGER DEFAULT 1,
        children INTEGER DEFAULT 0,
        experience_level TEXT,
        trip_style TEXT,
        itinerary JSONB,
        packing_checklist JSONB,
        meal_plan JSONB,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `);

    schemaInitialized = true;
  } catch (err) {
    console.error("Failed to run schema migration:", err);
  }
}
