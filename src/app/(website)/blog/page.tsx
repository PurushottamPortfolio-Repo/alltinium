import { BLOG_POSTS } from "@/data/blog/blog";
import { LatestBlogs } from "@/components/blog/latest-blogs";

export const metadata = {
  title: "Blogs",
  description: "Engineering insights, materials knowledge and industry articles.",
};

export default function BlogPage() {
  return (
    <main className="container py-28">
      <LatestBlogs posts={BLOG_POSTS} />
    </main>
  );
}
