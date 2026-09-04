import { NextResponse } from "next/server";
import { db } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      country,
      service,
      travelType,
      travelDate,
      message,
    } = body;

    // Required fields validation
    if (!fullName || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Full Name, Email, Phone, and Message are required." },
        { status: 400 }
      );
    }

    // Schema ke exact types ke sath create call
    const inquiry = await db.inquiry.create({
      data: {
        fullName: String(fullName),
        email: String(email),
        phone: String(phone),
        country: country || "General Inquiry",
        service: service || "Consultation",
        travelType: travelType || "Standard",
        travelDate: travelDate ? new Date(travelDate) : null,
        message: String(message),
        // status bhejne ki zaroorat nahi, default @default(NEW) auto-apply hoga
      },
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again." },
      { status: 500 }
    );
  }
}