import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Hexagon, Star, Triangle, Circle, Square, Zap, Heart, Diamond } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const logos = [
  { top: "8%", left: "6%", size: 110, Icon: Hexagon, tint: "text-accent-brand" },
  { top: "22%", left: "32%", size: 140, Icon: Star, tint: "text-foreground" },
  { top: "4%", left: "62%", size: 96, Icon: Triangle, tint: "text-muted-foreground" },
  { top: "38%", left: "8%", size: 130, Icon: Circle, tint: "text-foreground" },
  { top: "48%", left: "44%", size: 120, Icon: Square, tint: "text-accent-brand" },
  { top: "30%", left: "72%", size: 150, Icon: Zap, tint: "text-foreground" },
  { top: "68%", left: "18%", size: 100, Icon: Heart, tint: "text-accent-brand" },
  { top: "62%", left: "54%", size: 135, Icon: Diamond, tint: "text-foreground" },
  { top: "74%", left: "78%", size: 105, Icon: Hexagon, tint: "text-muted-foreground" },
];

const steps = [
  { n: "01", title: "Conceptualización", desc: "Escuchamos tu negocio y definimos su esencia." },
  { n: "02", title: "Paleta de Colores", desc: "Elegimos tonos que conectan con tus clientes." },
  { n: "03", title: "Tipografía", desc: "Letras con personalidad propia y legibles." },
  { n: "04", title: "Manual de Marca", desc: "Reglas claras para usar tu marca en todas partes." },
];

function LogoCard({
  logo,
  progress,
  start,
  end,
}: {
  logo: (typeof logos)[number];
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.4, 1]);
  const y = useTransform(progress, [start, end], [30, 0]);
  const { Icon } = logo;

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        top: logo.top,
        left: logo.left,
        width: logo.size,
        height: logo.size,
        borderColor: "oklch(0.89 0.018 95)",
      }}
      className="absolute flex items-center justify-center rounded-2xl border bg-card shadow-xl"
    >
      <Icon
        className="h-1/2 w-1/2"
        style={{ color: logo.tint === "text-accent-brand" ? "oklch(0.56 0.085 128)" : logo.tint === "text-foreground" ? "oklch(0.27 0.022 130)" : "oklch(0.50 0.022 120)" }}
        strokeWidth={1.2}
      />
    </motion.div>
  );
}

