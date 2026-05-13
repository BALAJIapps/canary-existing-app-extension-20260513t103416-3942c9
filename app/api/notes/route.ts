import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/db";
import { note } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

const CreateNoteSchema = z.object({
  customerName: z.string().min(1).max(200),
  content: z.string().min(1).max(5000),
});

export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } },
      { status: 401 }
    );
  }
  try {
    const notes = await db
      .select()
      .from(note)
      .where(eq(note.userId, session.user.id))
      .orderBy(desc(note.createdAt))
      .limit(100);
    return NextResponse.json({ ok: true, data: notes });
  } catch (err) {
    console.error(JSON.stringify({ level: "error", msg: "GET /api/notes failed", error: String(err) }));
    return NextResponse.json(
      { ok: false, error: { code: "DB_ERROR", message: "Failed to fetch notes" } },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { ok: false, error: { code: "UNAUTHORIZED", message: "Not authenticated" } },
      { status: 401 }
    );
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "BAD_REQUEST", message: "Invalid JSON" } },
      { status: 400 }
    );
  }
  const parsed = CreateNoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: { code: "VALIDATION", message: parsed.error.message } },
      { status: 400 }
    );
  }
  try {
    const [created] = await db
      .insert(note)
      .values({
        userId: session.user.id,
        customerName: parsed.data.customerName,
        content: parsed.data.content,
      })
      .returning();
    if (!created) {
      return NextResponse.json(
        { ok: false, error: { code: "DB_ERROR", message: "Insert did not return a row" } },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, data: created }, { status: 201 });
  } catch (err) {
    console.error(JSON.stringify({ level: "error", msg: "POST /api/notes failed", error: String(err) }));
    return NextResponse.json(
      { ok: false, error: { code: "DB_ERROR", message: "Failed to create note" } },
      { status: 500 }
    );
  }
}
