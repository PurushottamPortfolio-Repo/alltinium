import { BLOG_POSTS } from "@/components/blog/blog-posts";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/animations/reveal";

export function LatestBlogs() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8 lg:px-20 lg:py-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="font-heading inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Writings
          </span>

          <h2 className="font-heading mt-2 text-3xl font-bold tracking-tight">
            Technical reading for procurement and QA
          </h2>
        </Reveal>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 mt-10">
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
