"use client";
import { useState, useEffect, useRef } from "react";

/* ─── DATA ─────────────────────────────────────────────────────────── */
const NAV_LINKS = ["about", "skills", "projects", "certifications", "contact"];

const SKILLS = [
  {
    cat: "Frontend",
    icon: "⌨️",
    tags: ["JavaScript", "React", "React Native", "Expo", "Next.js", "Responsive Design"],
  },
  {
    cat: "Backend / DB",
    icon: "🗄️",
    tags: ["Firebase Auth", "Firebase Realtime DB", "SQL (basic)"],
  },
  {
    cat: "Tools & Infra",
    icon: "🔧",
    tags: ["Git", "GitHub", "VS Code", "Cisco Packet Tracer", "Vercel"],
  },
  {
    cat: "Programming",
    icon: "💡",
    tags: ["C++", "Java", "OOP", "Data Structures & Algorithms"],
  },
];

const PROJECTS = [
  {
    name: "ZaraiVerse",
    badge: "🌾 Featured · FYP",
    tag: "React Native · Firebase · Expo",
    year: "2024 – Present",
    desc: "A multi-role agricultural tech platform for Pakistani farmers. Built Farmer, Seller, and Expert dashboards with real-time Firebase sync. Led the team as Team Lead — delegated tasks, ran code reviews, and presented at Air University FYP Expo 2026.",
    features: [
      "3 role-based dashboards (Farmer, Seller, Expert)",
      "Firebase Realtime Database & Authentication",
      "Optimised UI for low-bandwidth rural users",
      "Presented at Air University FYP Expo 2026",
    ],
    github: "https://github.com/awaiszamir244-svg",
    accent: "#2d6a4f",
  },
  {
    name: "Ecommerce Website",
    badge: "🛒 Semester Project",
    tag: "Java · Web",
    year: "2024",
    desc: "A full-featured online store with product listings, cart functionality, and checkout flow. Built with MVC architecture, handling frontend-backend integration for dynamic product rendering.",
    features: [
      "Product listings with dynamic rendering",
      "Cart functionality & basic checkout flow",
      "MVC architecture (Java backend)",
      "Frontend-backend integration",
    ],
    github: "https://github.com/awaiszamir244-svg",
    accent: "#1b4332",
  },
  {
    name: "Ludo Game",
    badge: "🎲 Semester Project",
    tag: "C++",
    year: "2023",
    desc: "A console-based multiplayer Ludo game built in C++. Implements complete game logic, turn management, and win detection from scratch — a deep dive into OOP and algorithmic thinking.",
    features: [
      "Complete Ludo game logic in C++",
      "Multiplayer turn management system",
      "Win detection & game state tracking",
      "Applied OOP design patterns",
    ],
    github: "https://github.com/awaiszamir244-svg",
    accent: "#40916c",
  },
];

const CERTS = [
  {
    title: "PMI Essentials: Seven AI Project Patterns",
    org: "Project Management Institute",
    date: "Jun 2026",
    icon: "📋",
  },
  {
    title: "Talking to AI: Prompt Engineering for Project Managers",
    org: "Project Management Institute",
    date: "Jun 2026",
    icon: "🤖",
  },
  {
    title: "ChatGPT Prompt Engineering for Developers",
    org: "DeepLearning.AI",
    date: "2024",
    icon: "🧠",
  },
];

/* ─── TYPING HOOK ───────────────────────────────────────────────────── */
const ROLES = [
  "Frontend Developer",
  "React Native Engineer",
  "Full-Stack Intern Aspirant",
  "Team Lead @ ZaraiVerse",
];