function StepItem({
  step,
  progress,
  start,
  end,
}: {
  step: (typeof steps)[number];
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const fadeIn = Math.max(0, start - 0.05);
  const inStart = Math.max(fadeIn, start);
  const inEnd = Math.max(inStart, end);
  let fadeOut = Math.max(inEnd, Math.min(1, end + 0.1));
  if (fadeOut === inEnd) fadeOut = Math.min(1, fadeOut + 0.0001);
  const opacity = useTransform(
    progress,
    [fadeIn, inStart, inEnd, fadeOut],
    [0.25, 1, 1, 0.25],
  );
  const x = useTransform(progress, [fadeIn, inStart], [-20, 0]);
  const barScale = useTransform(progress, [inStart, inEnd], [0.2, 1]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="flex gap-4"
    >
      <div className="flex flex-col items-center pt-2">
        <span
          className="text-xs font-normal"
          style={{ color: "oklch(0.56 0.085 128)", fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {step.n}
        </span>
        <motion.div
          style={{ scaleY: barScale, backgroundColor: "oklch(0.56 0.085 128)" }}
          className="mt-2 h-12 w-px origin-top"
        />
      </div>
      <div>
        <h3
          className="text-xl font-normal tracking-tight text-foreground md:text-2xl"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {step.title}
        </h3>
        <p
          className="mt-1 max-w-xs text-sm font-normal leading-[1.85]"
          style={{ color: "oklch(0.50 0.022 120)", fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

function BrandScrollyDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const logoWindow = 0.18;
  const logoGap = 0.85 / logos.length;
  const stepSpan = 1 / steps.length;

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: "250vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-8 md:grid-cols-[1fr_1.4fr] md:px-12 lg:px-16">
          {/* Lado izquierdo: proceso */}
          <div>
            <span
              className="text-[10px] font-normal uppercase tracking-[0.28em]"
              style={{ color: "oklch(0.56 0.085 128)", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Diseño de marca
            </span>
            <h2
              className="mt-3 text-4xl font-normal tracking-tight text-foreground sm:text-5xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Tu marca,{" "}
              <span style={{ color: "oklch(0.56 0.085 128)" }}>paso a paso.</span>
            </h2>
            <div className="mt-10 space-y-6">
              {steps.map((step, i) => (
                <StepItem
                  key={step.n}
                  step={step}
                  progress={scrollYProgress}
                  start={i * stepSpan}
                  end={(i + 1) * stepSpan}
                />
              ))}
            </div>
          </div>

          {/* Lado derecho: logos asimétricos */}
          <div className="relative h-[70vh] w-full">
            {logos.map((logo, i) => {
              const start = i * logoGap;
              const end = start + logoWindow;
              return (
                <LogoCard
                  key={i}
                  logo={logo}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{ backgroundColor: "oklch(0.56 0.085 128 / 0.15)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── MÓVIL: layout estático, grid de logos + pasos en lista ── */
const mobileLogos = [
  { Icon: Hexagon, tint: "brand" },
  { Icon: Star, tint: "ink" },
  { Icon: Triangle, tint: "muted" },
  { Icon: Circle, tint: "ink" },
  { Icon: Square, tint: "terra" },
  { Icon: Diamond, tint: "brand" },
] as const;

function tintColor(t: string) {
  if (t === "brand") return "oklch(0.56 0.085 128)";
  if (t === "terra") return "oklch(0.62 0.12 48)";
  if (t === "muted") return "oklch(0.50 0.022 120)";
  return "oklch(0.27 0.022 130)";
}

function BrandScrollyMobile() {
  return (
    <section className="relative overflow-hidden bg-background py-16 px-5">
      {/* Decoración geométrica de fondo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute rounded-full border"
          style={{ top: "6%", right: "-16%", width: "60vw", aspectRatio: "1", borderColor: "oklch(0.56 0.085 128 / 0.14)" }}
        />
        <div
          className="absolute"
          style={{ bottom: "6%", left: "-10%", width: "44vw", aspectRatio: "1", backgroundColor: "oklch(0.62 0.12 48 / 0.07)", borderRadius: "60% 40% 40% 60% / 50% 50% 50% 50%" }}
        />
      </div>

      {/* Header */}
      <div className="relative mb-8">
        <span
          className="text-[10px] font-normal uppercase tracking-[0.28em]"
          style={{ color: "oklch(0.56 0.085 128)", fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Diseño de marca
        </span>
        <h2
          className="mt-3 text-balance text-4xl font-normal tracking-tight text-foreground"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Tu marca,{" "}
          <span style={{ color: "oklch(0.56 0.085 128)" }}>paso a paso.</span>
        </h2>
      </div>

      {/* Grid de logos */}
      <div className="relative mb-10 grid grid-cols-3 gap-3">
        {mobileLogos.map(({ Icon, tint }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
            className="flex aspect-square items-center justify-center rounded-2xl border bg-card shadow-sm"
            style={{ borderColor: "oklch(0.89 0.018 95)" }}
          >
            <Icon className="h-1/3 w-1/3" style={{ color: tintColor(tint) }} strokeWidth={1.2} />
          </motion.div>
        ))}
      </div>

      {/* Pasos en lista */}
      <div className="relative space-y-6">
        {steps.map((step) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center pt-1">
              <span
                className="text-xs font-normal"
                style={{ color: "oklch(0.56 0.085 128)", fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {step.n}
              </span>
              <div
                className="mt-2 h-10 w-px"
                style={{ backgroundColor: "oklch(0.56 0.085 128 / 0.4)" }}
              />
            </div>
            <div>
              <h3
                className="text-xl font-normal tracking-tight text-foreground"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {step.title}
              </h3>
              <p
                className="mt-1 text-sm font-normal leading-[1.8]"
                style={{ color: "oklch(0.50 0.022 120)", fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function BrandScrolly() {
  const isMobile = useIsMobile();
  return isMobile ? <BrandScrollyMobile /> : <BrandScrollyDesktop />;
}
