import mongoose from "mongoose";
import AdminUser from "../lib/models/AdminUser";
import dotenv from "dotenv";
import path from "path";

// Load .env.local explicitly
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

console.log("MONGODB_URI:", process.env.MONGODB_URI);


async function seedAdmin() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);

  const existing = await AdminUser.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    console.log("Admin already exists");
    process.exit(0);
  }

  const admin = new AdminUser({
    name: "Super Admin",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "super_admin",
  });

  await admin.save();
  console.log("Admin user created successfully!");
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("Error seeding admin:", err);
  process.exit(1);
});
