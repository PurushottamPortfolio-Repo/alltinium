import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Heart, Share2 } from "lucide-react";

import { BLOG_POSTS } from "@/components/blog/blog-posts";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/animations/reveal";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <article className="px-6 pt-36 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]"
        >
          <ArrowLeft size={15} />
          All Articles
        </Link>

        <Reveal>
          <Badge className="mt-6">{post.category}</Badge>

          <h1 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-[var(--ink-muted)]">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            <span className="inline-flex items-center gap-1">
              <Clock size={14} />
              {post.readingTime} min read
            </span>
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-[var(--bg-elevated)]"
        >
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            sizes="(max-width:768px) 100vw, 768px"
            className="object-cover"
          />
        </Reveal>

        <Reveal
          delay={0.15}
          className="prose-content mt-10 space-y-6 text-[var(--ink-muted)] leading-8"
        >
          <p>{post.excerpt}</p>

          {post.content ? (
            <div>{post.content}</div>
          ) : (
            <>
              <p>
                This article will soon contain detailed engineering insights, technical discussions,
                procurement guidance, and practical recommendations for aerospace and industrial
                buyers.
              </p>

              <h2 className="pt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--ink)]">
                Coming Soon
              </h2>

              <p>The complete article is currently being prepared and will be available shortly.</p>
            </>
          )}
        </Reveal>

        <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--surface-border)] px-3 py-1 text-xs font-medium text-[var(--ink-faint)]"
            >
              #{tag}
            </span>
          ))}
        </Reveal>

        <Reveal
          delay={0.25}
          className="mt-10 flex items-center gap-6 border-y border-[var(--surface-border)] py-5"
        >
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--color-brand-bright)]"
          >
            <Heart size={16} />
            Like
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm text-[var(--ink-muted)] transition-colors hover:text-[var(--color-brand-bright)]"
          >
            <Share2 size={16} />
            Share
          </button>
        </Reveal>

        <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-[var(--surface-border)] p-6 text-center text-sm text-[var(--ink-faint)]">
          Comments are coming soon. Stay tuned for community discussions.
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl">
          <h2 className="mb-10 font-[var(--font-display)] text-3xl font-semibold text-[var(--ink)]">
            Related Articles
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { ArrowLeft, Clock, Heart, Share2 } from "lucide-react";
// import Image from "next/image";
// import { BLOG_POSTS } from "@/components/blog/blog-posts";

// import { Reveal } from "@/components/animations/reveal";
// import { Badge } from "@/components/ui/badge";
// import { BlogCard } from "@/components/blog/blog-card";
// import type { BlogPost } from "@/components/blog/types";

// interface PageProps {
//   params: Promise<{
//     slug: string;
//   }>;
// }

// export function generateStaticParams(): { slug: string }[] {
//   return BLOG_POSTS.map((post) => ({
//     slug: post.slug,
//   }));
// }

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const post = BLOG_POSTS.find((p) => p.slug === params.slug);

//   if (!post) {
//     return {};
//   }

//   return {
//     title: post.title,
//     description: post.excerpt,
//     openGraph: {
//       title: post.title,
//       description: post.excerpt,
//     },
//   };
// }

// export default async function BlogPostPage({ params }: PageProps) {
//   const { slug } = await params;

//   const post = BLOG_POSTS.find((p) => p.slug === slug);

//   if (!post) {
//     notFound();
//   }

//   const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

//   return (
//     <article className="px-6 pt-36 pb-24">
//       <div className="mx-auto max-w-2xl">
//         <Link
//           href="/blog"
//           className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-muted)] hover:text-[var(--ink)]"
//         >
//           <ArrowLeft size={14} />
//           All articles
//         </Link>

//         <Reveal>
//           <Badge className="mt-6">{post.category}</Badge>

//           <h1 className="mt-4 font-[var(--font-display)] text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--ink)]">
//             {post.title}
//           </h1>

//           <div className="mt-4 flex items-center gap-4 text-sm text-[var(--ink-muted)]">
//             <span>
//               {new Date(post.date).toLocaleDateString("en-US", {
//                 month: "long",
//                 day: "numeric",
//                 year: "numeric",
//               })}
//             </span>

//             <span className="inline-flex items-center gap-1">
//               <Clock size={13} />
//               {post.readingTime} min read
//             </span>
//           </div>
//         </Reveal>

//         <Reveal
//           delay={0.1}
//           className="mt-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-[var(--bg-elevated)]"
//         >
//           <Image
//             src={post.cover}
//             alt={post.title}
//             fill
//             priority
//             sizes="100vw"
//             className="object-cover"
//           />
//         </Reveal>

//         <Reveal
//           delay={0.15}
//           className="prose-content mt-10 space-y-5 text-[var(--ink-muted)] leading-relaxed"
//         >
//           <p>{post.excerpt}</p>

//           <p>
//             This is placeholder body content for the article — replace with real long-form writing
//             or a CMS-fetched body once the content backend is connected.
//           </p>

//           <h2 className="pt-2 font-[var(--font-display)] text-xl font-semibold text-[var(--ink)]">
//             A subheading
//           </h2>

//           <p>
//             Paragraphs, headings, and lists in the real article would render here from markdown or a
//             CMS payload.
//           </p>
//         </Reveal>

//         <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-2">
//           {post.tags.map((tag) => (
//             <span
//               key={tag}
//               className="rounded-full border border-[var(--surface-border)] px-3 py-1 text-xs font-mono text-[var(--ink-faint)]"
//             >
//               #{tag}
//             </span>
//           ))}
//         </Reveal>

//         <Reveal
//           delay={0.25}
//           className="mt-8 flex items-center gap-4 border-y border-[var(--surface-border)] py-4"
//         >
//           <button className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-muted)] hover:text-[var(--color-brand-bright)]">
//             <Heart size={16} />
//             Like
//           </button>

//           <button className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-muted)] hover:text-[var(--color-brand-bright)]">
//             <Share2 size={16} />
//             Share
//           </button>
//         </Reveal>

//         <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-[var(--surface-border)] p-6 text-center text-sm text-[var(--ink-faint)]">
//           Comments are coming soon — check back once the discussion backend is connected.
//         </div>
//       </div>

//       <div className="mx-auto mt-20 max-w-5xl">
//         <h2 className="mb-8 font-[var(--font-display)] text-2xl font-semibold text-[var(--ink)]">
//           Related posts
//         </h2>

//         <div className="grid gap-8 sm:grid-cols-2">
//           {related.map((post) => (
//             <BlogCard key={post.slug} post={post} />
//           ))}
//         </div>
//       </div>
//     </article>
//   );
// }
