import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

const feedPosts = [
  { user: "glow.agency", color: "bg-accent-brand" },
  { user: "glow.agency", color: "bg-foreground" },
  { user: "glow.agency", color: "bg-muted-foreground" },
  { user: "glow.agency", color: "bg-accent-brand/70" },
  { user: "glow.agency", color: "bg-foreground/80" },
];

function PhoneFeed() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      <motion.div
        className="flex flex-col gap-3 p-3"
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...feedPosts, ...feedPosts].map((post, i) => (
          <article
            key={i}
            className="shrink-0 rounded-xl border bg-card"
            style={{ borderColor: "oklch(0.906 0.007 80)" }}
          >
            <div className="flex items-center gap-2 p-2.5">
              <div className={`h-7 w-7 rounded-full ${post.color}`} />
              <div
                className="h-2 w-20 rounded"
                style={{ backgroundColor: "oklch(0.906 0.007 80)" }}
              />
            </div>
            <div className={`aspect-square w-full ${post.color} opacity-90`} />
            <div
              className="flex items-center gap-3 p-2.5"
              style={{ color: "oklch(0.14 0.016 62)" }}
            >
              <Heart className="h-4 w-4" />
              <MessageCircle className="h-4 w-4" />
              <Send className="h-4 w-4" />
              <Bookmark className="ml-auto h-4 w-4" />
            </div>
            <div className="space-y-1.5 px-2.5 pb-3">
              <div
                className="h-2 w-3/4 rounded"
                style={{ backgroundColor: "oklch(0.906 0.007 80)" }}
              />
              <div
                className="h-2 w-1/2 rounded"
                style={{ backgroundColor: "oklch(0.906 0.007 80)" }}
              />
            </div>
          </article>
        ))}
      </motion.div>
    </div>
  );
}

export function SocialScrolly() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 0.6], ["0%", "-35%"]);
  const rotateY = useTransform(scrollYProgress, [0, 0.6], [0, 30]);
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [0, 8]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.6], [0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.2, 0.55], [40, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-8 md:grid-cols-2 md:px-12 lg:px-16">
          {/* Teléfono */}
          <div
            className="flex items-center justify-center"
            style={{ perspective: 1400 }}
          >
            <motion.div
              style={{
                x,
                rotateY,
                rotateX,
                rotateZ,
                scale,
                transformStyle: "preserve-3d",
                borderColor: "oklch(0.14 0.016 62)",
              }}
              className="relative h-[560px] w-[280px] rounded-[2.8rem] border-[12px] bg-foreground shadow-2xl"
            >
              <div
                className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full"
                style={{ backgroundColor: "oklch(0.14 0.016 62)" }}
              />
              <div className="h-full w-full overflow-hidden rounded-[1.8rem] bg-background">
                <PhoneFeed />
              </div>
              <div
                className="pointer-events-none absolute -inset-8 -z-10 rounded-[3.5rem] blur-3xl"
                style={{ backgroundColor: "oklch(0.72 0.13 74 / 0.2)" }}
              />
            </motion.div>
          </div>

          {/* Texto lado derecho */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="max-w-xl"
          >
            <span
              className="text-[10px] font-normal uppercase tracking-[0.28em]"
              style={{ color: "oklch(0.72 0.13 74)", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Servicios en práctica
            </span>
            <h2
              className="mt-3 text-4xl font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Tus redes,{" "}
              <span style={{ color: "oklch(0.72 0.13 74)" }}>vivas</span> todos los días.
            </h2>
            <p
              className="mt-6 text-base font-normal leading-[1.85] md:text-lg"
              style={{ color: "oklch(0.72 0.008 80)", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Diseñamos, programamos y publicamos contenido constante para tu
              negocio. Mientras tú lo atiendes, nosotros mantenemos tu
              marca presente en todas las redes y plataformas.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Calendario editorial mensual",
                "Diseño de posts, reels y stories",
                "Respuesta a mensajes y comunidad",
                "Reportes claros de crecimiento",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-normal md:text-base"
                  style={{ color: "oklch(0.14 0.016 62)", fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  <span
                    className="h-px w-6 rounded-full flex-none"
                    style={{ backgroundColor: "oklch(0.72 0.13 74)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}