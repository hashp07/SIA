import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  GraduationCap,
  CalendarDays,
  FileText,
  Tag,
  Plus,
  Pencil,
  Trash2,
  X,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Users,
  ShoppingBag,
  Search,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import {
  useCourses,
  useEvents,
  useBlogs,
  useCoupons,
  adminApi,
  formatPrice,
  priceToNumber,
  type Coupon,
} from "@/lib/admin-store";
import type { SIACourse, SIAEvent, BlogPost } from "@/lib/sia-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard · SIA" },
      { name: "description", content: "Manage SIA courses, events, blog posts and coupons." },
    ],
  }),
  component: AdminPage,
});

type Tab = "dashboard" | "courses" | "events" | "blogs" | "coupons";

function AdminPage() {
  const { user, isAdmin, hydrated } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !isAdmin) {
      navigate({ to: "/login" });
    }
  }, [hydrated, isAdmin, navigate]);

  if (!hydrated || !isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--color-cream)]">
        <p className="text-[var(--color-text-mid)]">Verifying access...</p>
      </div>
    );
  }

  const tabs: Array<{ id: Tab; label: string; icon: typeof LayoutDashboard }> = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Courses", icon: GraduationCap },
    { id: "events", label: "Events", icon: CalendarDays },
    { id: "blogs", label: "Blog Posts", icon: FileText },
    { id: "coupons", label: "Coupons", icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-cream)] pt-20">
      <div className="border-b border-[var(--color-purple)]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 lg:px-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <p className="btn-label text-[var(--color-gold-deep)]">Admin</p>
            <h1 className="font-serif text-3xl text-[var(--color-purple)]">Control Centre</h1>
            <p className="mt-1 text-sm text-[var(--color-text-mid)]">
              Welcome back, <span className="font-semibold text-[var(--color-purple)]">{user?.name}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                if (confirm("Reset all content to original seed data?")) adminApi.resetAll();
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-purple)]/20 bg-white px-4 py-2 text-xs font-semibold text-[var(--color-purple)] hover:bg-[var(--color-purple-pale)] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset Data
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-purple)] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[var(--color-cream)] hover:bg-[var(--color-purple-light)] transition-colors"
            >
              View Site →
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
                    active
                      ? "bg-gradient-brand text-white shadow-card"
                      : "text-[var(--color-text-dark)] hover:bg-[var(--color-purple-pale)]",
                  )}
                >
                  <Icon className="h-4 w-4" /> {t.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {tab === "dashboard" && <DashboardPanel />}
              {tab === "courses" && <CoursesPanel />}
              {tab === "events" && <EventsPanel />}
              {tab === "blogs" && <BlogsPanel />}
              {tab === "coupons" && <CouponsPanel />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* ================== DASHBOARD ================== */
function DashboardPanel() {
  const courses = useCourses();
  const events = useEvents();
  const blogs = useBlogs();
  const coupons = useCoupons();

  const stats = [
    { label: "Courses", value: courses.length, icon: GraduationCap, accent: "from-[var(--color-purple)] to-[var(--color-purple-light)]" },
    { label: "Events", value: events.length, icon: CalendarDays, accent: "from-[var(--color-gold-deep)] to-[var(--color-gold)]" },
    { label: "Blog Posts", value: blogs.length, icon: FileText, accent: "from-[var(--color-purple-light)] to-[var(--color-purple)]" },
    { label: "Coupons", value: coupons.filter((c) => c.active).length, icon: Tag, accent: "from-[var(--color-gold)] to-[var(--color-purple-light)]" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-white p-5 shadow-card">
              <div className={cn("inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br text-white", s.accent)}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-wider text-[var(--color-text-mid)]">{s.label}</p>
              <p className="mt-1 font-serif text-3xl text-[var(--color-purple)]">{s.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-card">
          <h3 className="font-serif text-xl text-[var(--color-purple)] flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[var(--color-gold-deep)]" /> Recent activity
          </h3>
          <ul className="mt-5 space-y-4 text-sm">
            {[
              { i: ShoppingBag, txt: `${courses.length} courses live across practices & scriptures` },
              { i: Users, txt: `${events.filter((e) => !e.past).length} upcoming events scheduled` },
              { i: FileText, txt: `${blogs.length} reflections published in the journal` },
              { i: Tag, txt: `${coupons.filter((c) => c.active).length} of ${coupons.length} coupons currently active` },
            ].map((row, i) => {
              const Icon = row.i;
              return (
                <li key={i} className="flex items-start gap-3">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-[var(--color-purple-pale)] text-[var(--color-purple)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <p className="text-[var(--color-text-dark)]">{row.txt}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl bg-gradient-brand p-6 text-white shadow-card-lifted">
          <Sparkles className="h-7 w-7" />
          <h3 className="mt-4 font-serif text-2xl">Quick actions</h3>
          <p className="mt-2 text-sm opacity-90">Add new content to keep the sangha nourished.</p>
          <div className="mt-6 grid gap-2 text-sm font-semibold">
            <span className="opacity-80">Use the tabs on the left to add or edit:</span>
            <span>· New courses</span>
            <span>· Webinars & retreats</span>
            <span>· Blog posts</span>
            <span>· Discount coupons</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================== COURSES ================== */
function CoursesPanel() {
  const courses = useCourses();
  const [editing, setEditing] = useState<SIACourse | null>(null);
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () => courses.filter((c) => c.title.toLowerCase().includes(search.toLowerCase())),
    [courses, search],
  );

  return (
    <PanelShell
      title="Manage Courses"
      onAdd={() =>
        setEditing({
          id: `c-${Date.now()}`,
          title: "",
          category: "practices",
          tag: "",
          description: "",
          duration: "",
          lessons: 0,
          price: "Free",
          rating: 5,
          image: "",
        })
      }
      search={search}
      setSearch={setSearch}
    >
      <ItemTable
        items={filtered}
        getKey={(c) => c.id}
        columns={[
          { label: "Course", render: (c) => <CellWithImage image={c.image} title={c.title} sub={c.category} /> },
          { label: "Tag", render: (c) => <span className="text-[var(--color-text-mid)]">{c.tag}</span> },
          { label: "Price", render: (c) => <span className="font-semibold text-[var(--color-purple)]">{c.price}</span> },
        ]}
        onEdit={(c) => setEditing(c)}
        onDelete={(c) => {
          if (confirm(`Delete "${c.title}"?`)) adminApi.deleteCourse(c.id);
        }}
      />

      <FormDrawer open={!!editing} onClose={() => setEditing(null)} title={editing?.title || "New course"}>
        {editing && (
          <CourseForm
            initial={editing}
            onSave={(c) => {
              adminApi.saveCourse(c);
              setEditing(null);
            }}
          />
        )}
      </FormDrawer>
    </PanelShell>
  );
}

function CourseForm({ initial, onSave }: { initial: SIACourse; onSave: (c: SIACourse) => void }) {
  const [c, setC] = useState(initial);
  return (
    <FormBody onSubmit={(e) => { e.preventDefault(); onSave(c); }}>
      <FormField label="Title" value={c.title} onChange={(v) => setC({ ...c, title: v })} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormSelect
          label="Category"
          value={c.category}
          onChange={(v) => setC({ ...c, category: v as SIACourse["category"] })}
          options={[
            { value: "practices", label: "Practices" },
            { value: "scriptures", label: "Scriptures" },
          ]}
        />
        <FormField label="Tag" value={c.tag} onChange={(v) => setC({ ...c, tag: v })} placeholder="e.g. Kundalini" />
      </div>
      <FormTextarea label="Description" value={c.description} onChange={(v) => setC({ ...c, description: v })} />
      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label="Duration" value={c.duration} onChange={(v) => setC({ ...c, duration: v })} placeholder="8 weeks" />
        <FormField label="Lessons" type="number" value={String(c.lessons)} onChange={(v) => setC({ ...c, lessons: Number(v) || 0 })} />
        <FormField label="Rating" type="number" value={String(c.rating)} onChange={(v) => setC({ ...c, rating: Number(v) || 5 })} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Price" value={c.price} onChange={(v) => setC({ ...c, price: v })} placeholder="$99 or Free" />
        <FormField label="Image URL" value={c.image} onChange={(v) => setC({ ...c, image: v })} placeholder="https://..." />
      </div>
    </FormBody>
  );
}

/* ================== EVENTS ================== */
function EventsPanel() {
  const events = useEvents();
  const [editing, setEditing] = useState<SIAEvent | null>(null);
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () => events.filter((e) => e.title.toLowerCase().includes(search.toLowerCase())),
    [events, search],
  );

  return (
    <PanelShell
      title="Manage Events"
      onAdd={() =>
        setEditing({
          id: `e-${Date.now()}`,
          title: "",
          type: "webinar",
          date: "",
          time: "",
          location: "Online",
          description: "",
          price: "FREE",
          image: "",
        })
      }
      search={search}
      setSearch={setSearch}
    >
      <ItemTable
        items={filtered}
        getKey={(e) => e.id}
        columns={[
          { label: "Event", render: (e) => <CellWithImage image={e.image} title={e.title} sub={e.type} /> },
          { label: "Date", render: (e) => <span className="text-[var(--color-text-mid)]">{e.date}</span> },
          { label: "Price", render: (e) => <span className="font-semibold text-[var(--color-purple)]">{e.price}</span> },
        ]}
        onEdit={(e) => setEditing(e)}
        onDelete={(e) => { if (confirm(`Delete "${e.title}"?`)) adminApi.deleteEvent(e.id); }}
      />

      <FormDrawer open={!!editing} onClose={() => setEditing(null)} title={editing?.title || "New event"}>
        {editing && (
          <EventForm
            initial={editing}
            onSave={(e) => {
              adminApi.saveEvent(e);
              setEditing(null);
            }}
          />
        )}
      </FormDrawer>
    </PanelShell>
  );
}

function EventForm({ initial, onSave }: { initial: SIAEvent; onSave: (e: SIAEvent) => void }) {
  const [e, setE] = useState(initial);
  return (
    <FormBody onSubmit={(ev) => { ev.preventDefault(); onSave(e); }}>
      <FormField label="Title" value={e.title} onChange={(v) => setE({ ...e, title: v })} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormSelect
          label="Type"
          value={e.type}
          onChange={(v) => setE({ ...e, type: v as SIAEvent["type"] })}
          options={[
            { value: "satsang", label: "Satsang (Free)" },
            { value: "webinar", label: "Webinar" },
            { value: "retreat", label: "Retreat" },
          ]}
        />
        <FormField label="Date" value={e.date} onChange={(v) => setE({ ...e, date: v })} placeholder="Apr 22, 2026" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Time" value={e.time} onChange={(v) => setE({ ...e, time: v })} placeholder="7:00 PM IST" />
        <FormField label="Location" value={e.location} onChange={(v) => setE({ ...e, location: v })} />
      </div>
      <FormTextarea label="Description" value={e.description} onChange={(v) => setE({ ...e, description: v })} />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Price" value={e.price} onChange={(v) => setE({ ...e, price: v })} placeholder="FREE or $24" />
        <FormField label="Image URL" value={e.image} onChange={(v) => setE({ ...e, image: v })} />
      </div>
      <label className="flex items-center gap-2 text-sm text-[var(--color-text-dark)]">
        <input
          type="checkbox"
          checked={!!e.past}
          onChange={(ev) => setE({ ...e, past: ev.target.checked })}
          className="h-4 w-4 accent-[var(--color-purple)]"
        />
        Mark as past event (recording)
      </label>
    </FormBody>
  );
}

/* ================== BLOGS ================== */
function BlogsPanel() {
  const blogs = useBlogs();
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () => blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase())),
    [blogs, search],
  );

  return (
    <PanelShell
      title="Manage Blog Posts"
      onAdd={() =>
        setEditing({
          slug: `post-${Date.now()}`,
          title: "",
          category: "Spirituality",
          excerpt: "",
          body: "## A new reflection\n\nWrite your essay here using markdown headings, paragraphs, and quotes.",
          author: "Jake Light",
          authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=200&h=200&q=80",
          date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
          readTime: "5 min read",
          image: "",
        })
      }
      search={search}
      setSearch={setSearch}
    >
      <ItemTable
        items={filtered}
        getKey={(b) => b.slug}
        columns={[
          { label: "Post", render: (b) => <CellWithImage image={b.image} title={b.title} sub={b.category} /> },
          { label: "Author", render: (b) => <span className="text-[var(--color-text-mid)]">{b.author}</span> },
          { label: "Date", render: (b) => <span className="text-[var(--color-text-mid)] text-xs">{b.date}</span> },
        ]}
        onEdit={(b) => setEditing(b)}
        onDelete={(b) => { if (confirm(`Delete "${b.title}"?`)) adminApi.deleteBlog(b.slug); }}
      />

      <FormDrawer open={!!editing} onClose={() => setEditing(null)} title={editing?.title || "New post"}>
        {editing && (
          <BlogForm initial={editing} onSave={(b) => { adminApi.saveBlog(b); setEditing(null); }} />
        )}
      </FormDrawer>
    </PanelShell>
  );
}

function BlogForm({ initial, onSave }: { initial: BlogPost; onSave: (b: BlogPost) => void }) {
  const [b, setB] = useState(initial);
  return (
    <FormBody onSubmit={(e) => { e.preventDefault(); onSave(b); }}>
      <FormField label="Title" value={b.title} onChange={(v) => setB({ ...b, title: v })} required />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Slug" value={b.slug} onChange={(v) => setB({ ...b, slug: v.replace(/\s+/g, "-").toLowerCase() })} required />
        <FormSelect
          label="Category"
          value={b.category}
          onChange={(v) => setB({ ...b, category: v })}
          options={[
            { value: "Spirituality", label: "Spirituality" },
            { value: "Vedic Wisdom", label: "Vedic Wisdom" },
            { value: "Yoga", label: "Yoga" },
            { value: "Meditation", label: "Meditation" },
            { value: "Personal Journey", label: "Personal Journey" },
          ]}
        />
      </div>
      <FormTextarea label="Excerpt" value={b.excerpt} onChange={(v) => setB({ ...b, excerpt: v })} />
      <FormTextarea label="Body (markdown)" value={b.body} onChange={(v) => setB({ ...b, body: v })} rows={10} />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Author" value={b.author} onChange={(v) => setB({ ...b, author: v })} />
        <FormField label="Read time" value={b.readTime} onChange={(v) => setB({ ...b, readTime: v })} placeholder="6 min read" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Date" value={b.date} onChange={(v) => setB({ ...b, date: v })} />
        <FormField label="Cover image URL" value={b.image} onChange={(v) => setB({ ...b, image: v })} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={!!b.featured} onChange={(e) => setB({ ...b, featured: e.target.checked })} className="h-4 w-4 accent-[var(--color-purple)]" />
        Featured post
      </label>
    </FormBody>
  );
}

/* ================== COUPONS ================== */
function CouponsPanel() {
  const coupons = useCoupons();
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [search, setSearch] = useState("");
  const filtered = useMemo(
    () => coupons.filter((c) => c.code.toLowerCase().includes(search.toLowerCase())),
    [coupons, search],
  );

  return (
    <PanelShell
      title="Manage Coupons"
      onAdd={() => setEditing({ code: "", percent: 10, active: true, description: "" })}
      search={search}
      setSearch={setSearch}
    >
      <ItemTable
        items={filtered}
        getKey={(c) => c.code}
        columns={[
          {
            label: "Code",
            render: (c) => (
              <span className="font-mono font-bold uppercase tracking-wider text-[var(--color-purple)]">
                {c.code}
              </span>
            ),
          },
          {
            label: "Discount",
            render: (c) => (
              <span className="rounded-full bg-[var(--color-gold)]/20 px-3 py-0.5 text-xs font-semibold text-[var(--color-text-dark)]">
                {c.percent}% off
              </span>
            ),
          },
          {
            label: "Status",
            render: (c) => (
              <span className={cn(
                "rounded-full px-3 py-0.5 text-xs font-semibold",
                c.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500",
              )}>
                {c.active ? "Active" : "Inactive"}
              </span>
            ),
          },
        ]}
        onEdit={(c) => setEditing({ ...c })}
        onDelete={(c) => { if (confirm(`Delete coupon "${c.code}"?`)) adminApi.deleteCoupon(c.code); }}
      />

      <FormDrawer open={!!editing} onClose={() => setEditing(null)} title={editing?.code || "New coupon"}>
        {editing && (
          <CouponForm initial={editing} onSave={(c) => { adminApi.saveCoupon(c); setEditing(null); }} />
        )}
      </FormDrawer>
    </PanelShell>
  );
}

function CouponForm({ initial, onSave }: { initial: Coupon; onSave: (c: Coupon) => void }) {
  const [c, setC] = useState(initial);
  return (
    <FormBody onSubmit={(e) => { e.preventDefault(); onSave({ ...c, code: c.code.trim().toUpperCase() }); }}>
      <FormField label="Code" value={c.code} onChange={(v) => setC({ ...c, code: v.toUpperCase() })} required placeholder="AWAKEN10" />
      <FormField
        label="Discount %"
        type="number"
        value={String(c.percent)}
        onChange={(v) => setC({ ...c, percent: Math.max(0, Math.min(100, Number(v) || 0)) })}
      />
      <FormField label="Description" value={c.description || ""} onChange={(v) => setC({ ...c, description: v })} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={c.active} onChange={(e) => setC({ ...c, active: e.target.checked })} className="h-4 w-4 accent-[var(--color-purple)]" />
        Active
      </label>
      {c.percent > 0 && (
        <p className="text-xs text-[var(--color-text-mid)]">
          Example: $100 course → {formatPrice(100 - (100 * c.percent) / 100)} after discount.
          {priceToNumber("$100") /* used to keep import */ && ""}
        </p>
      )}
    </FormBody>
  );
}

/* ================== SHARED PRIMITIVES ================== */
function PanelShell({
  title,
  onAdd,
  search,
  setSearch,
  children,
}: {
  title: string;
  onAdd: () => void;
  search: string;
  setSearch: (s: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white shadow-card overflow-hidden">
      <header className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between border-b border-[var(--color-purple)]/10 px-5 sm:px-6 py-5">
        <h2 className="font-serif text-2xl text-[var(--color-purple)]">{title}</h2>
        <div className="flex gap-2">
          <div className="flex flex-1 sm:flex-none items-center gap-2 rounded-full border border-[var(--color-purple)]/15 bg-[var(--color-cream)]/50 px-4 py-2 focus-within:border-[var(--color-purple)] transition-colors">
            <Search className="h-4 w-4 text-[var(--color-purple)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 sm:w-56 bg-transparent text-sm focus:outline-none"
            />
          </div>
          <button
            onClick={onAdd}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-brand px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-card hover:opacity-95"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}

function ItemTable<T>({
  items,
  getKey,
  columns,
  onEdit,
  onDelete,
}: {
  items: T[];
  getKey: (t: T) => string;
  columns: Array<{ label: string; render: (t: T) => React.ReactNode }>;
  onEdit: (t: T) => void;
  onDelete: (t: T) => void;
}) {
  if (items.length === 0) {
    return <p className="px-6 py-16 text-center text-sm text-[var(--color-text-mid)]">No items yet.</p>;
  }
  return (
    <div className="divide-y divide-[var(--color-purple)]/10">
      {items.map((it) => (
        <div key={getKey(it)} className="flex flex-col gap-3 px-5 sm:px-6 py-4 sm:flex-row sm:items-center">
          <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            {columns.map((col, i) => (
              <div key={i} className={cn(i === 0 ? "flex-1 min-w-0" : "flex-none text-sm")}>{col.render(it)}</div>
            ))}
          </div>
          <div className="flex gap-1 sm:ml-4">
            <button
              onClick={() => onEdit(it)}
              className="grid h-9 w-9 place-items-center rounded-lg text-[var(--color-purple)] hover:bg-[var(--color-purple-pale)]"
              aria-label="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(it)}
              className="grid h-9 w-9 place-items-center rounded-lg text-red-600 hover:bg-red-50"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function CellWithImage({ image, title, sub }: { image: string; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="h-12 w-12 flex-none overflow-hidden rounded-lg bg-[var(--color-purple-pale)]">
        {image && <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />}
      </div>
      <div className="min-w-0">
        <p className="truncate font-semibold text-[var(--color-text-dark)]">{title || "Untitled"}</p>
        <p className="text-[10px] uppercase tracking-wider text-[var(--color-text-mid)]">{sub}</p>
      </div>
    </div>
  );
}

function FormDrawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-xl flex-col bg-[var(--color-cream)] shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-[var(--color-purple)]/10 bg-white px-6 py-5">
              <h3 className="font-serif text-xl text-[var(--color-purple)] truncate pr-3">{title}</h3>
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-[var(--color-purple)] hover:bg-[var(--color-purple-pale)]">
                <X className="h-5 w-5" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto p-6">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function FormBody({ children, onSubmit }: { children: React.ReactNode; onSubmit: (e: React.FormEvent) => void }) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {children}
      <button
        type="submit"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 btn-label text-white shadow-card hover:opacity-95"
      >
        Save changes
      </button>
    </form>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-mid)]">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-[var(--color-purple)]/15 bg-white px-4 py-2.5 text-sm text-[var(--color-text-dark)] focus:border-[var(--color-purple)] focus:outline-none transition-colors"
      />
    </label>
  );
}

function FormTextarea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-mid)]">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-[var(--color-purple)]/15 bg-white px-4 py-2.5 text-sm text-[var(--color-text-dark)] leading-relaxed focus:border-[var(--color-purple)] focus:outline-none transition-colors"
      />
    </label>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider font-semibold text-[var(--color-text-mid)]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-[var(--color-purple)]/15 bg-white px-4 py-2.5 text-sm text-[var(--color-text-dark)] focus:border-[var(--color-purple)] focus:outline-none transition-colors"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
