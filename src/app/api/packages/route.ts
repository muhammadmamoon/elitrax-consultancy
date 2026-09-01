import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newPackage = await db.package.create({
      data: {
        title: body.title,
        slug: slug,
        destination: body.destination,
        price: parseFloat(body.price) || 0,
        duration: body.duration,
        description: body.description,
        category: body.category || "UMRAH",
        isFeatured: false,
        // Yahan missing required fields add kar diye gaye hain
        hotel: body.hotel || "Standard Hotel",
        transport: body.transport || "Standard Transport",
        flightInfo: body.flightInfo || "Not included",
        included: body.included || "Visa, Accommodation, Transport",
        excluded: body.excluded || "Personal expenses, Meals",
      }
    });

    return NextResponse.json({ success: true, package: newPackage });
  } catch (error) {
    console.error("Error saving package:", error);
    return NextResponse.json({ error: "Failed to save package" }, { status: 500 });
  }
}