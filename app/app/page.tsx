import { redirect } from "next/navigation";
import { requireSession } from "@/lib/session";
import { db } from "@/db";
import { note } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NoteForm } from "@/components/note-form";
import { NoteList } from "@/components/note-list";
import { BookOpen } from "lucide-react";

export default async function DashboardPage() {
  let session;
  try {
    session = await requireSession();
  } catch {
    redirect("/sign-in");
  }

  const notes = await db
    .select()
    .from(note)
    .where(eq(note.userId, session.user.id))
    .orderBy(desc(note.createdAt))
    .limit(50);

  return (
    <main
      className="min-h-screen"
      style={{ background: "#08090a", color: "#f7f8f8" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{
          background: "#0f1011",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center gap-2">
          <BookOpen
            className="h-5 w-5"
            style={{ color: "#7170ff" }}
            strokeWidth={1.7}
          />
          <span
            style={{
              fontWeight: 590,
              fontSize: "15px",
              letterSpacing: "-0.165px",
              color: "#f7f8f8",
              fontFeatureSettings: "'cv01', 'ss03'",
            }}
          >
            NoteKeeper
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            style={{
              fontSize: "13px",
              color: "#8a8f98",
              fontFeatureSettings: "'cv01', 'ss03'",
            }}
          >
            {session.user.email}
          </span>
          <form action="/api/auth/sign-out" method="POST">
            <button
              type="submit"
              style={{
                fontSize: "13px",
                color: "#8a8f98",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFeatureSettings: "'cv01', 'ss03'",
              }}
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        {/* Summary card */}
        <div
          className="rounded-xl p-6 mb-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: 510,
              color: "#62666d",
              letterSpacing: "-0.13px",
              textTransform: "uppercase",
              fontFeatureSettings: "'cv01', 'ss03'",
              marginBottom: "4px",
            }}
          >
            Total notes
          </p>
          <p
            style={{
              fontSize: "32px",
              fontWeight: 510,
              letterSpacing: "-0.704px",
              color: "#f7f8f8",
              fontFeatureSettings: "'cv01', 'ss03'",
            }}
          >
            {notes.length}
          </p>
        </div>

        {/* Add note form */}
        <NoteForm />

        {/* Notes list */}
        <NoteList notes={notes} />
      </div>
    </main>
  );
}
