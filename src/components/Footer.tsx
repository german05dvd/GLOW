import { MessageCircle, Instagram, Facebook, Mail } from "lucide-react";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/tu_agencia", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com/tu_agencia", Icon: Facebook },
  { label: "WhatsApp", href: "https://wa.me/5355114938", Icon: MessageCircle },
  { label: "Correo", href: "mailto:hola@agenciadigital.cu", Icon: Mail },
];

const navLinks = [
  { label: "Inicio", href: "#" },
  { label: "Servicios", href: "#servicios" },
  { label: "Catálogo Web", href: "#catalogo" },
  { label: "Contacto", href: "#contacto" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{ borderColor: "oklch(0.906 0.007 80 / 0.2)", backgroundColor: "oklch(0.14 0.016 62)" }}
    >
      <div className="mx-auto max-w-7xl px-8 py-16 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3
              className="text-2xl font-normal tracking-tight"
              style={{ color: "oklch(0.988 0.005 80)", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Glow{" "}
              <span style={{ color: "oklch(0.72 0.13 74)" }}>Agencia</span>
            </h3>
            <p
              className="max-w-xs text-sm font-normal leading-[1.85]"
              style={{ color: "oklch(0.988 0.005 80 / 0.7)", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Gestiones de redes sociales, diseño de marca y plataformas web personalizadas.
            </p>
            <p
              className="max-w-xs text-sm font-normal leading-[1.85]"
              style={{ color: "oklch(0.988 0.005 80 / 0.7)", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Diseñado para potenciar el mercado cubano.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4
              className="text-sm font-normal uppercase tracking-wider"
              style={{ color: "oklch(0.988 0.005 80 / 0.9)", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Navegación
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm font-normal transition-colors duration-200"
                    style={{
                      color: "oklch(0.988 0.005 80 / 0.7)",
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "oklch(0.72 0.13 74)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "oklch(0.988 0.005 80 / 0.7)")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes */}
          <div className="space-y-4">
            <h4
              className="text-sm font-normal uppercase tracking-wider"
              style={{ color: "oklch(0.988 0.005 80 / 0.9)", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Síguenos
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: "oklch(0.988 0.005 80 / 0.1)",
                    color: "oklch(0.988 0.005 80 / 0.8)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "oklch(0.72 0.13 74)";
                    e.currentTarget.style.color = "oklch(0.14 0.016 62)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "oklch(0.988 0.005 80 / 0.1)";
                    e.currentTarget.style.color = "oklch(0.988 0.005 80 / 0.8)";
                  }}
                >
                  <social.Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
          style={{ borderColor: "oklch(0.988 0.005 80 / 0.1)" }}
        >
          <p
            className="text-xs font-normal"
            style={{ color: "oklch(0.988 0.005 80 / 0.5)", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            © {currentYear} Glow Agencia. Todos los derechos reservados.
          </p>
          <p
            className="text-xs font-normal"
            style={{ color: "oklch(0.988 0.005 80 / 0.5)", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Diseñado por el equipo web.
          </p>
        </div>
      </div>
    </footer>
  );
}