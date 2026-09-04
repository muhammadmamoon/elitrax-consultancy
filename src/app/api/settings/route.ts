import { NextResponse } from "next/server";
import { db } from "../../lib/db";

// Setting model ka explicit type structure
interface SettingRecord {
  id: string;
  key: string;
  value: string;
  updatedAt: Date;
}

// Type-safe dynamic accessor (ESLint no-explicit-any bypass)
interface DbWithSettings {
  setting: {
    findMany: () => Promise<SettingRecord[]>;
    upsert: (args: {
      where: { key: string };
      update: { value: string };
      create: { key: string; value: string };
    }) => Promise<SettingRecord>;
  };
  $transaction: (operations: Promise<unknown>[]) => Promise<unknown[]>;
}

export async function GET() {
  try {
    const client = db as unknown as DbWithSettings;
    const settings = await client.setting.findMany();

    const settingsMap = settings.reduce<Record<string, string>>((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    return NextResponse.json(settingsMap);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, string>;
    const client = db as unknown as DbWithSettings;

    const updates = Object.entries(body).map(([key, value]) =>
      client.setting.upsert({
        where: { key },
        update: { value: String(value ?? "") },
        create: { key, value: String(value ?? "") },
      })
    );

    await client.$transaction(updates);

    return NextResponse.json({ success: true, message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}