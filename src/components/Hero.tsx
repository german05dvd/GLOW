import { lazy, Suspense, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Kept as stub to avoid module-not-found build errors
const HeroScene = lazy(() =>
  import("./HeroScene").then((m) => ({ default: m.HeroScene }))
);

const WORDS = [
  { text: " y posicionamiento.", hold: 3200 },
  { text: " visual.",            hold: 2400 },
  { text: " digital.",           hold: 2400 },
  { text: " y presencia.",       hold: 2400 },
];

const FONT_DISPLAY = "'Cormorant Garamond', Georgia, serif";
// Verde oliva activo — accent-brand
const ACCENT = "oklch(0.50 0.085 142)";
// Verde salvia profundo — primary
const PRIMARY = "oklch(0.35 0.076 148)";

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top: y, behavior: "smooth" });
}

function measureText(text: string, fontSize: number): number {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;
  ctx.font = `italic 400 ${fontSize}px 'Cormorant Garamond'`;
  return ctx.measureText(text).width;
}

export function Hero() {
  const isMobile = useIsMobile();
  const typedRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const rafRef   = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms: number) =>
      new Promise<void>((r) => {
        const id = setTimeout(r, ms);
        void id;
      });

    async function typeWord(word: { text: string; hold: number }) {
      const el = typedRef.current;
      if (!el || cancelled) return;

      el.style.borderRight = `2px solid ${ACCENT}`;
      el.style.transition   = "none";
      el.style.width        = "0px";
      el.textContent        = word.text;

      await sleep(30);
      if (cancelled) return;

      const targetW = Math.min(measureText(word.text, 54) + 6, 520);
      const dur     = word.text.length * 42;
      el.style.transition = `width ${dur}ms steps(${word.text.length}, end)`;
      el.style.width      = `${targetW}px`;

      await sleep(dur + word.hold);
    }

    async function eraseWord(text: string) {
      const el = typedRef.current;
      if (!el || cancelled) return;

      const steps = text.length;
      const dur   = steps * 28;
      el.style.transition = `width ${dur}ms steps(${steps}, end)`;
      el.style.width      = "0px";

      await sleep(dur + 80);
    }

    async function cycle() {
      await sleep(1000);
      while (!cancelled) {
        const word = WORDS[indexRef.current % WORDS.length];
        await typeWord(word);
        if (cancelled) break;
        await eraseWord(word.text);
        indexRef.current++;
      }
    }

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(cycle);
    } else {
      cycle();
    }

    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">

      {/* HeroScene stub — no visual output, kept for build compat */}
      <div style={{ display: "none" }} aria-hidden="true">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Background watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute leading-none"
        style={{
          fontFamily: FONT_DISPLAY,
          fontSize: isMobile ? "clamp(100px, 28vw, 200px)" : "clamp(220px, 32vw, 520px)",
          fontWeight: 400,
          color: "oklch(0.35 0.076 148 / 0.055)",
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          top: isMobile ? "18%" : "30%",
          left: isMobile ? "50%" : "34%",
          transform: isMobile ? "translate(-50%, -35%)" : "translateY(-35%)",
        }}
      >
        glow
      </div>

      {/* Main content */}
      <div
        className="relative z-10 flex min-h-screen flex-col justify-center px-12 sm:px-20 md:px-28 lg:px-36 pb-24"
        style={{ paddingTop: "calc(52px + 8vh)" }}
      >

        {/* Eyebrow */}
        <div
          className="mb-7 flex items-center gap-3"
          style={{ animation: "hero-fade-up 0.6s ease 0.2s both" }}
        >
          <span
            className="h-px w-6 flex-none"
            style={{ backgroundColor: ACCENT }}
          />
          <span
            className="text-[10px] font-normal tracking-[0.28em] uppercase"
            style={{ color: ACCENT, fontFamily: FONT_DISPLAY }}
          >
            Identidad · Posicionamiento · La Habana
          </span>
        </div>

        {/* Headline */}
        <div className="mb-8">
          {/* Row 1 */}
          <div
            className="overflow-hidden"
            style={{ animation: "hero-fade-up 0.7s ease 0.4s both" }}
          >
            <p
              className="font-normal leading-[1.05] tracking-tight text-foreground"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(2.6rem, 5.5vw, 4rem)",
                fontWeight: 300,
              }}
            >
              Te damos
            </p>
          </div>

          {/* Row 2 — static + typed */}
          <div
            className="overflow-hidden flex items-baseline gap-3 flex-wrap"
            style={{ animation: "hero-fade-up 0.7s ease 0.55s both" }}
          >
            <p
              className="font-normal leading-[1.05] tracking-tight text-foreground"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(2.6rem, 5.5vw, 4rem)",
                fontWeight: 300,
              }}
            >
              identidad
            </p>
            {/* Typed word */}
            <span
              ref={typedRef}
              className="overflow-hidden whitespace-nowrap"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "clamp(2.6rem, 5.5vw, 4rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: ACCENT,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                borderRight: `2px solid ${ACCENT}`,
                width: 0,
              }}
            />
          </div>
        </div>

        {/* Divider */}
        <div
          className="mb-5 flex items-center gap-3"
          style={{ animation: "hero-fade-up 0.6s ease 1.8s both" }}
        >
          <span
            className="h-px w-10 flex-none opacity-50"
            style={{ backgroundColor: PRIMARY }}
          />
          <span
            className="h-[3px] w-[3px] rounded-full opacity-40 flex-none"
            style={{ backgroundColor: PRIMARY }}
          />
        </div>

        {/* Subtext */}
        <p
          className="text-sm font-normal leading-[1.9] text-muted-foreground max-w-[40ch] sm:text-[0.9375rem] mb-9"
          style={{ animation: "hero-fade-up 0.6s ease 1.9s both" }}
        >
          Diseño, web y estrategia digital para marcas que quieren ser
          reconocidas — en Cuba y más allá.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center gap-4"
          style={{ animation: "hero-fade-up 0.6s ease 2.1s both" }}
        >
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); jumpTo("contacto"); }}
            className="inline-flex items-center gap-2 rounded-md px-7 py-3 text-sm font-normal tracking-wide transition-colors duration-200"
            style={{
              background: PRIMARY,
              color: "oklch(0.968 0.012 85)",
              letterSpacing: "0.05em",
              fontFamily: FONT_DISPLAY,
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(0.42 0.08 148)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
          >
            Hablemos
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7h9M7.5 3.5L11 7l-3.5 3.5"
                stroke="oklch(0.968 0.012 85)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="#servicios"
            onClick={(e) => { e.preventDefault(); jumpTo("servicios"); }}
            className="inline-flex items-center gap-2 text-sm font-normal tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground"
            style={{ letterSpacing: "0.05em" }}
          >
            Ver servicios
            <span style={{ color: ACCENT, fontSize: "1rem" }}>→</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{
          bottom: "56px",
          animation: "hero-fade-up 0.5s ease 2.6s both",
          opacity: 0.45,
        }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.22em]"
          style={{ color: "oklch(0.46 0.022 70)", fontFamily: "'Inter', sans-serif" }}
        >
          scroll
        </span>
        <div
          className="h-6 w-px rounded-full"
          style={{
            background: `linear-gradient(to bottom, oklch(0.50 0.085 142), transparent)`,
          }}
        />
      </div>

      {/* Bottom services strip */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center gap-8 border-t px-12 sm:px-20 md:px-28 lg:px-36 overflow-x-auto scrollbar-none"
        style={{
          height: "44px",
          borderColor: "oklch(0.880 0.018 82)",
          backgroundColor: "oklch(0.968 0.012 85)",
          animation: "hero-fade-up 0.5s ease 2.4s both",
        }}
      >
        {[
          { label: "Glow Agency", accent: true },
          { label: "Identidad de marca", accent: false },
          { label: "Desarrollo web", accent: false },
          { label: "Redes sociales", accent: false },
        ].map(({ label, accent }) => (
          <div key={label} className="flex items-center gap-2 flex-none">
            {!accent && (
              <span
                className="h-1 w-1 rounded-full flex-none opacity-50"
                style={{ backgroundColor: ACCENT }}
              />
            )}
            <span
              className="text-[10px] font-normal tracking-[0.2em] uppercase"
              style={{
                color: accent ? ACCENT : "oklch(0.55 0.022 72)",
                opacity: accent ? 0.9 : 1,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
