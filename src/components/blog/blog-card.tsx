import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        <div className="space-y-4 p-6">
          <Badge>{post.category}</Badge>

          <h3 className="font-heading text-xl font-bold leading-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>

          <p className="font-body text-muted-foreground leading-7">{post.excerpt}</p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />

            <span className="font-body">{post.readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
