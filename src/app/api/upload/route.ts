// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No media file transmitted" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Enforce 15MB maximum file limit
    if (buffer.length > 15 * 1024 * 1024) {
      return NextResponse.json({ error: "File payload exceeds 15MB limit" }, { status: 400 });
    }

    const cleanFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "images");

    await mkdir(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, cleanFilename);
    await writeFile(filepath, buffer);

    const publicUrl = `/uploads/images/${cleanFilename}`;

    const media = await db.media.create({
      data: {
        filename: cleanFilename,
        url: publicUrl,
        mimeType: file.type,
        size: buffer.length,
      },
    });

    return NextResponse.json({ success: true, media });
  } catch (error) {
    return NextResponse.json({ error: "Local file persistence failed" }, { status: 500 });
  }
}