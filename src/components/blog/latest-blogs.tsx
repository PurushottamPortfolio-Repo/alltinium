import { BlogCard } from "./blog-card";
import { BlogPost } from "@/components/blog/types";

interface Props {
  posts: BlogPost[];
}

export function LatestBlogs({ posts }: Props) {
  return (
    <section>
      <div className="text-center">
        <span className="rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
          Engineering Insights
        </span>

        <h2 className="mt-4 text-4xl font-bold">Latest Articles</h2>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Articles on aerospace materials, engineering, procurement and manufacturing.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
