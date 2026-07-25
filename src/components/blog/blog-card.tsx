import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";

interface Props {
  post: BlogPost;
}

export function BlogCard({ post }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border">
      <div className="relative aspect-video">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
        <p className="text-sm text-primary">{post.category}</p>

        <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>

        <p className="mt-3 text-muted-foreground">{post.excerpt}</p>
      </div>
    </Link>
  );
}
