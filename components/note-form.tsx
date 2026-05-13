"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

export function NoteForm() {
  const router = useRouter();
  const [customerName, setCustomerName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!customerName.trim() || !content.trim()) {
      setError("Customer name and note content are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName: customerName.trim(), content: content.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error?.message ?? "Failed to save note.");
      } else {
        setCustomerName("");
        setContent("");
        router.refresh();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl p-6 mb-6"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2
        style={{
          fontSize: "16px",
          fontWeight: 590,
          color: "#f7f8f8",
          letterSpacing: "-0.165px",
          fontFeatureSettings: "'cv01', 'ss03'",
          marginBottom: "16px",
        }}
      >
        Add a note
      </h2>

      <div className="space-y-4">
        <div>
          <Label
            htmlFor="customerName"
            style={{
              fontSize: "13px",
              fontWeight: 510,
              color: "#8a8f98",
              fontFeatureSettings: "'cv01', 'ss03'",
            }}
          >
            Customer name
          </Label>
          <Input
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Acme Corp"
            disabled={loading}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#d0d6e0",
              marginTop: "6px",
              fontFeatureSettings: "'cv01', 'ss03'",
            }}
          />
        </div>
        <div>
          <Label
            htmlFor="content"
            style={{
              fontSize: "13px",
              fontWeight: 510,
              color: "#8a8f98",
              fontFeatureSettings: "'cv01', 'ss03'",
            }}
          >
            Note
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What happened in this interaction?"
            rows={3}
            disabled={loading}
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#d0d6e0",
              marginTop: "6px",
              fontFeatureSettings: "'cv01', 'ss03'",
              resize: "none",
            }}
          />
        </div>
        {error && (
          <p style={{ fontSize: "13px", color: "#ef4444", fontFeatureSettings: "'cv01', 'ss03'" }}>
            {error}
          </p>
        )}
        <Button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "rgba(94,106,210,0.5)" : "#5e6ad2",
            color: "#ffffff",
            borderRadius: "6px",
            fontWeight: 510,
            fontSize: "14px",
            fontFeatureSettings: "'cv01', 'ss03'",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          {loading ? "Saving..." : "Save note"}
        </Button>
      </div>
    </form>
  );
}
