import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Facebook, MessageCircle, Send, MapPin, Mail, Phone } from "lucide-react";
import { Lotus } from "./decorative";
import { NAV_LINKS } from "@/lib/sia-data";
import { useState } from "react";
import logo from "@/assets/sia-logo.jpg";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="relative overflow-hidden bg-[var(--color-text-dark)] text-[var(--color-cream)]">
      {/* gradient veil */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-text-dark)] via-[var(--color-text-dark)] to-[oklch(0.27_0.13_320)] opacity-95 pointer-events-none" />
      <Lotus className="pointer-events-none absolute -top-10 -right-10 h-64 w-64 text-[var(--color-purple)] opacity-[0.12]" />
      <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-[var(--color-purple)]/20 blur-3xl pointer-events-none" />
      <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-[var(--color-gold)]/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-10 grid gap-12 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white p-1.5 shadow-card">
              <img src={logo} alt="Shifting Into Awareness" className="h-12 w-auto" />
            </div>
          </div>
          <p className="mt-6 font-serif italic text-xl leading-relaxed opacity-90 max-w-sm">
            The Pathless Path · Shifting Into Awareness
          </p>
          <p className="mt-4 text-sm opacity-75 max-w-sm leading-relaxed">
            A sanctuary for sincere seekers. Live satsangs, scripture commentary, retreats and the inner science of awakening.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] mb-5">Explore</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm opacity-80 hover:opacity-100 hover:text-[var(--color-gold)] transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] mb-5">Connect</h4>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Youtube, label: "YouTube" },
              { icon: Facebook, label: "Facebook" },
              { icon: MessageCircle, label: "WhatsApp" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-cream)]/20 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-[var(--color-gold)] hover:text-[var(--color-text-dark)] hover:border-[var(--color-gold)] hover:-translate-y-0.5 hover:shadow-glow"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <ul className="mt-6 space-y-2.5 text-sm opacity-80">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[var(--color-gold)]" /> hello@sia.org</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[var(--color-gold)]" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--color-gold)]" /> Rishikesh, India</li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--color-gold)] mb-5">Newsletter</h4>
          <p className="text-sm opacity-80 mb-4 leading-relaxed">Receive monthly reflections and satsang invitations.</p>
          <form onSubmit={onSubscribe} className="flex flex-col gap-3">
            <div className="flex items-center rounded-full border border-[var(--color-cream)]/20 bg-white/5 backdrop-blur-sm focus-within:border-[var(--color-gold)] transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-5 py-3 text-sm placeholder:text-[var(--color-cream)]/50 focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="m-1 grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-white hover:scale-105 transition-transform"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            {subscribed && (
              <p className="text-xs text-[var(--color-gold)] animate-in fade-in">Thank you. The next reflection is on its way.</p>
            )}
          </form>
        </div>
      </div>

      <div className="relative border-t border-[var(--color-cream)]/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs opacity-70">
          <p>© {new Date().getFullYear()} Shifting Into Awareness. All paths return to one.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--color-gold)] transition-colors">Terms</a>
            <Link to="/login" className="hover:text-[var(--color-gold)] transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
