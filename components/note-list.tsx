"use client";
import type { Note } from "@/db/schema";
import { FileText } from "lucide-react";

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function NoteList({ notes }: { notes: Note[] }) {
  if (notes.length === 0) {
    return (
      <div
        className="rounded-xl p-10 flex flex-col items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.01)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <FileText
          className="h-8 w-8 mb-3"
          style={{ color: "#62666d" }}
          strokeWidth={1.5}
        />
        <p
          style={{
            fontSize: "14px",
            color: "#62666d",
            fontFeatureSettings: "'cv01', 'ss03'",
          }}
        >
          No notes yet. Add your first one above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notes.map((n) => (
        <div
          key={n.id}
          className="rounded-xl p-5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              style={{
                fontSize: "14px",
                fontWeight: 590,
                color: "#f7f8f8",
                letterSpacing: "-0.182px",
                fontFeatureSettings: "'cv01', 'ss03'",
              }}
            >
              {n.customerName}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#62666d",
                fontFeatureSettings: "'cv01', 'ss03'",
              }}
            >
              {timeAgo(new Date(n.createdAt))}
            </span>
          </div>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "#8a8f98",
              letterSpacing: "-0.165px",
              fontFeatureSettings: "'cv01', 'ss03'",
              whiteSpace: "pre-wrap",
            }}
          >
            {n.content}
          </p>
        </div>
      ))}
    </div>
  );
}
