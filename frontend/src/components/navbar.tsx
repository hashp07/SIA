import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, ShoppingBag, User, LogOut, LayoutDashboard } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/sia-data";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo2.png";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuUser, setMenuUser] = useState(false);
  const location = useLocation();
  const { count, setOpen: setCartOpen } = useCart();
  const { user, isAdmin, logout, hydrated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenuUser(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-60 transition-all duration-500 glass-cream",
          // Fix: Slim header on mobile (h-14/16), expands on desktop (lg:h-16/22)
          scrolled 
            ? "h-14 lg:h-16 border-b border-[#600694]/10 shadow-sm" 
            : "h-16 lg:h-22"
        )}
      >
        <div className="flex h-full w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-10 lg:max-w-7xl lg:mx-auto">
          <Link to="/" aria-label="SIA home" className="flex shrink-0 items-center gap-2.5 group">
            <img
              src={logo}
              alt="Shifting Into Awareness"
              className={cn(
                "transition-all duration-500 w-auto",
                // Fix: Scaled down logo for mobile, large for desktop
                scrolled ? "h-9 lg:h-16" : "h-12 lg:h-24 lg:pb-2"
              )}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="relative px-3 py-2 text-sm font-medium text-[var(--color-text-dark)] transition-colors hover:text-[#600694]"
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ className: "text-[#600694] [&>span]:scale-x-100" }}
              >
                {link.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-[2px] origin-center scale-x-0 rounded-full bg-[#600694] transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Cart */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#600694] hover:bg-[#600694]/10 transition-colors"
              aria-label={`Cart (${count} items)`}
            >
              <ShoppingBag className="h-5 w-5" />
              {hydrated && count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#600694] px-1 text-[10px] font-bold text-white shadow-sm">
                  {count}
                </span>
              )}
            </button>

            {/* Account */}
            {hydrated && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuUser((v) => !v)}
                  className="flex items-center gap-2 rounded-full bg-[#600694]/10 py-1.5 pl-1.5 pr-3 text-sm text-[#600694] hover:bg-[#600694]/20 transition-colors"
                  aria-label="Account menu"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#600694] text-xs font-bold text-white">
                    {user.name[0]?.toUpperCase()}
                  </span>
                  <span className="hidden sm:inline font-semibold max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>
                <AnimatePresence>
                  {menuUser && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-[#600694]/10 bg-white p-2 shadow-card-lifted"
                    >
                      <div className="px-3 py-2">
                        <p className="text-xs uppercase tracking-wider text-[var(--color-text-mid)]">
                          Signed in as
                        </p>
                        <p className="mt-0.5 truncate font-semibold text-[#600694]">
                          {user.email}
                        </p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setMenuUser(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#600694] hover:bg-[#600694]/10"
                        >
                          <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setMenuUser(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text-dark)] hover:bg-[#600694]/10"
                      >
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#600694]/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#600694] hover:bg-[#600694] hover:text-[var(--color-cream)] hover:border-[#600694] transition-all"
              >
                <User className="h-3.5 w-3.5" /> Login
              </Link>
            )}

            {/* Mobile burger */}
            <button
              type="button"
              className="lg:hidden grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#600694] hover:bg-[#600694]/10 transition-colors"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-[var(--color-cream)] lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5">
              <img src={logo} alt="" className="h-10 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full text-[#600694]"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-1 px-8 py-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 font-serif text-2xl sm:text-3xl text-[#600694]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-8 flex flex-col items-center gap-3"
              >
                {!user && (
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#600694] px-7 py-3 btn-label text-[var(--color-cream)]"
                  >
                    <User className="h-4 w-4" /> Login / Sign up
                  </Link>
                )}
                <Link
                  to="/events"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#600694] px-7 py-3 btn-label text-[#600694]"
                >
                  Join Free Satsang
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuUser(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-[#600694] px-7 py-3 btn-label text-white"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Admin
                  </Link>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}