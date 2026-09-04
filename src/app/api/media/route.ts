import { NextResponse } from "next/server";
import { writeFile, readdir, unlink, stat } from "fs/promises";
import path from "path";
import { existsSync, mkdirSync } from "fs";

// 1. GET ALL MEDIA ASSETS (public/uploads folder scan)
export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
      return NextResponse.json([]);
    }

    const fileNames = await readdir(uploadDir);

    const mediaList = await Promise.all(
      fileNames
        .filter((file) => !file.startsWith(".")) // Hidden files ignore
        .map(async (fileName) => {
          const filePath = path.join(uploadDir, fileName);
          const fileStat = await stat(filePath);

          return {
            id: fileName,
            name: fileName,
            url: `/uploads/${fileName}`,
            size: (fileStat.size / (1024 * 1024)).toFixed(2) + " MB",
            createdAt: fileStat.birthtime.toISOString(),
          };
        })
    );

    // Latest files first
    mediaList.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(mediaList);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json({ error: "Failed to read media library" }, { status: 500 });
  }
}

// 2. UPLOAD NEW IMAGE (POST)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Buffer mein convert karein
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    // Unique safe filename
    const extension = path.extname(file.name) || ".jpg";
    const baseName = path
      .basename(file.name, extension)
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    const uniqueFileName = `${baseName}-${Date.now()}${extension}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json(
      {
        success: true,
        file: {
          id: uniqueFileName,
          name: uniqueFileName,
          url: publicUrl,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}

// 3. DELETE ASSET
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const fileName = url.searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json({ error: "File name is required" }, { status: 400 });
    }

    // Directory traversal security check
    const safeName = path.basename(fileName);
    const filePath = path.join(process.cwd(), "public", "uploads", safeName);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}