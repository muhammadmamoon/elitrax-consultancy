import { NextResponse } from "next/server";
import { db } from "../../lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    // Check karte hain ke kya pehle se koi admin mojood hai?
    const existingAdmin = await db.adminUser.findFirst();
    
    if (existingAdmin) {
      return NextResponse.json({ message: "Admin account already exists!" });
    }

    // Password ko secure (hash) kar rahe hain
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // Database mein naya admin bana rahe hain
    await db.adminUser.create({
      data: {
        name: "Super Admin",
        email: "admin@elitrax.com",
        password: hashedPassword,
        role: "SUPER_ADMIN",
      }
    });

    return NextResponse.json({ 
      message: "Success! Admin account created.",
      email: "admin@elitrax.com",
      password: "Admin@123"
    });

  } catch (error) {
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}