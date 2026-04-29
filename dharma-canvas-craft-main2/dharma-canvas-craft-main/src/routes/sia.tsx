import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Flame, Heart, Crown, BookOpen, Calendar, Video, Mountain, Users, GraduationCap, BookMarked,
  Eye, Compass, Sparkles, ArrowRight,
} from "lucide-react";
import { Mandala, Lotus, LotusDivider } from "@/components/decorative";
import { SectionHeading, SiaButton } from "@/components/sia-ui";
import { TIMELINE } from "@/lib/sia-data";

export const Route = createFileRoute("/sia")({
  head: () => ({
    meta: [
      { title: "About SIA · Shifting Into Awareness" },
      { name: "description", content: "The story of Shifting Into Awareness, Jake Light's journey, our mission, and the activities of the global sangha." },
      { property: "og:title", content: "About SIA · Shifting Into Awareness" },
      { property: "og:description", content: "The story of Shifting Into Awareness, Jake Light's journey, our mission, and the activities of the global sangha." },
    ],
  }),
  component: SIAPage,
});

const TABS = [
  { id: "about", label: "About SIA" },
  { id: "jake", label: "Jake Light" },
  { id: "mission", label: "Our Mission" },
  { id: "activities", label: "Activities" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function SIAPage() {
  const [tab, setTab] = useState<TabId>("about");
  return (
    <>
      <SIAHero />
      <div className="sticky top-16 lg:top-20 z-30 glass-cream border-y border-[oklch(0.247_0.165_305_/_0.08)]">
        <div className="mx-auto max-w-5xl px-4 overflow-x-auto">
          <div className="relative flex gap-2 py-3 min-w-max mx-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="relative px-5 py-2.5 btn-label rounded-full transition-colors"
                style={{ color: tab === t.id ? "var(--color-cream)" : "var(--color-purple)" }}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="sia-tab-pill"
                    className="absolute inset-0 rounded-full bg-[var(--color-purple)]"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
        >
          {tab === "about" && <AboutSIA />}
          {tab === "jake" && <JakeLight />}
          {tab === "mission" && <Mission />}
          {tab === "activities" && <Activities />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function SIAHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-cream)] pt-32 pb-20">
      <Mandala className="absolute -left-40 -top-20 w-[700px] text-[var(--color-purple)] opacity-[0.06] spin-slow" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="btn-label text-[var(--color-gold)]">Shifting Into Awareness</p>
        <h1 className="mt-5 font-serif italic text-5xl sm:text-6xl text-[var(--color-purple)] leading-[1.05]">
          A sanctuary for the awakening soul.
        </h1>
        <p className="mt-7 text-lg text-[var(--color-text-mid)] max-w-2xl mx-auto leading-relaxed">
          Founded in 2014 by Jake Light, SIA is a global community devoted to the inner science of awakening — without dogma, without sect, without barrier.
        </p>
      </div>
    </section>
  );
}

function AboutSIA() {
  return (
    <>
      <section className="bg-[var(--color-peach)] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionHeading
            eyebrow="Our Story"
            title="What SIA Stands For"
            subtitle="Three letters that hold a lifetime's discovery — that the shift sought outside is already complete within."
          />
          <p className="mt-10 text-lg text-[var(--color-text-mid)] leading-relaxed">
            Shifting Into Awareness was born from a simple recognition: every authentic teaching, every revealed scripture, every silent meditation in every land, ultimately points to one truth — <em>you are the awareness you seek</em>. SIA exists to make that recognition direct, lived, and free.
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeading eyebrow="The Journey" title="Milestones on the Path" align="center" />
          <div className="relative mt-16">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-gold)]/40 -translate-x-1/2 hidden md:block" />
            <div className="space-y-12">
              {TIMELINE.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`md:grid md:grid-cols-2 md:gap-12 items-center ${i % 2 === 0 ? "" : "md:[direction:rtl]"}`}
                >
                  <div className={`md:text-right ${i % 2 === 0 ? "" : "[direction:ltr]"}`}>
                    <p className="font-serif text-5xl text-[var(--color-purple)]">{m.year}</p>
                    <h3 className="mt-2 font-serif text-2xl text-[var(--color-text-dark)]">{m.title}</h3>
                    <p className="mt-3 text-[var(--color-text-mid)] leading-relaxed">{m.text}</p>
                  </div>
                  <div className="hidden md:flex justify-center [direction:ltr]">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-cream)] border-2 border-[var(--color-gold)]">
                      <Lotus className="h-6 w-6 text-[var(--color-gold)]" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-peach)] py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Lotus className="mx-auto h-12 w-12 text-[var(--color-gold)]" />
          <p className="mt-8 font-serif italic text-3xl sm:text-4xl text-[var(--color-purple)] leading-snug">
            "All deep wisdom is within each of us, cultivated through many lifetimes."
          </p>
          <p className="mt-6 btn-label text-[var(--color-text-mid)]">— Jake Light</p>
        </div>
      </section>
    </>
  );
}

