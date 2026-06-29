import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Redes", href: "#redes" },
  { label: "Marca", href: "#marca" },
  { label: "Web", href: "#catalogo" },
  { label: "Contacto", href: "#contacto" },
];

const WHATSAPP_PHONE = "5355114938";

const FONT_DISPLAY = "'Cormorant Garamond', Georgia, serif";
const ACCENT       = "oklch(0.50 0.085 142)";
const PRIMARY      = "oklch(0.35 0.076 148)";
const FOREGROUND   = "oklch(0.18 0.022 62)";
const BG           = "oklch(0.968 0.012 85)";
const BORDER       = "oklch(0.880 0.018 82)";
const MUTED_FG     = "oklch(0.46 0.022 70)";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hideWhatsApp, setHideWhatsApp] = useState(false);

  useEffect(() => {
    const contactSection = document.getElementById("contacto");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHideWhatsApp(entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px", threshold: 0.1 }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "¡Hola! Visitamos su sitio web y nos gustaría obtener más información."
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, "_blank");
  };

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full backdrop-blur-md"
      style={{
        backgroundColor: `${BG}e6`,
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center px-8 md:px-12 lg:px-16">
        {/* Izquierda: Wordmark */}
        <div className="flex flex-1 items-center justify-start">
          <a
            href="#"
            className="inline-flex items-baseline gap-0.5 transition-opacity duration-200 hover:opacity-80"
            aria-label="Glow Agencia — ir al inicio"
          >
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "1.55rem",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: FOREGROUND,
                lineHeight: 1,
              }}
            >
              glow
            </span>
            <span
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "0.6rem",
                fontWeight: 400,
                letterSpacing: "0.22em",
                color: ACCENT,
                textTransform: "uppercase",
                marginLeft: "0.35rem",
                marginBottom: "0.1rem",
                lineHeight: 1,
              }}
            >
              agencia
            </span>
          </a>
        </div>

        {/* Centro: Links */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-normal transition-colors duration-200"
              style={{
                fontFamily: FONT_DISPLAY,
                fontSize: "0.95rem",
                color: MUTED_FG,
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = FOREGROUND)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = MUTED_FG)
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Derecha: WhatsApp outline */}
        <div
          className="hidden flex-1 items-center justify-end md:flex transition-all duration-300"
          style={{
            visibility: hideWhatsApp ? "hidden" : "visible",
            opacity: hideWhatsApp ? 0 : 1,
          }}
        >
          <button
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-normal transition-colors duration-200"
            style={{
              fontFamily: FONT_DISPLAY,
              border: `1px solid ${PRIMARY}`,
              color: PRIMARY,
              background: "transparent",
              letterSpacing: "0.04em",
              fontSize: "0.9rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `oklch(0.35 0.076 148 / 0.08)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
            tabIndex={hideWhatsApp ? -1 : 0}
            aria-hidden={hideWhatsApp}
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          style={{ color: FOREGROUND }}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="px-8 py-6 md:hidden"
          style={{
            borderTop: `1px solid ${BORDER}`,
            backgroundColor: BG,
          }}
        >
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-normal transition-colors duration-200"
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontSize: "1.05rem",
                  color: MUTED_FG,
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = FOREGROUND)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = MUTED_FG)
                }
              >
                {link.label}
              </a>
            ))}

            <div
              className="transition-all duration-300"
              style={{
                visibility: hideWhatsApp ? "hidden" : "visible",
                opacity: hideWhatsApp ? 0 : 1,
                height: hideWhatsApp ? "0px" : "auto",
                overflow: "hidden",
                marginTop: hideWhatsApp ? "0px" : "1rem",
              }}
            >
              <button
                onClick={handleWhatsAppClick}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-normal transition-colors duration-200"
                style={{
                  fontFamily: FONT_DISPLAY,
                  border: `1px solid ${PRIMARY}`,
                  color: PRIMARY,
                  background: "transparent",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `oklch(0.35 0.076 148 / 0.08)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                tabIndex={hideWhatsApp ? -1 : 0}
                aria-hidden={hideWhatsApp}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
