export default function Blogs() {
  return <div>Blog Posts</div>;
}

// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { ArrowLeft, Clock, Heart, Share2 } from "lucide-react";
// import { BLOG_POSTS } from "@/components/blog/blog-posts";
// import { SITE as SITE_CONST } from "@/constants";
// import { Reveal } from "@/components/animations/reveal";
// import { Badge } from "@/components/ui/badge";
// import { BlogCard } from "@/components/blog/blog-card";

// export function generateStaticParams() {
//   return BLOG_POSTS.map((p) => ({ slug: p.slug }));
// }

// export function generateMetadata({ params }) {
//   const post = BLOG_POSTS.find((p) => p.slug === params.slug);
//   if (!post) return {};
//   return {
//     title: post.title,
//     description: post.excerpt,
//     openGraph: { title: post.title, description: post.excerpt },
//   };
// }

// export default function BlogPostPage({ params }) {
//   const post = BLOG_POSTS.find((p) => p.slug === params.slug);
//   if (!post) notFound();

//   const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

//   return (
//     <article className="px-6 pt-36 pb-24">
//       <div className="mx-auto max-w-2xl">
//         <Link
//           href="/blog"
//           className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-muted)] hover:text-[var(--ink)]"
//         >
//           <ArrowLeft size={14} /> All articles
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
//               <Clock size={13} /> {post.readingTime} min read
//             </span>
//           </div>
//         </Reveal>

//         <Reveal
//           delay={0.1}
//           className="mt-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-[var(--bg-elevated)]"
//         >
//           <img
//             src={`https://picsum.photos/seed/${post.slug}/1000/562`}
//             alt={post.title}
//             className="h-full w-full object-cover"
//           />
//         </Reveal>

//         <Reveal
//           delay={0.15}
//           className="prose-content mt-10 space-y-5 text-[var(--ink-muted)] leading-relaxed"
//         >
//           <p>{post.excerpt}</p>
//           <p>
//             This is placeholder body content for the article — replace with real long-form writing
//             or a CMS-fetched body once the content backend is connected. The component structure
//             below (author card, tags, share, comments placeholder) is already wired to receive that
//             content without changes.
//           </p>
//           <h2 className="font-[var(--font-display)] text-xl font-semibold text-[var(--ink)] pt-2">
//             A subheading
//           </h2>
//           <p>
//             Paragraphs, headings, and lists in the real article would render here from markdown or a
//             CMS payload.
//           </p>
//         </Reveal>

//         <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-2">
//           {post.tags.map((t) => (
//             <span
//               key={t}
//               className="rounded-full border border-[var(--surface-border)] px-3 py-1 text-xs font-mono text-[var(--ink-faint)]"
//             >
//               #{t}
//             </span>
//           ))}
//         </Reveal>

//         <Reveal
//           delay={0.25}
//           className="mt-8 flex items-center gap-4 border-y border-[var(--surface-border)] py-4"
//         >
//           <button className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-muted)] hover:text-[var(--color-brand-bright)]">
//             <Heart size={16} /> Like
//           </button>
//           <button className="inline-flex items-center gap-1.5 text-sm text-[var(--ink-muted)] hover:text-[var(--color-brand-bright)]">
//             <Share2 size={16} /> Share
//           </button>
//         </Reveal>

//         <Reveal
//           delay={0.3}
//           className="mt-10 flex items-center gap-4 gradient-border glass rounded-[var(--radius-card)] p-6"
//         >
//           <img
//             src="https://api.dicebear.com/9.x/notionists/svg?seed=aarav&backgroundColor=transparent"
//             alt={SITE_CONST.name}
//             className="h-12 w-12 rounded-full"
//           />
//           <div>
//             <p className="font-[var(--font-display)] font-semibold text-[var(--ink)]">
//               {SITE_CONST.name}
//             </p>
//             <p className="text-sm text-[var(--ink-muted)]">{SITE_CONST.role}</p>
//           </div>
//         </Reveal>

//         <div className="mt-10 rounded-[var(--radius-card)] border border-dashed border-[var(--surface-border)] p-6 text-center text-sm text-[var(--ink-faint)]">
//           Comments are coming soon — check back once the discussion backend is connected.
//         </div>
//       </div>

//       <div className="mx-auto mt-20 max-w-5xl">
//         <h2 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--ink)] mb-8">
//           Related posts
//         </h2>
//         <div className="grid gap-8 sm:grid-cols-2">
//           {related.map((p) => (
//             <BlogCard key={p.slug} post={p} />
//           ))}
//         </div>
//       </div>
//     </article>
//   );
// }
