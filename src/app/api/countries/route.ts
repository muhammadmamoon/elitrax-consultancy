import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Country name se slug generate karna
    const slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Aapke schema ke mutabiq data map kar rahe hain
    const newCountry = await db.country.create({
      data: {
        name: body.name,
        slug: slug,
        code: body.code.toUpperCase(), // (e.g., "KSA", "USA")
        flagUrl: body.flagUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/1280px-Flag_of_the_United_Arab_Emirates.svg.png",
        heroImageUrl: body.heroImageUrl || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
        overview: body.overview,
        isActive: true,
        order: parseInt(body.order) || 0,
      }
    });

    return NextResponse.json({ success: true, country: newCountry });
  } catch (error) {
    console.error("Error saving country:", error);
    return NextResponse.json({ error: "Failed to save country" }, { status: 500 });
  }
}