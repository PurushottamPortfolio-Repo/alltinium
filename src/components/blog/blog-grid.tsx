"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

import { BLOG_POSTS } from "@/components/blog/blog-posts";
import { BLOG_CATEGORIES } from "./blog-posts";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

import type { BlogFilterCategory } from "./types";

export function BlogGrid() {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<BlogFilterCategory>("All");

  const filteredPosts = useMemo(() => {
    const search = query.toLowerCase();

    return BLOG_POSTS.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;

      const matchesSearch =
        post.title.toLowerCase().includes(search) || post.excerpt.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [query, category]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div>
      {/* Featured Blog */}

      <Reveal className="gradient-border glass mb-14 grid gap-8 rounded-[var(--radius-card)] p-8 sm:grid-cols-2 sm:items-center">
        <div className="order-2 aspect-[16/10] overflow-hidden rounded-2xl bg-[var(--bg-elevated)] sm:order-1">
          <Image
            src={featuredPost.cover}
            alt={featuredPost.title}
            fill={false}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="order-1 sm:order-2">
          <span className="text-eyebrow">Featured Article</span>

          <h2 className="mt-3 font-heading text-2xl font-bold leading-snug">
            {featuredPost.title}
          </h2>

          <p className="mt-4 text-muted-foreground">{featuredPost.excerpt}</p>

          <Link
            href={`/blog/${featuredPost.slug}`}
            className="mt-6 inline-flex text-primary hover:underline"
          >
            Read Article →
          </Link>
        </div>
      </Reveal>

      {/* Search + Categories */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="search"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border py-2 pl-10 pr-4 text-sm outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                category === item ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}

      {filteredPosts.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">No articles found.</p>
      ) : (
        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 0.08}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