function useTyping() {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    const speed = deleting ? 40 : done ? 100 : 80;
    const timer = setTimeout(() => {
      if (!deleting && !done) {
        if (text.length < role.length) {
          setText(role.slice(0, text.length + 1));
        } else {
          setDone(true);
        }
      } else if (done) {
        setTimeout(() => { setDone(false); setDeleting(true); }, 1800);
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, deleting, done, roleIdx]);

  return text;
}

/* ─── NAV ───────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(248,244,238,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #d8f3dc" : "none",
        transition: "all 0.3s ease",
        padding: "0 1.5rem",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span className="font-mono" style={{ fontSize: 13, color: "#2d6a4f", letterSpacing: "0.05em" }}>
          awais.dev
        </span>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none" }} className="hidden md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href={`#${l}`}
                className="font-mono"
                style={{ fontSize: 12, color: "#6b705c", textDecoration: "none", letterSpacing: "0.06em", textTransform: "lowercase", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#2d6a4f")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6b705c")}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5 }}
          className="flex md:hidden"
          aria-label="Menu"
        >
          {[0,1,2].map((i) => (
            <span key={i} style={{ width: 22, height: 2, background: "#2d6a4f", display: "block", borderRadius: 2 }} />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{ background: "rgba(248,244,238,0.98)", padding: "1rem 1.5rem", borderBottom: "1px solid #d8f3dc" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              onClick={() => setMenuOpen(false)}
              className="font-mono"
              style={{ display: "block", padding: "0.5rem 0", fontSize: 13, color: "#2d6a4f", textDecoration: "none", letterSpacing: "0.06em" }}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────────── */
function Hero() {
  const typed = useTyping();

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px 1.5rem 4rem",
        background: "linear-gradient(135deg, #f8f4ee 0%, #d8f3dc22 100%)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: -80, right: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #d8f3dc44 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, #52b78818 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        <div className="fade-up" style={{ marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 30, height: 1, background: "#52b788", display: "inline-block" }} />
          <span className="font-mono" style={{ fontSize: 12, color: "#52b788", letterSpacing: "0.1em" }}>
            AVAILABLE FOR INTERNSHIPS
          </span>
        </div>

        <h1
          className="font-display fade-up delay-1"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "0.5rem", color: "#0f1a15" }}
        >
          Raja Muhammad<br />
          <span style={{ color: "#2d6a4f" }}>Awais Zamir</span>
        </h1>

        {/* Terminal typing */}
        <div
          className="fade-up delay-2 font-mono"
          style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            background: "#0f1a15", color: "#52b788",
            padding: "8px 16px", borderRadius: 6, fontSize: "clamp(13px, 2vw, 15px)",
            marginBottom: "1.5rem", marginTop: "0.25rem",
          }}
        >
          <span style={{ color: "#52b78877" }}>$ </span>
          <span>{typed}</span>
          <span className="cursor" style={{ color: "#52b788" }}>▋</span>
        </div>

        <p
          className="fade-up delay-3"
          style={{ fontSize: 15, color: "#6b705c", lineHeight: 1.85, maxWidth: 500, marginBottom: "2rem" }}
        >
          Final-year Software Engineering student at Air University, Islamabad.
          Building responsive, accessible interfaces that solve real problems.
          Currently leading <strong style={{ color: "#2d6a4f" }}>ZaraiVerse</strong> — an agricultural tech platform for Pakistan's farmers.
        </p>

        <div className="fade-up delay-4" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "2.5rem" }}>
          <a
            href="#projects"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", background: "#2d6a4f", color: "#fff",
              borderRadius: 6, textDecoration: "none", fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "#1b4332"; el.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "#2d6a4f"; el.style.transform = "translateY(0)"; }}
          >
            View My Work →
          </a>
          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 24px", border: "1px solid #2d6a4f", color: "#2d6a4f",
              borderRadius: 6, textDecoration: "none", fontSize: 13,
              fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "#2d6a4f"; el.style.color = "#fff"; }}
            onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "#2d6a4f"; }}
          >
            Get In Touch
          </a>
        </div>

        {/* Status card */}
        <div
          className="fade-up delay-5"
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#fff", border: "1px solid #d8f3dc",
            borderRadius: 8, padding: "10px 16px",
            boxShadow: "0 4px 20px rgba(45,106,79,0.07)",
          }}
        >
          <span className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#52b788", display: "inline-block" }} />
          <span className="font-mono" style={{ fontSize: 12, color: "#2d6a4f" }}>Open to frontend &amp; full-stack internships</span>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────────────── */
