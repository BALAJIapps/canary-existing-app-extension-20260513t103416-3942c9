import Link from "next/link";
import { ArrowRight, BookOpen, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col"
      style={{ background: "#08090a", color: "#f7f8f8" }}
    >
      {/* Nav */}
      <header
        className="flex items-center justify-between px-6 py-4 sticky top-0 z-10"
        style={{
          background: "#0f1011",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Link href="/" className="flex items-center gap-2">
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
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              style={{
                color: "#d0d6e0",
                fontSize: "14px",
                fontWeight: 510,
                fontFeatureSettings: "'cv01', 'ss03'",
              }}
            >
              Sign in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button
              style={{
                background: "#5e6ad2",
                color: "#ffffff",
                borderRadius: "6px",
                fontWeight: 510,
                fontSize: "14px",
                fontFeatureSettings: "'cv01', 'ss03'",
              }}
            >
              Get started
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-col justify-center px-8 md:px-16 py-24 md:py-36 max-w-5xl">
        <div
          className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
            fontSize: "12px",
            fontWeight: 510,
            color: "#8a8f98",
            width: "fit-content",
            fontFeatureSettings: "'cv01', 'ss03'",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#10b981",
              display: "inline-block",
            }}
          />
          Existing product · Baseline v1
        </div>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 510,
            lineHeight: 1.0,
            letterSpacing: "-1.056px",
            color: "#f7f8f8",
            fontFeatureSettings: "'cv01', 'ss03'",
            maxWidth: "640px",
          }}
        >
          Keep track of every customer conversation.
        </h1>
        <p
          style={{
            marginTop: "24px",
            fontSize: "18px",
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: "-0.165px",
            color: "#8a8f98",
            maxWidth: "480px",
            fontFeatureSettings: "'cv01', 'ss03'",
          }}
        >
          NoteKeeper gives your team a single place to log customer notes,
          track interactions, and never lose context again.
        </p>
        <div className="flex items-center gap-3 mt-10">
          <Link href="/sign-up">
            <Button
              size="lg"
              style={{
                background: "#5e6ad2",
                color: "#ffffff",
                borderRadius: "6px",
                fontWeight: 510,
                fontSize: "15px",
                fontFeatureSettings: "'cv01', 'ss03'",
                padding: "10px 20px",
              }}
            >
              Start taking notes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              size="lg"
              variant="ghost"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#d0d6e0",
                borderRadius: "6px",
                fontWeight: 510,
                fontSize: "15px",
                fontFeatureSettings: "'cv01', 'ss03'",
              }}
            >
              Sign in
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature strip - asymmetric 2-col */}
      <section
        className="px-8 md:px-16 pb-24 grid md:grid-cols-[2fr_1fr] gap-6 max-w-5xl"
      >
        <div
          className="rounded-xl p-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Users
            className="h-6 w-6 mb-4"
            style={{ color: "#7170ff" }}
            strokeWidth={1.7}
          />
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 590,
              letterSpacing: "-0.24px",
              color: "#f7f8f8",
              fontFeatureSettings: "'cv01', 'ss03'",
              marginBottom: "8px",
            }}
          >
            Customer-centric notes
          </h3>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "#8a8f98",
              letterSpacing: "-0.165px",
              fontFeatureSettings: "'cv01', 'ss03'",
            }}
          >
            Every note is attached to a customer name. Browse your full history
            at a glance — no searching through email threads.
          </p>
        </div>
        <div
          className="rounded-xl p-8"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <Shield
            className="h-6 w-6 mb-4"
            style={{ color: "#7170ff" }}
            strokeWidth={1.7}
          />
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 590,
              letterSpacing: "-0.24px",
              color: "#f7f8f8",
              fontFeatureSettings: "'cv01', 'ss03'",
              marginBottom: "8px",
            }}
          >
            Private by default
          </h3>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "#8a8f98",
              letterSpacing: "-0.165px",
              fontFeatureSettings: "'cv01', 'ss03'",
            }}
          >
            Your notes are yours. Secured per-account so teammates only see
            what they add.
          </p>
        </div>
      </section>

      <footer
        className="px-6 py-4 text-sm"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          color: "#62666d",
          fontFeatureSettings: "'cv01', 'ss03'",
        }}
      >
        NoteKeeper &middot; built on Baljia &middot; Next.js &middot; Neon
      </footer>
    </main>
  );
}
