import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise, { client } from "@/lib/db/mongodb-client";

// const client = await clientPromise; // This was blocking build
const db = client.db();  // Default database or specify name
const db = client.db();  // Default database or specify name

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  // Enable email/password authentication
  emailAndPassword: { enabled: true },
});
