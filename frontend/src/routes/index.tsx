import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import { ArrowRight, Calendar, MapPin, Star, Play } from "lucide-react";
import { Mandala, FloatingPetals, LotusDivider, Lotus } from "@/components/decorative";
import { SectionHeading, SiaButton, ScrollIndicator } from "@/components/sia-ui";
import { GALLERY_IMAGES, EVENTS, COURSES } from "@/lib/sia-data";
import HeroImage from "@/assets/home5.jpg"
import jake from "@/assets/jake.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Awakening the Light Within · Shifting Into Awareness" },
      { name: "description", content: "Walk the Pathless Path with Jake Light. Free satsangs, retreats, and the living practices of awakening." },
      { property: "og:title", content: "Awakening the Light Within · SIA" },
      { property: "og:description", content: "Walk the Pathless Path with Jake Light. Free satsangs, retreats, and the living practices of awakening." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    // Wrapping in an overall overflow-x-hidden is a great safety net for mobile layouts
    <div className="overflow-x-hidden">
      <Hero />
      <AboutTeaser />
      <Gallery />
      <Webinars />
      <FeaturedCourses />
      <FinalCTA />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-[var(--color-cream)] pt-20">
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[1100px] text-[var(--color-purple)] opacity-[0.06] spin-slow">
          <Mandala />
        </div>
      </motion.div>
      <FloatingPetals />

      {/* Added py-12 on mobile to ensure spacing is even */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-80px)] py-12 lg:py-0">
        <motion.div style={{ y: fgY }} className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="btn-label text-[var(--color-gold)] mb-4 sm:mb-6"
          >
            Welcome to the Pathless Path
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif italic font-semibold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] sm:leading-[1.02] text-[#600694]"
          >
            Awakening<br /> the Light Within
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-5 sm:mt-7 max-w-xl text-base sm:text-lg lg:text-xl text-[var(--color-text-mid)] leading-relaxed"
          >
            Jake Light · Spiritual Guide · The Pathless Path. A sanctuary for sincere seekers — satsangs, scriptures, and the inner science of awakening.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <Link to="/sia" className="w-full sm:w-auto">
              <SiaButton className="w-full sm:w-auto bg-[#600694] justify-center">
                Explore the Journey <ArrowRight className="h-4 w-4" />
              </SiaButton>
            </Link>

            <Link to="/events" className="w-full sm:w-auto">
              <SiaButton 
                variant="outline" 
                className="w-full sm:w-auto justify-center rounded-full border-[#600694] text-[#600694] hover:bg-[#600694] hover:text-white uppercase tracking-widest transition-colors duration-300"
              >
                <Play className="h-4 w-4 mr-2" /> Watch Free Satsang
              </SiaButton>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative flex justify-center mt-8 lg:mt-0"
        >
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-full blur-3xl bg-[var(--color-purple-light)] opacity-30 scale-110" />
            <div className="relative aspect-[4/5] w-[280px] max-w-[90vw] sm:w-[340px] lg:w-[400px] overflow-hidden rounded-full border-[6px] border-[var(--color-gold)]/40 shadow-[0_30px_80px_-20px_oklch(0.247_0.165_305_/_0.4)] pulse-glow">
              <img
                src={HeroImage}
                alt="Jake Light in meditation"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <Lotus className="absolute -bottom-8 -right-4 h-20 w-20 text-[var(--color-gold)] opacity-80" />
          </div>
        </motion.div>
      </div>
      <ScrollIndicator />
    </section>
  );
}