function JakeLight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  const paths = [
    { icon: Flame, name: "Kundalini Yoga", desc: "The science of awakening the dormant Shakti." },
    { icon: Heart, name: "Bhakti Yoga", desc: "The path of devotional surrender and love." },
    { icon: Crown, name: "Raj Yoga", desc: "The royal eight-limbed path of inner mastery." },
    { icon: BookOpen, name: "Gyana Yoga", desc: "The path of discriminative wisdom and self-inquiry." },
  ];

  const teachings = [
    { title: "The Pathless Path", text: "Awakening as recognition, not attainment." },
    { title: "Living Scripture", text: "Reading the Vedas, Gita, and Upanishads as mirrors." },
    { title: "The Inner Science", text: "Pranayama, kriya, and meditation grounded in the body." },
    { title: "Sangha as Mirror", text: "The community as a chamber of mutual reflection." },
  ];

  return (
    <>
      <section ref={ref} className="relative bg-[var(--color-cream)] py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <motion.div style={{ y }} className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-2xl border-2 border-[var(--color-gold)]" />
              <img
                src="https://images.unsplash.com/photo-1599782221542-a4ff6d44d8af?auto=format&fit=crop&w=900&q=80"
                alt="Jake Light"
                className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-card"
                loading="lazy"
              />
            </motion.div>
          </div>
          <div className="lg:col-span-7">
            <p className="btn-label text-[var(--color-gold)]">The Teacher</p>
            <h2 className="mt-4 font-serif text-5xl text-[var(--color-purple)] leading-tight">Jake Light</h2>
            <div className="mt-6 space-y-5 text-[var(--color-text-mid)] leading-relaxed text-lg">
              <p>
                Born to a quiet family of seekers, Jake's spiritual journey began with an early calling that took him from the temples of South India to the monasteries of Tibet, from sufi gatherings in Cairo to silent retreats in the American desert.
              </p>
              <p>
                Over three decades, he immersed himself fully in the four classical yogas — Kundalini, Bhakti, Raj, and Gyana — and in the major scriptures of the Vedic, Christian, Sufi, and Buddhist traditions. The recognition that emerged was unmistakable: every authentic path leads home.
              </p>
              <p>
                Today Jake teaches around the world — in retreats, online satsangs, and one-on-one guidance — helping seekers come to rest in the awareness they have always been.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-peach)] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading eyebrow="Inner Disciplines" title="The Four Yogas Jake Embodies" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map(({ icon: Icon, name, desc }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="hover-lift rounded-2xl bg-white p-7 text-center shadow-card"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--color-purple-pale)] text-[var(--color-purple)]">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-serif text-xl text-[var(--color-purple)]">{name}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-mid)] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-cream)] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <SectionHeading eyebrow="What Jake Teaches" title="Themes of the Teaching" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teachings.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-[var(--color-purple)]/10 bg-[var(--color-purple-pale)]/40 p-7"
              >
                <h3 className="font-serif text-xl text-[var(--color-purple)]">{t.title}</h3>
                <p className="mt-3 text-sm text-[var(--color-text-mid)] leading-relaxed">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Mission() {
  const cards = [
    { icon: Eye, title: "Vision", text: "A world where every seeker has direct, unmediated access to the wisdom traditions and the inner science of awakening." },
    { icon: Sparkles, title: "Values", text: "Devotion. Discernment. Discipline. Direct experience over inherited belief. Reverence for every authentic path." },
    { icon: Compass, title: "Approach", text: "Living scripture. Embodied practice. Honest dialogue. The sangha as mirror. The teacher as servant of awakening." },
  ];
  return (
    <>
      <section className="bg-[var(--color-peach)] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="btn-label text-[var(--color-gold)]">Our Mission</p>
          <h2 className="mt-5 font-serif text-4xl sm:text-5xl text-[var(--color-purple)] leading-tight">
            To make awakening accessible — without sect, without barrier, without dilution.
          </h2>
        </div>
      </section>
      <section className="bg-[var(--color-cream)] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-8 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="hover-lift rounded-2xl bg-white p-10 text-center shadow-card"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--color-purple)] text-[var(--color-cream)]">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-[var(--color-purple)]">{title}</h3>
              <p className="mt-3 text-[var(--color-text-mid)] leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
        <LotusDivider />
      </section>
    </>
  );
}

function Activities() {
  const items = [
    { icon: Calendar, title: "Free Satsangs", text: "Weekly online gatherings of dialogue, silence, and sacred song.", to: "/events" },
    { icon: Video, title: "Live Webinars", text: "Deep-dive sessions on practice, scripture, and inner science.", to: "/events" },
    { icon: Mountain, title: "Retreats", text: "Multi-day immersions in the Himalayas and beyond.", to: "/events" },
    { icon: GraduationCap, title: "Online Courses", text: "Structured journeys through practice and Vedic scripture.", to: "/courses" },
    { icon: BookMarked, title: "Wisdom Blog", text: "Reflections, commentaries, and notes from the path.", to: "/blog" },
    { icon: Users, title: "The Sangha", text: "A global community of seekers walking together.", to: "/contact" },
  ];
  return (
    <section className="bg-[var(--color-cream)] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading eyebrow="What We Offer" title="Activities of the Sangha" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, text, to }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link to={to} className="hover-lift block rounded-2xl bg-white p-7 shadow-card group h-full">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--color-purple-pale)] text-[var(--color-purple)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-[var(--color-purple)]">{title}</h3>
                <p className="mt-2 text-[var(--color-text-mid)] leading-relaxed">{text}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-purple)]">
                  Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/events"><SiaButton>Join the Next Gathering</SiaButton></Link>
        </div>
      </div>
    </section>
  );
}
