import { NextResponse } from "next/server";
import { db } from "../../lib/db";

// 1. GET (Single ya All Visa Services)
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      const service = await db.visaService.findUnique({
        where: { id },
        include: { country: true },
      });

      if (!service) {
        return NextResponse.json({ error: "Visa service not found" }, { status: 404 });
      }

      return NextResponse.json(service);
    }

    const services = await db.visaService.findMany({
      include: {
        country: {
          select: {
            id: true,
            name: true,
            code: true,
            flagUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching visa services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// 2. POST (Create New Visa Service)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, description, requirements, processSteps, countryId } = body;

    // Required fields check
    if (!title || !category || !description || !countryId) {
      return NextResponse.json(
        { error: "Title, Category, Description, and Destination Country are required." },
        { status: 400 }
      );
    }

    // Verify if countryId actually exists in Country table
    const countryExists = await db.country.findUnique({
      where: { id: countryId },
    });

    if (!countryExists) {
      return NextResponse.json(
        { error: "Invalid Country selected. Please choose a valid country." },
        { status: 400 }
      );
    }

    // Ensure requirements & processSteps are valid Arrays/JSON
    const formattedRequirements = Array.isArray(requirements)
      ? requirements
      : typeof requirements === "string"
      ? requirements.split("\n").map((r: string) => r.trim()).filter(Boolean)
      : [];

    const formattedProcessSteps = Array.isArray(processSteps)
      ? processSteps
      : typeof processSteps === "string"
      ? processSteps.split("\n").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const newVisaService = await db.visaService.create({
      data: {
        title: String(title),
        category: category,
        description: String(description),
        requirements: formattedRequirements,
        processSteps: formattedProcessSteps,
        countryId: String(countryId),
      },
      include: { country: true },
    });

    return NextResponse.json({ success: true, service: newVisaService }, { status: 201 });
  } catch (error) {
    console.error("Error creating visa service:", error);
    return NextResponse.json(
      { error: "Failed to save visa service. Check category enum and relation." },
      { status: 500 }
    );
  }
}

// 3. PUT (Update Existing Visa Service)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, category, description, requirements, processSteps, countryId } = body;

    if (!id) {
      return NextResponse.json({ error: "Service ID is required for update" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = String(title);
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = String(description);
    if (countryId !== undefined) updateData.countryId = String(countryId);

    if (requirements !== undefined) {
      updateData.requirements = Array.isArray(requirements)
        ? requirements
        : typeof requirements === "string"
        ? requirements.split("\n").map((r: string) => r.trim()).filter(Boolean)
        : [];
    }

    if (processSteps !== undefined) {
      updateData.processSteps = Array.isArray(processSteps)
        ? processSteps
        : typeof processSteps === "string"
        ? processSteps.split("\n").map((s: string) => s.trim()).filter(Boolean)
        : [];
    }

    const updatedVisaService = await db.visaService.update({
      where: { id },
      data: updateData,
      include: { country: true },
    });

    return NextResponse.json({ success: true, service: updatedVisaService });
  } catch (error) {
    console.error("Error updating visa service:", error);
    return NextResponse.json({ error: "Failed to update visa service" }, { status: 500 });
  }
}

// 4. DELETE (Remove Visa Service)
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Service ID is required for deletion" }, { status: 400 });
    }

    await db.visaService.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting visa service:", error);
    return NextResponse.json({ error: "Failed to delete visa service" }, { status: 500 });
  }
}