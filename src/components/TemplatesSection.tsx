import { ArrowRight, ExternalLink } from "lucide-react";

interface TemplateItem {
  id: string;
  title: string;
  description: string;
  category: string;
  badge?: string;
  tint: string;
  pattern: "lines" | "dots" | "blob" | "grid";
  featured?: boolean;
  image?: string;
  demoUrl?: string;
}

const templates: TemplateItem[] = [
  {
    id: "moda-urbana",
    title: "Moda Urbana",
    description:
      "Plantilla premium con catálogo integrado a WhatsApp, pensada para marcas de ropa y accesorios con estilo streetwear. Incluye animaciones suaves, carrito inteligente y diseño responsive optimizado para conversiones.",
    category: "Premium",
    badge: "Más Popular",
    tint: "bg-accent-brand",
    pattern: "blob",
    featured: true,
    image: "/template1.png",
    demoUrl: "https://maison-template.pages.dev/",
  },
  {
    id: "tech-startup",
    title: "Tech Startup",
    description:
      "Diseño minimalista y moderno para startups y servicios tecnológicos con secciones de features y pricing.",
    category: "Nueva",
    tint: "bg-foreground",
    pattern: "grid",
  },
  {
    id: "restaurante",
    title: "Restaurante",
    description:
      "Menú digital, reservas y pedidos por WhatsApp. Ideal para cafeterías y restaurantes locales.",
    category: "Gastronomía",
    tint: "bg-accent-brand/15",
    pattern: "lines",
  },
  {
    id: "ferreteria",
    title: "Ferretería / Servicios",
    description:
      "Catálogo de productos técnicos y solicitud de cotizaciones directas por mensajería instantánea.",
    category: "Servicios",
    tint: "bg-secondary",
    pattern: "dots",
  },
  {
    id: "boutique",
    title: "Tienda Boutique",
    description:
      "Elegancia y sencillez para tiendas de productos selectos, artesanías o cosméticos naturales.",
    category: "Retail",
    tint: "bg-muted",
    pattern: "blob",
  },
];

function PatternOverlay({ pattern }: { pattern: TemplateItem["pattern"] }) {
  if (pattern === "lines") {
    return (
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="lines-pat" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke="oklch(0.74 0.11 78)" strokeWidth="1" strokeOpacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lines-pat)" />
      </svg>
    );
  }
  if (pattern === "dots") {
    return (
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.74 0.11 78 / 0.35) 1.2px, transparent 1.2px)",
          backgroundSize: "14px 14px",
        }}
      />
    );
  }
  if (pattern === "grid") {
    return (
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.74 0.11 78 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.74 0.11 78 / 0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
    );
  }
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M -10 80 Q 50 20, 110 60 T 220 50 L 220 170 L -10 170 Z"
        fill="oklch(0.74 0.11 78)"
        fillOpacity="0.18"
      />
      <path
        d="M -10 110 Q 60 70, 130 100 T 220 90 L 220 170 L -10 170 Z"
        fill="oklch(0.74 0.11 78)"
        fillOpacity="0.12"
      />
    </svg>
  );
}