function About() {
  const cards = [
    { label: "University", value: "Air University, Islamabad" },
    { label: "Degree", value: "BS Software Engineering" },
    { label: "Year", value: "Final Year (2022–2026)" },
    { label: "Based In", value: "Islamabad, Pakistan 🇵🇰" },
  ];

  return (
    <section id="about" style={{ padding: "5rem 1.5rem", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div className="font-mono" style={{ fontSize: 11, color: "#52b788", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
            Who I am <span style={{ flex: 1, maxWidth: 60, height: 1, background: "#52b788", display: "inline-block" }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, color: "#0f1a15" }}>About Me</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 15, color: "#6b705c", lineHeight: 1.9, marginBottom: "1rem" }}>
              I'm <strong style={{ color: "#0f1a15" }}>Raja Muhammad Awais Zamir</strong>, a final-year Software Engineering student at Air University, Islamabad. I'm passionate about building responsive, accessible interfaces that create real-world impact.
            </p>
            <p style={{ fontSize: 15, color: "#6b705c", lineHeight: 1.9, marginBottom: "1rem" }}>
              As Team Lead on <strong style={{ color: "#2d6a4f" }}>ZaraiVerse</strong>, I architected and built a multi-role React Native platform from the ground up — integrating Firebase, leading code reviews, and presenting at Air University's FYP Expo.
            </p>
            <p style={{ fontSize: 15, color: "#6b705c", lineHeight: 1.9 }}>
              I believe good software should solve real problems for real people. Seeking frontend or full-stack internship opportunities to grow and contribute.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {cards.map((c) => (
              <div
                key={c.label}
                style={{
                  background: "#f8f4ee", borderRadius: 10, padding: "1.1rem",
                  borderLeft: "3px solid #52b788",
                }}
              >
                <div className="font-mono" style={{ fontSize: 10, color: "#6b705c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f1a15" }}>{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ────────────────────────────────────────────────────────── */
function Skills() {
  return (
    <section id="skills" style={{ padding: "5rem 1.5rem", background: "#f8f4ee" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div className="font-mono" style={{ fontSize: 11, color: "#52b788", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
            What I know <span style={{ flex: 1, maxWidth: 60, height: 1, background: "#52b788", display: "inline-block" }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, color: "#0f1a15" }}>Skills &amp; Tools</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem" }}>
          {SKILLS.map((s) => (
            <div
              key={s.cat}
              style={{
                background: "#fff", border: "1px solid #d8f3dc",
                borderRadius: 12, padding: "1.5rem",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.boxShadow = "0 12px 40px rgba(45,106,79,0.1)"; el.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span className="font-mono" style={{ fontSize: 12, color: "#2d6a4f", letterSpacing: "0.06em" }}>{s.cat}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono"
                    style={{ fontSize: 11, padding: "4px 10px", borderRadius: 20, background: "#d8f3dc", color: "#2d6a4f", border: "1px solid #b7e4c7" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ──────────────────────────────────────────────────────── */
function Projects() {
  const [active, setActive] = useState(0);
  const proj = PROJECTS[active];

  return (
    <section id="projects" style={{ padding: "5rem 1.5rem", background: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div className="font-mono" style={{ fontSize: 11, color: "#52b788", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
            What I built <span style={{ flex: 1, maxWidth: 60, height: 1, background: "#52b788", display: "inline-block" }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, color: "#0f1a15" }}>Projects</h2>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 10, marginBottom: "2rem", flexWrap: "wrap" }}>
          {PROJECTS.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActive(i)}
              className="font-mono"
              style={{
                padding: "8px 18px", borderRadius: 6, fontSize: 12, cursor: "pointer",
                border: active === i ? "none" : "1px solid #d8f3dc",
                background: active === i ? "#2d6a4f" : "transparent",
                color: active === i ? "#fff" : "#6b705c",
                transition: "all 0.2s",
              }}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Project detail */}
        <div
          key={active}
          style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem", alignItems: "start",
            animation: "fadeUp 0.4s ease both",
          }}
        >
          {/* Left */}
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#d8f3dc", color: "#2d6a4f", fontSize: 11, padding: "5px 12px", borderRadius: 20, marginBottom: "1rem" }} className="font-mono">
              {proj.badge}
            </span>
            <h3 className="font-display" style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 700, color: "#0f1a15", marginBottom: "0.5rem", lineHeight: 1.2 }}>
              {proj.name}
            </h3>
            <p className="font-mono" style={{ fontSize: 12, color: "#52b788", marginBottom: "1rem" }}>{proj.tag} · {proj.year}</p>
            <p style={{ fontSize: 15, color: "#6b705c", lineHeight: 1.85, marginBottom: "1.5rem" }}>{proj.desc}</p>

            <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
              {proj.features.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#6b705c", padding: "8px 0", borderBottom: "1px solid #f0ece6" }}>
                  <span style={{ color: "#52b788", fontWeight: 700, marginTop: 2 }}>→</span>
                  {f}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: 10 }}>
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 20px", background: "#2d6a4f", color: "#fff",
                  borderRadius: 6, textDecoration: "none", fontSize: 12,
                  fontFamily: "'JetBrains Mono', monospace", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget).style.background = "#1b4332"; }}
                onMouseLeave={(e) => { (e.currentTarget).style.background = "#2d6a4f"; }}
              >
                GitHub →
              </a>
            </div>
          </div>

          {/* Right — code-style card */}
          <div
            style={{
              background: "#0f1a15", borderRadius: 16, padding: "1.5rem",
              boxShadow: "0 30px 80px rgba(15,26,21,0.2)",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
            }}
          >
            <div style={{ display: "flex", gap: 6, marginBottom: "1rem" }}>
              {["#ff5f57","#febc2e","#28c840"].map((c) => (
                <span key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "inline-block" }} />
              ))}
            </div>
            <p style={{ color: "#52b78888", marginBottom: 4 }}>// project info</p>
            <p style={{ color: "#d8f3dc" }}>const <span style={{ color: "#52b788" }}>project</span> = {"{"}</p>
            <div style={{ paddingLeft: "1rem" }}>
              <p><span style={{ color: "#52b78899" }}>name</span>: <span style={{ color: "#b7e4c7" }}>"{proj.name}"</span>,</p>
              <p><span style={{ color: "#52b78899" }}>stack</span>: <span style={{ color: "#b7e4c7" }}>"{proj.tag}"</span>,</p>
              <p><span style={{ color: "#52b78899" }}>year</span>: <span style={{ color: "#b7e4c7" }}>"{proj.year}"</span>,</p>
              <p><span style={{ color: "#52b78899" }}>role</span>: <span style={{ color: "#b7e4c7" }}>{proj.name === "ZaraiVerse" ? '"Team Lead"' : '"Developer"'}</span>,</p>
              <p><span style={{ color: "#52b78899" }}>status</span>: <span style={{ color: "#52b788" }}>{proj.name === "ZaraiVerse" ? '"active 🟢"' : '"completed ✅"'}</span>,</p>
            </div>
            <p style={{ color: "#d8f3dc" }}>{"}"}</p>
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#1a2e22", borderRadius: 8 }}>
              <p style={{ color: "#52b78888" }}>// features</p>
              {proj.features.map((f, i) => (
                <p key={i} style={{ color: "#b7e4c7" }}>✓ <span style={{ color: "#d8f3dc88" }}>{f}</span></p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CERTIFICATIONS ────────────────────────────────────────────────── */
function Certifications() {
  return (
    <section id="certifications" style={{ padding: "5rem 1.5rem", background: "#f8f4ee" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <div className="font-mono" style={{ fontSize: 11, color: "#52b788", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
            Credentials <span style={{ flex: 1, maxWidth: 60, height: 1, background: "#52b788", display: "inline-block" }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, color: "#0f1a15" }}>Certifications</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {CERTS.map((c) => (
            <div
              key={c.title}
              style={{
                background: "#fff", border: "1px solid #d8f3dc",
                borderRadius: 12, padding: "1.5rem",
                display: "flex", gap: "1rem", alignItems: "flex-start",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.boxShadow = "0 12px 40px rgba(45,106,79,0.1)"; el.style.transform = "translateY(-3px)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.boxShadow = "none"; el.style.transform = "translateY(0)"; }}
            >
              <span style={{ fontSize: 28, flexShrink: 0 }}>{c.icon}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#0f1a15", marginBottom: 4, lineHeight: 1.4 }}>{c.title}</p>
                <p className="font-mono" style={{ fontSize: 11, color: "#52b788", marginBottom: 4 }}>{c.org}</p>
                <p className="font-mono" style={{ fontSize: 11, color: "#6b705c" }}>{c.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement */}
        <div style={{ marginTop: "3rem" }}>
          <div className="font-mono" style={{ fontSize: 11, color: "#52b788", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 10 }}>
            Achievement <span style={{ flex: 1, maxWidth: 60, height: 1, background: "#52b788", display: "inline-block" }} />
          </div>
          <div
            style={{
              background: "#0f1a15", borderRadius: 12, padding: "1.5rem 2rem",
              display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 36 }}>🏛️</span>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#d8f3dc", marginBottom: 4 }}>FYP Expo 2026 — Air University, Islamabad</p>
              <p style={{ fontSize: 14, color: "#52b788" }}>Presented ZaraiVerse to a panel of faculty and industry evaluators at the university's annual Final Year Project Expo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ───────────────────────────────────────────────────────── */
function Contact() {
  const links = [
    { icon: "✉️", label: "Email", value: "awaiszamir244@gmail.com", href: "mailto:awaiszamir244@gmail.com" },
    { icon: "📞", label: "Phone", value: "0347-2432546", href: "tel:+923472432546" },
    { icon: "💻", label: "GitHub", value: "awaiszamir244-svg", href: "https://github.com/awaiszamir244-svg" },
    { icon: "🔗", label: "LinkedIn", value: "awais-zamir", href: "https://www.linkedin.com/in/awais-zamir/" },
  ];

  return (
    <section id="contact" style={{ padding: "5rem 1.5rem", background: "#0f1a15" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: "1rem" }}>
          <div className="font-mono" style={{ fontSize: 11, color: "#52b78888", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
            Let&apos;s connect <span style={{ flex: 1, maxWidth: 60, height: 1, background: "#52b78888", display: "inline-block" }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700, color: "#fff" }}>Get In Touch</h2>
        </div>

        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem", maxWidth: 480 }}>
          I&apos;m actively looking for frontend and full-stack internship opportunities. Feel free to reach out — I&apos;d love to connect!
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "1.5rem", textAlign: "center",
                textDecoration: "none", transition: "all 0.2s",
                display: "block",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = "rgba(82,183,136,0.1)"; el.style.borderColor = "#52b788"; }}
              onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = "rgba(255,255,255,0.04)"; el.style.borderColor = "rgba(255,255,255,0.08)"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{l.icon}</div>
              <div className="font-mono" style={{ fontSize: 11, color: "#52b788", marginBottom: 4 }}>{l.label}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{l.value}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#0f1a15", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem", textAlign: "center" }}>
      <p className="font-mono" style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
        © 2026 Raja Muhammad Awais Zamir · Built with Next.js 🌾
      </p>
    </footer>
  );
}

/* ─── PAGE ──────────────────────────────────────────────────────────── */
export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
