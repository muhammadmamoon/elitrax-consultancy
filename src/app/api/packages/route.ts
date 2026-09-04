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

// 1. UPDATE (PUT Function)
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    // Title se slug update karna (optional but recommended)
    const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const updatedPackage = await db.package.update({
      where: { id: body.id },
      data: {
        title: body.title,
        slug: slug,
        category: body.category,
        destination: body.destination,
        description: body.description,
        price: body.price, // Prisma Decimal support karta hai
        discount: body.discount ? body.discount : null,
        duration: body.duration,
        hotel: body.hotel,
        transport: body.transport,
        flightInfo: body.flightInfo || null,
        included: body.included,
        excluded: body.excluded,
        isFeatured: Boolean(body.isFeatured),
        isActive: Boolean(body.isActive),
      },
    });

    return NextResponse.json({ success: true, package: updatedPackage });
  } catch (error) {
    console.error("Error updating package:", error);
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      const singlePackage = await db.package.findUnique({
        where: { id },
        include: { images: true },
      });
      return NextResponse.json(singlePackage);
    }

    const packages = await db.package.findMany({
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(packages);
  } catch  {
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}
// 2. DELETE (DELETE Function)
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    // Related PackageImages cascade delete ho jayengi (schema relation ke mutabiq)
    await db.package.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting package:", error);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}