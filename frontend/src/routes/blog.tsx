import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Search, Clock, ArrowRight } from "lucide-react";
import { Mandala } from "@/components/decorative";
import { SectionHeading } from "@/components/sia-ui";
import { BLOG_POSTS } from "@/lib/sia-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Wisdom Writings · SIA Blog" },
      { name: "description", content: "Reflections on the Pathless Path — essays on Vedic wisdom, yoga, meditation, and the inner journey." },
      { property: "og:title", content: "Wisdom Writings · SIA Blog" },
      { property: "og:description", content: "Reflections on the Pathless Path — essays on Vedic wisdom, yoga, meditation, and the inner journey." },
    ],
  }),
  component: BlogPage,
});

const CATEGORIES = ["All", "Spirituality", "Vedic Wisdom", "Yoga", "Meditation", "Personal Journey"];

function BlogPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");

  const featured = BLOG_POSTS.find((p) => p.featured)!;
  const filtered = useMemo(() => {
    return BLOG_POSTS.filter((p) => !p.featured)
      .filter((p) => cat === "All" || p.category === cat)
      .filter((p) => !q || p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase()));
  }, [cat, q]);

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-cream)] pt-32 pb-16">
        <Mandala className="absolute -right-40 -top-20 w-[700px] text-[var(--color-purple)] opacity-[0.06] spin-slow" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="btn-label text-[var(--color-gold)]">The Journal</p>
          <h1 className="mt-5 font-serif italic text-5xl sm:text-6xl text-[var(--color-purple)] leading-[1.05]">
            Wisdom Writings
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-mid)] max-w-2xl mx-auto">
            Slow reading for inward turning.
          </p>

          <div className="mt-10 mx-auto max-w-xl flex items-center rounded-full bg-white shadow-card pl-5 pr-1.5">
            <Search className="h-5 w-5 text-[var(--color-purple)]" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search reflections..."
              className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
              aria-label="Search blog"
            />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link to="/blog/$slug" params={{ slug: featured.slug }} className="hover-lift group block overflow-hidden rounded-3xl shadow-card relative aspect-[16/9] sm:aspect-[16/7]">
            <img src={featured.image} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-purple)]/95 via-[var(--color-purple)]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 text-[var(--color-cream)] max-w-3xl">
              <span className="rounded-full bg-[var(--color-gold)] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-purple)]">Featured · {featured.category}</span>
              <h2 className="mt-4 font-serif text-3xl sm:text-5xl leading-tight">{featured.title}</h2>
              <p className="mt-3 text-base sm:text-lg opacity-90 max-w-2xl">{featured.excerpt}</p>
              <p className="mt-5 btn-label text-[var(--color-gold)] inline-flex items-center gap-2">Read essay <ArrowRight className="h-4 w-4" /></p>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
                  cat === c
                    ? "bg-[var(--color-purple)] text-[var(--color-cream)]"
                    : "border border-[var(--color-purple)]/25 text-[var(--color-purple)] hover:border-[var(--color-purple)]",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-[var(--color-text-mid)] py-20">No reflections match your search.</p>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.06 }}
                  className="hover-lift group flex flex-col rounded-2xl bg-white shadow-card overflow-hidden"
                >
                  <Link to="/blog/$slug" params={{ slug: post.slug }} className="block">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={post.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="rounded-full bg-[var(--color-purple-pale)] self-start px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-purple)]">{post.category}</span>
                    <h3 className="mt-3 font-serif text-xl text-[var(--color-purple)] leading-snug line-clamp-2">
                      <Link to="/blog/$slug" params={{ slug: post.slug }}>{post.title}</Link>
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-text-mid)] line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    <div className="mt-5 flex items-center gap-3 text-xs text-[var(--color-text-mid)]">
                      <img src={post.authorAvatar} alt="" className="h-8 w-8 rounded-full object-cover" loading="lazy" />
                      <div>
                        <p className="font-semibold text-[var(--color-text-dark)]">{post.author}</p>
                        <p>{post.date} · <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span></p>
                      </div>
                    </div>
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="mt-5 group/link inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-purple)]">
                      <span className="relative">
                        Read More
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--color-purple)] transition-all duration-300 group-hover/link:w-full" />
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
