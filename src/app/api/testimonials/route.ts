import { NextResponse } from "next/server";
import { db } from "../../lib/db";

// 1. GET ALL
export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

// 2. CREATE NEW
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientName, country, serviceUsed, comment, rating, videoUrl, isApproved, order } = body;

    if (!clientName || !country || !serviceUsed || !comment) {
      return NextResponse.json(
        { error: "Client Name, Country, Service, and Comment are required." },
        { status: 400 }
      );
    }

    const testimonial = await db.testimonial.create({
      data: {
        clientName: String(clientName),
        country: String(country),
        serviceUsed: String(serviceUsed),
        comment: String(comment),
        rating: Number(rating) || 5,
        videoUrl: videoUrl || null,
        isApproved: Boolean(isApproved ?? true),
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

// 3. UPDATE (PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, clientName, country, serviceUsed, comment, rating, videoUrl, isApproved, order } = body;

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (clientName !== undefined) updateData.clientName = String(clientName);
    if (country !== undefined) updateData.country = String(country);
    if (serviceUsed !== undefined) updateData.serviceUsed = String(serviceUsed);
    if (comment !== undefined) updateData.comment = String(comment);
    if (rating !== undefined) updateData.rating = Number(rating);
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl || null;
    if (isApproved !== undefined) updateData.isApproved = Boolean(isApproved);
    if (order !== undefined) updateData.order = Number(order);

    const updated = await db.testimonial.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, testimonial: updated });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

// 4. DELETE
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }

    await db.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}