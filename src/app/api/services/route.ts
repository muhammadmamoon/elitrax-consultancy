import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Prisma mein db.visaService use karenge
    const newVisaService = await db.visaService.create({
      data: {
        title: body.title,
        category: body.category, // Aapke ServiceCategory Enum se match hona chahiye
        description: body.description,
        requirements: body.requirements, // Yeh frontend se JSON Array ban kar aayega
        processSteps: body.processSteps, // Yeh frontend se JSON Array ban kar aayega
        countryId: body.countryId, // Country table ka Valid ID
      }
    });

    return NextResponse.json({ success: true, service: newVisaService });
  } catch (error) {
    console.error("Error saving Visa Service:", error);
    return NextResponse.json({ error: "Failed to save Visa Service. Ensure countryId is valid." }, { status: 500 });
  }
}