export function TemplatesSection() {
  return (
    <section className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-8 md:px-12 lg:px-16">
        <div className="mb-16 text-center">
          <span
            className="text-[10px] font-normal uppercase tracking-[0.28em]"
            style={{ color: "oklch(0.72 0.13 74)", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Plantillas & Kits
          </span>
          <h2
            className="mt-3 text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Empieza más rápido con un{" "}
            <span style={{ color: "oklch(0.72 0.13 74)" }}>kit de inicio</span>
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl text-sm font-normal leading-[1.85]"
            style={{ color: "oklch(0.72 0.008 80)", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Elige una plantilla adaptada a tu negocio y ten tu catálogo online en horas, no en semanas.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {templates.map((t) => {
            if (t.featured) {
              return (
                <div
                  key={t.id}
                  className="group relative overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:col-span-2 md:row-span-2"
                  style={{
                    border: "2px solid oklch(0.72 0.13 74)",
                    boxShadow: "0 0 0 1px oklch(0.72 0.13 74 / 0.15), 0 20px 40px oklch(0.14 0.016 62 / 0.08)",
                  }}
                >
                  {/* Línea dorada superior */}
                  <div
                    className="absolute left-0 right-0 top-0 h-1 z-20"
                    style={{ backgroundColor: "oklch(0.72 0.13 74)" }}
                  />

                  {t.badge && (
                    <div className="absolute left-5 top-5 z-10">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-normal uppercase tracking-wider"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          backgroundColor: "oklch(0.72 0.13 74)",
                          color: "oklch(0.14 0.016 62)",
                          boxShadow: "0 4px 12px oklch(0.72 0.13 74 / 0.3)",
                        }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        {t.badge}
                      </span>
                    </div>
                  )}

                  {t.image ? (
                    <a
                      href={t.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full overflow-hidden"
                    >
                      <img
                        src={t.image}
                        alt={`Preview plantilla ${t.title}`}
                        className="w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </a>
                  ) : (
                    <div className={`h-52 w-full ${t.tint}`} />
                  )}

                  <div className="border-t p-6 md:p-8" style={{ borderColor: "oklch(0.906 0.007 80)" }}>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                      <div className="flex-1">
                        <p
                          className="text-[10px] font-normal uppercase tracking-wider"
                          style={{ color: "oklch(0.72 0.13 74)", fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {t.category}
                        </p>
                        <h3
                          className="mt-1 text-xl font-normal tracking-tight text-foreground md:text-2xl"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {t.title}
                        </h3>
                        <p
                          className="mt-2 max-w-lg text-sm font-normal leading-[1.85]"
                          style={{ color: "oklch(0.72 0.008 80)", fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {t.description}
                        </p>
                      </div>
                      <a
                        href={t.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-2 rounded-lg px-6 py-3 text-sm font-normal shadow transition-transform hover:scale-105"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          backgroundColor: "oklch(0.14 0.016 62)",
                          color: "oklch(0.988 0.005 80)",
                        }}
                      >
                        Ver Demo
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={t.id}
                className="group relative overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ borderColor: "oklch(0.906 0.007 80)" }}
              >
                <div className={`relative h-40 w-full overflow-hidden ${t.tint}`}>
                  <PatternOverlay pattern={t.pattern} />
                  {t.badge && (
                    <div className="absolute left-4 top-4 z-10">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-normal uppercase tracking-wider"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          backgroundColor: "oklch(0.72 0.13 74)",
                          color: "oklch(0.14 0.016 62)",
                        }}
                      >
                        {t.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-5 pb-2">
                  <p
                    className="text-[11px] font-normal uppercase tracking-wider"
                    style={{ color: "oklch(0.72 0.008 80)", fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {t.category}
                  </p>
                  <h3
                    className="mt-1 text-base font-normal tracking-tight text-foreground md:text-lg"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {t.title}
                  </h3>
                </div>

                <div className="space-y-4 p-5 pt-0">
                  <p
                    className="line-clamp-2 text-sm font-normal leading-[1.85]"
                    style={{ color: "oklch(0.72 0.008 80)", fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {t.description}
                  </p>
                  <button
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-normal transition-colors duration-200"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      borderColor: "oklch(0.906 0.007 80)",
                      color: "oklch(0.14 0.016 62)",
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "oklch(0.72 0.13 74)";
                      e.currentTarget.style.color = "oklch(0.14 0.016 62)";
                      e.currentTarget.style.borderColor = "oklch(0.72 0.13 74)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "oklch(0.14 0.016 62)";
                      e.currentTarget.style.borderColor = "oklch(0.906 0.007 80)";
                    }}
                  >
                    Ver Demo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            className="inline-flex items-center gap-2 rounded-full border px-8 py-3 text-sm font-normal transition-all duration-200"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              borderColor: "oklch(0.906 0.007 80)",
              color: "oklch(0.14 0.016 62)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "oklch(0.72 0.13 74)";
              e.currentTarget.style.color = "oklch(0.14 0.016 62)";
              e.currentTarget.style.borderColor = "oklch(0.72 0.13 74)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "oklch(0.14 0.016 62)";
              e.currentTarget.style.borderColor = "oklch(0.906 0.007 80)";
            }}
          >
            Explorar todas las plantillas (+12 disponibles)
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}