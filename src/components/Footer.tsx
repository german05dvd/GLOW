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

const FONT_DISPLAY = "'Cormorant Garamond', Georgia, serif";
// ink-dark — verde muy oscuro, fondo del footer
const INK_DARK   = "oklch(0.25 0.048 148)";
const INK_FG     = "oklch(0.968 0.012 85)";
const ACCENT     = "oklch(0.50 0.085 142)";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        borderColor: "oklch(0.35 0.076 148 / 0.3)",
        backgroundColor: INK_DARK,
      }}
    >
      <div className="mx-auto max-w-7xl px-8 py-16 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3
              className="text-2xl font-normal tracking-tight"
              style={{
                color: INK_FG,
                fontFamily: FONT_DISPLAY,
                fontWeight: 300,
              }}
            >
              Glow{" "}
              <span style={{ color: ACCENT }}>Agencia</span>
            </h3>
            <p
              className="max-w-xs text-sm font-normal leading-[1.85]"
              style={{
                color: `${INK_FG}b3`,
                fontFamily: FONT_DISPLAY,
              }}
            >
              Gestiones de redes sociales, diseño de marca y plataformas web personalizadas.
            </p>
            <p
              className="max-w-xs text-sm font-normal leading-[1.85]"
              style={{
                color: `${INK_FG}b3`,
                fontFamily: FONT_DISPLAY,
              }}
            >
              Diseñado para potenciar el mercado cubano.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4
              className="text-sm font-normal uppercase tracking-wider"
              style={{ color: `${INK_FG}e6`, fontFamily: FONT_DISPLAY }}
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
                      color: `${INK_FG}b3`,
                      fontFamily: FONT_DISPLAY,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = ACCENT)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = `${INK_FG}b3`)
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
              style={{ color: `${INK_FG}e6`, fontFamily: FONT_DISPLAY }}
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
                    backgroundColor: `${INK_FG}1a`,
                    color: `${INK_FG}cc`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = ACCENT;
                    e.currentTarget.style.color = INK_DARK;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${INK_FG}1a`;
                    e.currentTarget.style.color = `${INK_FG}cc`;
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
          style={{ borderColor: `${INK_FG}1a` }}
        >
          <p
            className="text-xs font-normal"
            style={{ color: `${INK_FG}80`, fontFamily: FONT_DISPLAY }}
          >
            © {currentYear} Glow Agencia. Todos los derechos reservados.
          </p>
          <p
            className="text-xs font-normal"
            style={{ color: `${INK_FG}80`, fontFamily: FONT_DISPLAY }}
          >
            Diseñado por el equipo web.
          </p>
        </div>
      </div>
    </footer>
  );
}
