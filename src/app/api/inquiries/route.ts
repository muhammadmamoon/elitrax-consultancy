// src/app/api/inquiries/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, country, service, travelType, travelDate, message } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const inquiry = await db.inquiry.create({
      data: {
        fullName,
        email,
        phone,
        country: country || "Unspecified",
        service: service || "General Visa Assistance",
        travelType: travelType || "Individual",
        travelDate: travelDate ? new Date(travelDate) : null,
        message: message || "",
      },
    });

    return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to persist inquiry" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve records" }, { status: 500 });
  }
}