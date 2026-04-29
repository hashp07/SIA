import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Check, ShoppingBag, ArrowRight, Trash2, Lock } from "lucide-react";
import { useCart } from "@/lib/cart";
import { adminApi, formatPrice, type Coupon } from "@/lib/admin-store";
import { Lotus } from "@/components/decorative";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout · SIA" },
      { name: "description", content: "Complete your enrolment in SIA courses, retreats, and webinars." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, remove, clear } = useCart();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");
  const [step, setStep] = useState<"cart" | "success">("cart");
  const navigate = useNavigate();

  const discount = applied ? (subtotal * applied.percent) / 100 : 0;
  const total = Math.max(0, subtotal - discount);

  const onApply = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    if (!coupon.trim()) return;
    const c = adminApi.validateCoupon(coupon);
    if (!c) {
      setApplied(null);
      setCouponError("That coupon code is not valid.");
      return;
    }
    setApplied(c);
  };

  const onCheckout = () => {
    setStep("success");
    setTimeout(() => clear(), 600);
  };

  if (step === "success") {
    return (
      <section className="min-h-screen bg-gradient-soft pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-xl rounded-3xl bg-white p-10 sm:p-14 shadow-card-lifted text-center"
        >
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-brand text-white">
            <Check className="h-10 w-10" />
          </div>
          <h1 className="mt-6 font-serif italic text-4xl text-[var(--color-purple)]">
            Thank you, seeker.
          </h1>
          <p className="mt-3 text-[var(--color-text-mid)] leading-relaxed">
            Your enrolment is confirmed. A welcome email with access details is on its way.
          </p>
          <Lotus className="mx-auto mt-6 h-10 w-10 text-[var(--color-gold)]" />
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/courses"
              className="rounded-full border-2 border-[var(--color-purple)] px-6 py-3 btn-label text-[var(--color-purple)] hover:bg-[var(--color-purple)] hover:text-[var(--color-cream)] transition-colors"
            >
              Browse more
            </Link>
            <button
              onClick={() => navigate({ to: "/" })}
              className="rounded-full bg-gradient-brand px-6 py-3 btn-label text-white"
            >
              Return Home
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="min-h-screen bg-gradient-soft pt-32 pb-20 px-6">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-12 shadow-card text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-[var(--color-purple)]" />
          <h1 className="mt-6 font-serif text-3xl text-[var(--color-purple)]">Your cart is empty</h1>
          <p className="mt-3 text-[var(--color-text-mid)]">
            Add a course or retreat to begin checkout.
          </p>
          <Link
            to="/courses"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 btn-label text-white"
          >
            Browse Courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-soft pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="btn-label text-[var(--color-gold-deep)]">Checkout</p>
        <h1 className="mt-3 font-serif italic text-4xl sm:text-5xl text-[var(--color-purple)]">
          Complete your enrolment
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Items */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-card">
            <h2 className="font-serif text-2xl text-[var(--color-purple)]">
              Cart Items ({items.length})
            </h2>
            <ul className="mt-6 divide-y divide-[var(--color-purple)]/10">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <img
                    src={item.image}
                    alt=""
                    className="h-24 w-24 sm:h-28 sm:w-28 flex-none rounded-xl object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col">
                    {item.tag && (
                      <p className="text-[10px] uppercase tracking-wider text-[var(--color-gold-deep)] font-semibold">
                        {item.type} · {item.tag}
                      </p>
                    )}
                    <p className="mt-1 font-serif text-lg sm:text-xl text-[var(--color-purple)] leading-snug">
                      {item.title}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-semibold text-[var(--color-purple)]">
                        {formatPrice(item.price)}
                      </span>
                      <button
                        onClick={() => remove(item.id)}
                        className="flex items-center gap-1 text-xs uppercase tracking-wider text-[var(--color-text-mid)] hover:text-[var(--color-purple)]"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Summary */}
          <aside className="rounded-3xl bg-white p-6 sm:p-8 shadow-card-lifted h-fit lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl text-[var(--color-purple)]">Order Summary</h2>

            <form onSubmit={onApply} className="mt-6">
              <label className="text-xs uppercase tracking-wider text-[var(--color-text-mid)] font-semibold">
                Coupon code
              </label>
              <div className="mt-2 flex gap-2">
                <div className="flex flex-1 items-center gap-2 rounded-full border border-[var(--color-purple)]/20 bg-[var(--color-cream)]/40 px-4 py-2.5 focus-within:border-[var(--color-purple)] transition-colors">
                  <Tag className="h-4 w-4 text-[var(--color-purple)]" />
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder="AWAKEN10"
                    className="flex-1 bg-transparent text-sm focus:outline-none uppercase tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-[var(--color-purple)] px-5 py-2.5 btn-label text-[var(--color-cream)] hover:bg-[var(--color-purple-light)] transition-colors"
                >
                  Apply
                </button>
              </div>
              <AnimatePresence mode="wait">
                {applied && (
                  <motion.p
                    key="ok"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center gap-1.5 text-xs text-[var(--color-purple)] font-semibold"
                  >
                    <Check className="h-3.5 w-3.5 text-[var(--color-gold-deep)]" />
                    {applied.code} applied — {applied.percent}% off
                  </motion.p>
                )}
                {couponError && (
                  <motion.p
                    key="err"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-xs text-red-600"
                  >
                    {couponError}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>

            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between text-[var(--color-text-mid)]">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[var(--color-purple)]">
                  <span>Discount ({applied?.percent}%)</span>
                  <span>− {formatPrice(discount)}</span>
                </div>
              )}
              <div className="border-t border-[var(--color-purple)]/15 pt-3 flex justify-between items-baseline">
                <span className="text-sm uppercase tracking-wider text-[var(--color-text-mid)]">
                  Total
                </span>
                <span className="font-serif text-3xl text-[var(--color-purple)]">
                  {formatPrice(total)}
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-4 btn-label text-white hover:opacity-95 transition-opacity"
            >
              <Lock className="h-4 w-4" /> Pay {formatPrice(total)}
            </button>
            <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-[var(--color-text-mid)]">
              Demo checkout — no real payment is processed.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
