import { NextResponse } from "next/server";
import { db } from "../../lib/db";

// Helper function to create URL slug from Name
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// 1. READ (GET ALL)
export async function GET() {
  try {
    const countries = await db.country.findMany({
      include: {
        _count: {
          select: {
            visaServices: true,
            faqs: true,
          },
        },
      },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });
    return NextResponse.json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return NextResponse.json({ error: "Failed to fetch countries" }, { status: 500 });
  }
}

// 2. CREATE (POST)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, code, flagUrl, heroImageUrl, overview, order, isActive } = body;

    if (!name || !code || !flagUrl || !heroImageUrl || !overview) {
      return NextResponse.json(
        { error: "Name, Code, Flag URL, Hero Image URL, and Overview are required." },
        { status: 400 }
      );
    }

    const generatedSlug = slugify(name);

    // Duplicate check for slug/code
    const existing = await db.country.findFirst({
      where: {
        OR: [{ code: code.toUpperCase() }, { slug: generatedSlug }],
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A country with this code or name already exists." },
        { status: 400 }
      );
    }

    const country = await db.country.create({
      data: {
        name,
        slug: generatedSlug,
        code: code.toUpperCase(),
        flagUrl,
        heroImageUrl,
        overview,
        order: Number(order) || 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return NextResponse.json({ success: true, country }, { status: 201 });
  } catch (error) {
    console.error("Error creating country:", error);
    return NextResponse.json({ error: "Failed to create country" }, { status: 500 });
  }
}

// 3. UPDATE (PUT)
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, code, flagUrl, heroImageUrl, overview, order, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: "Country ID is required." }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) {
      updateData.name = name;
      updateData.slug = slugify(name);
    }
    if (code !== undefined) updateData.code = code.toUpperCase();
    if (flagUrl !== undefined) updateData.flagUrl = flagUrl;
    if (heroImageUrl !== undefined) updateData.heroImageUrl = heroImageUrl;
    if (overview !== undefined) updateData.overview = overview;
    if (order !== undefined) updateData.order = Number(order);
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    const updated = await db.country.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, country: updated });
  } catch (error) {
    console.error("Error updating country:", error);
    return NextResponse.json({ error: "Failed to update country" }, { status: 500 });
  }
}

// 4. DELETE
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Country ID is required" }, { status: 400 });
    }

    await db.country.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting country:", error);
    return NextResponse.json({ error: "Failed to delete country" }, { status: 500 });
  }
}