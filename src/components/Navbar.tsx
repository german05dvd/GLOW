import { useState, useEffect } from "react";
import { Menu, X, MessageCircle, Home } from "lucide-react";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Redes", href: "#redes" },
  { label: "Marca", href: "#marca" },
  { label: "Web", href: "#catalogo" },
  { label: "Contacto", href: "#contacto" },
];

const WHATSAPP_PHONE = "5355114938";

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
      className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-md"
      style={{ borderBottom: "1px solid oklch(0.89 0.018 95 / 0.5)" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center px-8 md:px-12 lg:px-16">
        {/* Izquierda: Inicio */}
        <div className="flex flex-1 items-center justify-start">
          <a
            href="#"
            className="group inline-flex items-center gap-2 transition-colors duration-200"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.25rem",
              color: "oklch(0.27 0.022 130)",
            }}
          >
            <Home
              className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
              style={{ color: "oklch(0.56 0.085 128)" }}
            />
            <span className="font-normal tracking-tight">Inicio</span>
          </a>
        </div>

        {/* Centro: Links planos, sin cajas, sin negritas */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-normal transition-colors duration-200"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "0.875rem",
                color: "oklch(0.50 0.022 120)",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "oklch(0.27 0.022 130)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "oklch(0.50 0.022 120)")
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
              fontFamily: "'Playfair Display', Georgia, serif",
              border: "1px solid oklch(0.56 0.085 128)",
              color: "oklch(0.56 0.085 128)",
              background: "transparent",
              letterSpacing: "0.04em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "oklch(0.56 0.085 128 / 0.06)";
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
          style={{ color: "oklch(0.27 0.022 130)" }}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="bg-background px-8 py-6 md:hidden"
          style={{ borderTop: "1px solid oklch(0.89 0.018 95 / 0.5)" }}
        >
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-normal transition-colors duration-200"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1rem",
                  color: "oklch(0.50 0.022 120)",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "oklch(0.27 0.022 130)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "oklch(0.50 0.022 120)")
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
                  fontFamily: "'Playfair Display', Georgia, serif",
                  border: "1px solid oklch(0.56 0.085 128)",
                  color: "oklch(0.56 0.085 128)",
                  background: "transparent",
                  letterSpacing: "0.04em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "oklch(0.56 0.085 128 / 0.06)";
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