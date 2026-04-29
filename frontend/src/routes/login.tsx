import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User as UserIcon, ArrowRight, Sparkles } from "lucide-react";
import { useAuth, ADMIN_HINT } from "@/lib/auth";
import { Lotus } from "@/components/decorative";
import { cn } from "@/lib/utils";
import logo from "@/assets/sia-logo.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In · Shifting Into Awareness" },
      { name: "description", content: "Sign in to access your courses, retreats, and admin dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "signup") {
        await signup(name, email, password);
        navigate({ to: "/" });
      } else {
        const res = await login(email, password);
        if (!res.ok) {
          setError(res.error);
          return;
        }
        // route admin to dashboard
        if (email.trim().toLowerCase() === ADMIN_HINT.email) {
          navigate({ to: "/admin" });
        } else {
          navigate({ to: "/" });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-soft pt-28 pb-16">
      <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[var(--color-purple-pale)] opacity-60 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[var(--color-gold)]/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex flex-col items-start"
        >
          <img src={logo} alt="" className="h-20 w-auto" />
          <h1 className="mt-8 font-serif italic text-5xl text-[var(--color-purple)] leading-tight">
            Welcome, <br />sincere seeker.
          </h1>
          <p className="mt-6 text-lg text-[var(--color-text-mid)] max-w-md leading-relaxed">
            Sign in to enrol in courses, register for retreats, and follow the journey.
          </p>
          <div className="mt-10 rounded-2xl border border-[var(--color-gold)]/30 bg-white/70 backdrop-blur p-5 text-sm shadow-card">
            <p className="flex items-center gap-2 font-semibold text-[var(--color-purple)]">
              <Sparkles className="h-4 w-4 text-[var(--color-gold)]" /> Admin demo access
            </p>
            <p className="mt-2 text-[var(--color-text-mid)]">
              Username: <code className="font-mono text-[var(--color-purple)]">{ADMIN_HINT.email}</code>
              <br />
              Password: <code className="font-mono text-[var(--color-purple)]">{ADMIN_HINT.password}</code>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl bg-white p-8 sm:p-10 shadow-card-lifted"
        >
          <Lotus className="absolute -top-8 left-1/2 -translate-x-1/2 h-16 w-16 text-[var(--color-purple)] lg:hidden" />

          <div className="flex rounded-full bg-[var(--color-purple-pale)] p-1 mb-8">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "flex-1 rounded-full py-2.5 btn-label transition-all",
                  mode === m
                    ? "bg-[var(--color-purple)] text-[var(--color-cream)] shadow-sm"
                    : "text-[var(--color-purple)]",
                )}
              >
                {m === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <h2 className="font-serif text-3xl text-[var(--color-purple)]">
            {mode === "login" ? "Welcome back" : "Begin the path"}
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-mid)]">
            {mode === "login" ? "Enter your details to continue." : "Create an account in seconds."}
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            {mode === "signup" && (
              <Field
                icon={<UserIcon className="h-4 w-4" />}
                type="text"
                placeholder="Full name"
                value={name}
                onChange={setName}
                required
              />
            )}
            <Field
              icon={<Mail className="h-4 w-4" />}
              type="text"
              placeholder="Email or username"
              value={email}
              onChange={setEmail}
              required
            />
            <Field
              icon={<Lock className="h-4 w-4" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              required
            />

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 btn-label text-white hover:opacity-95 transition-opacity disabled:opacity-60"
            >
              {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[var(--color-text-mid)]">
            By continuing you agree to our{" "}
            <Link to="/contact" className="text-[var(--color-purple)] underline">
              terms and privacy policy
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  icon,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-[var(--color-purple)]/15 bg-[var(--color-cream)]/50 px-4 py-3 focus-within:border-[var(--color-purple)] focus-within:bg-white transition-colors">
      <span className="text-[var(--color-purple)]">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-sm text-[var(--color-text-dark)] placeholder:text-[var(--color-text-mid)]/70 focus:outline-none"
      />
    </label>
  );
}
