import { BlogGrid } from "@/components/blog/blog-grid";
import type { Metadata } from "next";

export const metadata = {
  title: "Blog",
  description: "Notes on engineering, design systems, and freelancing.",
};

export default function BlogPage() {
  return (
    <div className="px-6 mt-10 pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-eyebrow">Writings</p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--ink)]">
          Notes from the work
        </h1>
        <p className="mt-4 text-[var(--ink-muted)]">
          Engineering decisions, design systems, and the realities of freelancing.
        </p>
      </div>
      <div className="mx-auto mt-14 max-w-6xl">
        <BlogGrid />
      </div>
    </div>
  );
}
