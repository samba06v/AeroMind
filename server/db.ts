import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Make database optional for demo - will use mock data if not configured
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://demo:demo@localhost:5432/demo";

export const pool = new Pool({ 
  connectionString: DATABASE_URL,
  // Don't fail if database is not available
  max: 1,
  connectionTimeoutMillis: 2000,
});

export const db = drizzle(pool, { schema });