function AboutTeaser() {
  return (
    <section className="relative bg-[var(--color-peach)] py-24 sm:py-32 overflow-hidden">
      <div className="absolute right-0 top-10 text-[var(--color-purple)] opacity-[0.05] w-[400px]">
        <Lotus />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 order-2 lg:order-1"
        >
          <div className="relative mx-auto max-w-md w-full">
            <div className="absolute -inset-3 rounded-md border-2 border-[var(--color-gold)]" />
            <img
              src={jake}
              alt="Jake Light"
              className="relative aspect-[4/5] w-full rounded-md object-cover shadow-card"
              loading="lazy"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-7 relative order-1 lg:order-2"
        >
          <span className="absolute -top-12 -left-4 font-serif text-[180px] leading-none text-[var(--color-purple)] opacity-10 select-none hidden sm:block">"</span>
          <p className="btn-label text-[var(--color-gold)]">About Jake Light</p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[var(--color-purple)] leading-tight">
            All deep wisdom is within each of us.
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[var(--color-text-mid)] leading-relaxed">
            Jake Light journeyed through various world religions and yogic traditions before discovering that all profound wisdom stems from a single Source within us. This realization led him beyond traditional practices to what he calls the "pathless path," and today, he is dedicated to sharing these crystal-clear insights to guide other spiritual seekers.
          </p>
          <Link to="/sia" className="group mt-8 inline-flex items-center gap-2 text-[#8204cb] font-semibold">
            Read Jake's Full Story
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function Gallery() {
  // ADDED overflow-hidden to section below to prevent horizontal scroll from Swiper
  return (
    <section className="bg-[var(--color-cream)] py-20 overflow-hidden">
      <SectionHeading
        eyebrow="Glimpses"
        title="The Sacred in Practice"
        subtitle="Moments from satsangs, retreats, and the daily living of the Pathless Path."
      />
      <div className="mt-12">
        <Swiper
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween={20}
          loop
          freeMode
          speed={5000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          allowTouchMove={false}
          className="!px-6"
        >
          {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((img, i) => (
            <SwiperSlide key={i} className="!w-[280px] sm:!w-[360px]">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-card">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover grayscale-[40%] transition-all duration-700 hover:grayscale-0 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <LotusDivider />
    </section>
  );
}

function Webinars() {
  const upcoming = EVENTS.filter((e) => !e.past).slice(0, 3);
  return (
    <section className="bg-[var(--color-peach)] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Live Gatherings"
          title="Webinars & Upcoming Satsangs"
          subtitle="Join a global sangha exploring stillness, scripture, and inner awakening — live."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((ev, i) => (
            <motion.article
              key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="hover-lift group flex flex-col rounded-2xl bg-white shadow-card overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={ev.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 rounded-full bg-[var(--color-purple)]/90 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-cream)]">
                  {ev.type}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="font-serif text-2xl text-[var(--color-purple)] leading-snug">{ev.title}</h3>
                <div className="mt-3 space-y-1.5 text-sm text-[var(--color-text-mid)]">
                  <p className="flex items-center gap-2"><Calendar className="h-4 w-4 shrink-0" /> {ev.date} · {ev.time}</p>
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> {ev.location}</p>
                </div>
                <p className="mt-4 text-sm text-[var(--color-text-mid)] leading-relaxed flex-1">{ev.description}</p>
                <Link
                  to="/events"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--color-purple)] px-5 py-2.5 btn-label text-[var(--color-cream)] hover:bg-[var(--color-purple-light)] transition-colors w-full sm:w-auto"
                >
                  Register Now
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCourses() {
  // ADDED overflow-hidden to section below to prevent horizontal scroll from Swiper's !overflow-visible class
  return (
    <section className="bg-[var(--color-cream)] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Begin Your Journey"
          title="Featured Courses"
          subtitle="Curated programs in practice and scripture, taught with the rigour of tradition and the freshness of direct experience."
        />
      </div>
      <div className="mt-14 px-6 lg:px-10">
        <Swiper
          modules={[FreeMode]}
          slidesPerView="auto"
          spaceBetween={24}
          freeMode
          className="!overflow-visible"
        >
          {COURSES.slice(0, 6).map((course) => (
            <SwiperSlide key={course.id} className="!w-[280px] sm:!w-[340px]">
              <article className="hover-lift group flex h-full flex-col rounded-2xl bg-white shadow-card overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={course.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-[var(--color-cream)]/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-purple)]">
                    {course.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-serif text-xl text-[var(--color-purple)] leading-snug line-clamp-2">{course.title}</h3>
                  <p className="mt-2 text-sm text-[var(--color-text-mid)] line-clamp-2">{course.description}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-semibold text-[var(--color-purple)]">{course.price}</span>
                    <span className="flex items-center gap-1 text-[var(--color-gold)]">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-[var(--color-text-dark)]">{course.rating}</span>
                    </span>
                  </div>
                  <Link
                    to="/courses"
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-purple)] px-4 py-2.5 btn-label text-[var(--color-cream)] hover:bg-[var(--color-purple-light)] transition-colors"
                  >
                    Enroll Now
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-peach)] py-20 sm:py-28">
      <Mandala className="absolute -right-40 -top-40 w-[600px] text-[var(--color-purple)] opacity-[0.06]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Lotus className="mx-auto h-12 w-12 sm:h-14 sm:w-14 text-[var(--color-gold)] mb-6" />
        <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-[var(--color-purple)] leading-tight">
          The journey within is the only journey worth taking.
        </h2>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-[var(--color-text-mid)]">Join the next free satsang and begin where you are.</p>
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <Link to="/events" className="w-full sm:w-auto">
            <SiaButton variant="primary" className="w-full sm:w-auto justify-center">Join Free Satsang <ArrowRight className="h-4 w-4" /></SiaButton>
          </Link>
          <Link to="/contact" className="w-full sm:w-auto">
            <SiaButton variant="outline" className="w-full sm:w-auto justify-center">Speak With Us</SiaButton>
          </Link>
        </div>
      </div>
    </section>
  );
}