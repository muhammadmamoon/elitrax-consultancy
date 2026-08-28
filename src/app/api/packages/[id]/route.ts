// src/app/api/packages/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// API Route for CRUD actions on Packages (Protected via middleware)
export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Simple slug generator
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newPackage = await db.package.create({
      data: {
        title: data.title,
        slug,
        category: data.category,
        destination: data.destination,
        description: data.description,
        price: data.price,
        discount: data.discount || null,
        duration: data.duration,
        hotel: data.hotel,
        transport: data.transport,
        flightInfo: data.flightInfo,
        included: data.included,
        excluded: data.excluded,
        isActive: data.isActive ?? true,
        isFeatured: data.isFeatured ?? false,
      }
    });

    return NextResponse.json({ success: true, package: newPackage }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create package. Ensure title is unique." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const packages = await db.package.findMany({
      include: { images: true }
    });
    return NextResponse.json(packages);
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve packages" }, { status: 500 });
  }
}