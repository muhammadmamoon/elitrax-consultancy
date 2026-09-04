import { NextResponse } from "next/server";
import { db } from "../../lib/db";

// 1. Fetch Inquiries
export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

// 2. Update Status (PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    const updated = await db.inquiry.update({
      where: { id },
      data: {
        status: status, // Enum value update hogi
      },
    });

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

// 3. Delete Inquiry (DELETE)
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID is required" }, { status: 400 });
    }

    await db.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}