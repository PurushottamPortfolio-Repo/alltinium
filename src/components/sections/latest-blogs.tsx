import { BLOG_POSTS } from "@/data/mock";
import { BlogCard } from "@/components/ui/blog-card";
import { Reveal } from "@/components/animations/reveal";

export function LatestBlogs() {
  return (
    <section className="px-6 py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {BLOG_POSTS.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.1}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
