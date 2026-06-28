import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  BarChart2,
  Eye,
  MousePointerClick,
  CheckCircle2,
  Globe,
} from "lucide-react";

/* ─── Visuals ──────────────────────────────────────────────────────────────── */

function SocialVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 px-5 py-8">
      <div className="relative h-[380px] w-[175px] shrink-0 rounded-[2rem] border-[8px] border-foreground bg-background shadow-2xl overflow-hidden">
        <div className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-foreground" />
        <div className="flex gap-1.5 px-3 pt-6 pb-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`h-7 w-7 rounded-full border-2 ${i === 0 ? "border-accent-brand" : "border-muted"} bg-muted shrink-0`} />
          ))}
        </div>
        <div className="flex flex-col gap-2.5 px-2 overflow-hidden">
          {[
            { likes: "1.2k", color: "bg-accent-brand/20", Icon: TrendingUp },
            { likes: "847", color: "bg-secondary", Icon: Eye },
          ].map((post, i) => (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
              <div className={`h-20 w-full ${post.color} flex items-center justify-center`}>
                <post.Icon className="h-6 w-6 text-accent-brand/60" />
              </div>
              <div className="px-2.5 py-2">
                <div className="flex items-center gap-2.5 text-foreground/80">
                  <Heart className="h-3 w-3" />
                  <span className="text-[9px] font-normal">{post.likes}</span>
                  <MessageCircle className="h-3 w-3" />
                  <Share2 className="h-3 w-3 ml-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 flex-1">
        {[
          { icon: TrendingUp, label: "Alcance", value: "+312%", color: "text-accent-brand" },
          { icon: Eye, label: "Vistas", value: "48.2k", color: "text-foreground" },
          { icon: MousePointerClick, label: "Stalks", value: "1.8k", color: "text-foreground" },
          { icon: BarChart2, label: "Crecimiento", value: "6.4%", color: "text-accent-brand" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-card px-3 py-2.5 flex items-center gap-2.5">
            <m.icon className={`h-4 w-4 shrink-0 ${m.color}`} />
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-normal text-muted-foreground truncate">{m.label}</span>
              <span className={`text-sm font-normal leading-none ${m.color}`}>{m.value}</span>
            </div>
          </div>
        ))}
        <div className="rounded-xl border border-border bg-card px-3 py-2.5 space-y-1.5">
          {["horarios programados", "100% personalizado", "últimas tendencias"].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-accent-brand shrink-0" />
              <span className="text-[9px] font-normal text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrandVisual() {
  const logos = [
    { label: "Imagotipo", name: "Alma", accent: "A", bg: "bg-card" },
    { label: "Logotipo", name: "Prisma", accent: "P", bg: "bg-secondary" },
    { label: "Isotipo", name: "Orbit", accent: "O", bg: "bg-accent-brand/15" },
    { label: "Monograma", name: "Glow", accent: "GL", bg: "bg-foreground" },
  ];

  return (
    <div className="relative flex h-full w-full flex-col gap-3 px-6 py-8 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px"
        }}
      />

      <div className="grid grid-cols-2 gap-3 flex-1">
        {logos.map((logo, i) => (
          <div key={logo.name} className={`rounded-2xl border border-border ${logo.bg} p-4 shadow-sm flex flex-col justify-between transition-transform hover:scale-[1.02]`}>
            <span className="text-[8px] uppercase tracking-[0.25em] text-muted-foreground">
              {logo.label}
            </span>

            <div className="flex flex-1 items-center justify-center">
              <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${i === 3 ? "border border-white/20 text-background" : "bg-accent-brand text-accent-brand-foreground"}`}>
                <span className="text-xl font-normal">{logo.accent}</span>
              </div>
            </div>

            <span className={`text-center text-sm tracking-tight ${i === 3 ? "text-background" : "text-foreground"}`}>
              {logo.name}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-1.5 rounded-xl border border-border bg-card p-2 shadow-sm">
        {["bg-accent-brand", "bg-foreground", "bg-muted-foreground", "bg-secondary", "bg-background"].map((c, i) => (
          <div key={i} className={`h-6 rounded ${c} ${i === 4 ? "border border-border" : ""}`} />
        ))}
      </div>
    </div>
  );
}

function WebsiteVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-3 px-5 py-8">
      {/* Desktop browser */}
      <div className="flex-1 max-w-[300px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-accent-brand/70" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
          <div className="ml-3 flex h-4 flex-1 items-center rounded bg-background px-2 gap-1">
            <Globe className="h-2.5 w-2.5 text-muted-foreground shrink-0" />
            <div className="h-1 w-16 rounded bg-muted" />
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-border/50 px-3 py-2 bg-background">
          <div className="h-2 w-8 rounded bg-foreground/80" />
          <div className="flex gap-1.5">
            <div className="h-1.5 w-5 rounded bg-muted" />
            <div className="h-1.5 w-5 rounded bg-muted" />
            <div className="h-1.5 w-5 rounded bg-muted" />
          </div>
          <div className="h-4 w-10 rounded-full bg-accent-brand" />
        </div>
        <div className="bg-gradient-to-br from-secondary/40 to-accent-brand/5 px-4 py-4 space-y-1.5">
          <div className="h-3 w-3/5 rounded bg-foreground/80" />
          <div className="h-2 w-4/5 rounded bg-foreground/50" />
          <div className="h-1.5 w-2/3 rounded bg-muted" />
          <div className="h-6 w-20 rounded bg-accent-brand mt-2" />
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded border border-border bg-background p-1.5 space-y-1">
              <div className="h-3 w-3 rounded bg-accent-brand/40" />
              <div className="h-1 w-full rounded bg-muted" />
              <div className="h-1 w-2/3 rounded bg-muted" />
            </div>
          ))}
        </div>
        <div className="h-4 bg-foreground/90 flex items-center justify-center">
          <div className="h-1 w-16 rounded bg-background/40" />
        </div>
      </div>

      {/* Phone catalog */}
      <div className="relative h-[300px] w-[140px] shrink-0 rounded-[1.5rem] border-[6px] border-foreground bg-background shadow-2xl overflow-hidden">
        <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-foreground z-10" />
        <div className="flex items-center justify-between px-2.5 pt-5 pb-2 border-b border-border">
          <div className="h-2 w-8 rounded bg-foreground/80" />
          <div className="h-3 w-3 rounded bg-muted" />
        </div>
        <div className="grid grid-cols-2 gap-1.5 p-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded border border-border bg-background overflow-hidden">
              <div className={`aspect-square ${i % 2 === 0 ? "bg-accent-brand/15" : "bg-muted"}`} />
              <div className="p-1 space-y-0.5">
                <div className="h-1 w-full rounded bg-muted" />
                <div className="h-1.5 w-2/3 rounded bg-accent-brand/60" />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-2 left-2 right-2 h-6 rounded-full flex items-center justify-center gap-1 bg-[#25D366]/15 border border-[#25D366]/40">
          <MessageCircle className="h-2.5 w-2.5 text-[#25D366]" />
          <div className="h-1 w-12 rounded bg-[#25D366]/50" />
        </div>
      </div>
    </div>
  );
}

function TextOrnament({ number }: { number: string }) {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24" style={{ color: "oklch(0.56 0.085 128 / 0.3)" }} aria-hidden="true">
      <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
      <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontSize="42"
        fontWeight="400"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        fontFamily="'Playfair Display', Georgia, serif"
      >
        {number}
      </text>
      {[
        { x: 100, y: 20, s: 0.6 },
        { x: 15, y: 95, s: 0.8 },
        { x: 105, y: 100, s: 0.5 },
      ].map((p, i) => (
        <path
          key={i}
          d={`M ${p.x} ${p.y - 6 * p.s} L ${p.x + 1.5 * p.s} ${p.y - 1.5 * p.s} L ${p.x + 6 * p.s} ${p.y} L ${p.x + 1.5 * p.s} ${p.y + 1.5 * p.s} L ${p.x} ${p.y + 6 * p.s} L ${p.x - 1.5 * p.s} ${p.y + 1.5 * p.s} L ${p.x - 6 * p.s} ${p.y} L ${p.x - 1.5 * p.s} ${p.y - 1.5 * p.s} Z`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

/* ─── Data ────────────────────────────────────────────────────────────────── */

const services = [
  {
    number: "01",
    title: "Gestión de Redes",
    description:
      "Estrategia, contenido y publicación constante para que tus redes vendan mientras tú atiendes tu negocio.",
    tag: "Social Media",
    Visual: SocialVisual,
  },
  {
    number: "02",
    title: "Diseño de Marca",
    description:
      "Logotipo, imagotipo, paleta y tipografía. Una identidad visual coherente que tu cliente recuerde y reconozca.",
    tag: "Branding",
    Visual: BrandVisual,
  },
  {
    number: "03",
    title: "Sitios Web",
    description:
      "Sitios personalizados, modernos y conectados a las herramientas que necesites para que tus clientes interactúen con tus servicios.",
    tag: "Desarrollo",
    Visual: WebsiteVisual,
  },
];

/* ─── Mobile card ─────────────────────────────────────────────────────────── */

function MobileServiceCard({ service }: { service: (typeof services)[number] }) {
  const Visual = service.Visual;
  return (
    <article
      className="overflow-hidden rounded-3xl border shadow-xl"
      style={{ borderColor: "oklch(0.89 0.018 95)" }}
    >
      {/* Visual arriba — caja con overflow controlado y mockup escalado para
          que el teléfono nunca se recorte de forma fea. */}
      <div
        className="relative w-full overflow-hidden border-b"
        style={{
          height: "300px",
          borderColor: "oklch(0.89 0.018 95)",
          backgroundColor: "oklch(0.972 0.013 92)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ transform: "scale(0.78)", transformOrigin: "center" }}
        >
          <Visual />
        </div>
      </div>

      {/* Texto abajo */}
      <div className="relative flex flex-col gap-4 p-6 bg-background overflow-hidden">
        {/* Ornament de fondo */}
        <div className="absolute -right-4 -bottom-4 opacity-80 pointer-events-none">
          <TextOrnament number={service.number} />
        </div>

        <div className="relative flex items-center justify-between">
          <span
            className="text-sm font-normal"
            style={{ color: "oklch(0.50 0.022 120)", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {service.number} / 03
          </span>
          <span
            className="rounded-full px-3 py-1 text-[10px] font-normal uppercase tracking-wider"
            style={{
              border: "1px solid oklch(0.89 0.018 95)",
              color: "oklch(0.50 0.022 120)",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            {service.tag}
          </span>
        </div>

        <div className="relative">
          <h3
            className="text-2xl font-normal tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {service.title}
          </h3>
          <p
            className="mt-3 text-sm font-normal leading-[1.85]"
            style={{ color: "oklch(0.50 0.022 120)", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {service.description}
          </p>
        </div>

        <div className="relative h-px w-12 rounded-full" style={{ backgroundColor: "oklch(0.56 0.085 128)" }} />
      </div>
    </article>
  );
}

/* ─── Section ──────────────────────────────────────────────────────────────── */

export function ServicesScroll() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const SCROLL_HEIGHT = "400vh";
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  /* ── MÓVIL: stack vertical sin scroll horizontal ── */
  if (isMobile) {
    return (
      <section id="servicios" className="relative overflow-hidden bg-background py-16 px-5">
        {/* Decoración geométrica de fondo */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute rounded-full border"
            style={{ top: "4%", right: "-12%", width: "60vw", aspectRatio: "1", borderColor: "oklch(0.56 0.085 128 / 0.14)" }}
          />
          <div
            className="absolute"
            style={{ bottom: "8%", left: "-8%", width: "40vw", aspectRatio: "1", backgroundColor: "oklch(0.62 0.12 48 / 0.07)", borderRadius: "40% 60% 60% 40% / 50% 40% 60% 50%" }}
          />
        </div>

        {/* Header */}
        <div className="relative mb-10">
          <span
            className="text-[10px] font-normal uppercase tracking-[0.28em]"
            style={{ color: "oklch(0.56 0.085 128)", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Nuestros servicios
          </span>
          <h2
            className="mt-3 text-4xl font-normal tracking-tight text-foreground"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Tres escalones para{" "}
            <span style={{ color: "oklch(0.56 0.085 128)" }}>crecer.</span>
          </h2>
        </div>

        {/* Cards apiladas */}
        <div className="relative flex flex-col gap-6">
          {services.map((service) => (
            <MobileServiceCard key={service.number} service={service} />
          ))}
        </div>
      </section>
    );
  }

  /* ── DESKTOP: experiencia horizontal con scroll original ── */
  return (
    <section
      id="servicios"
      ref={containerRef}
      className="relative bg-background"
      style={{ height: SCROLL_HEIGHT }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-8 md:px-12 lg:px-16 pt-16 md:pt-20">
          <span
            className="text-[10px] font-normal uppercase tracking-[0.28em]"
            style={{ color: "oklch(0.56 0.085 128)", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Nuestros servicios
          </span>
          <h2
            className="mt-3 max-w-2xl text-4xl font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Tres escalones para <span style={{ color: "oklch(0.56 0.085 128)" }}>crecer.</span>
          </h2>
        </div>

        <div className="flex flex-1 items-center">
          <motion.div style={{ x }} className="flex gap-6 px-8 md:gap-10 md:px-12 lg:px-16">
            {services.map((service) => {
              const Visual = service.Visual;
              return (
                <article
                  key={service.number}
                  className="flex h-[60vh] w-[85vw] shrink-0 overflow-hidden rounded-3xl border shadow-xl md:h-[65vh] md:w-[80vw]"
                  style={{ borderColor: "oklch(0.89 0.018 95)" }}
                >
                  {/* Left: text */}
                  <div className="relative flex w-1/2 flex-col justify-between p-8 md:p-12 overflow-hidden bg-background">
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='78' viewBox='0 0 90 78'%3E%3Cpath d='M22.5 2L67.5 2L88 39L67.5 76L22.5 76L2 39Z' fill='none' stroke='%23d6b36a' stroke-width='1' stroke-opacity='0.5'/%3E%3C/svg%3E")`,
                        backgroundSize: "90px 78px"
                      }}
                    > </div>
                    <div className="absolute -right-6 -bottom-6 opacity-90 pointer-events-none">
                      <TextOrnament number={service.number} />
                    </div>

                    <div className="relative flex items-center justify-between">
                      <span
                        className="text-sm font-normal"
                        style={{ color: "oklch(0.50 0.022 120)", fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {service.number} / 03
                      </span>
                      <span
                        className="rounded-full px-3 py-1 text-[10px] font-normal uppercase tracking-wider"
                        style={{
                          border: "1px solid oklch(0.89 0.018 95)",
                          color: "oklch(0.50 0.022 120)",
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        {service.tag}
                      </span>
                    </div>

                    <div className="relative">
                      <h3
                        className="text-3xl font-normal tracking-tight text-foreground md:text-5xl"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {service.title}
                      </h3>
                      <p
                        className="mt-4 max-w-sm text-sm font-normal leading-[1.85]"
                        style={{ color: "oklch(0.50 0.022 120)", fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {service.description}
                      </p>
                    </div>

                    <div className="relative h-px w-12 rounded-full" style={{ backgroundColor: "oklch(0.56 0.085 128)" }} />
                  </div>

                  {/* Right: visual */}
                  <div className="relative w-1/2 border-l" style={{ borderColor: "oklch(0.89 0.018 95)", backgroundColor: "oklch(0.972 0.013 92)" }}>
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, currentColor 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <Visual />
                  </div>
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
