import { useState } from "react";
import { Mail, MapPin, Send, MessageCircle, Clock } from "lucide-react";

export function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() && !message.trim()) {
      alert("Por favor, completa al menos tu nombre y un mensaje.");
      return;
    }

    setIsSubmitting(true);

    const agencyPhone = "5355114938";

    const text = `*🌟 Nueva consulta desde la web*%0A%0A` +
                 `*👤 Nombre:* ${name || 'No especificado'}%0A` +
                 `*📱 Teléfono:* ${phone || 'No especificado'}%0A` +
                 `*🏢 Empresa:* ${company || 'No especificada'}%0A` +
                 `*💬 Mensaje:* ${message || 'Sin mensaje adicional'}`;

    setTimeout(() => {
      window.open(`https://wa.me/${agencyPhone}?text=${encodeURIComponent(text)}`, "_blank");
      setIsSubmitting(false);
      setSubmitted(true);
      setName("");
      setPhone("");
      setCompany("");
      setMessage("");

      setTimeout(() => setSubmitted(false), 4000);
    }, 800);
  };

  const handleDirectWhatsApp = () => {
    const agencyPhone = "5355114938";
    const text = encodeURIComponent("¡Hola! Visitamos su sitio web y nos gustaría obtener más información sobre sus servicios.");
    window.open(`https://wa.me/${agencyPhone}?text=${text}`, "_blank");
  };

  return (
    <section id="contacto" className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-8 md:px-12 lg:px-16">
        <div className="mb-10 text-center md:mb-14 max-w-2xl mx-auto">
          <span
            className="text-[10px] font-normal uppercase tracking-[0.28em]"
            style={{ color: "oklch(0.50 0.085 142)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Contacto
          </span>
          <h2
            className="mt-3 text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Haz crecer tu{" "}
            <span style={{ color: "oklch(0.50 0.085 142)" }}>marca</span>
          </h2>
          <p
            className="mt-4 text-base font-normal leading-[1.85]"
            style={{ color: "oklch(0.46 0.022 70)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Completa el formulario o escríbenos directo. Estamos listos para ayudarte.
          </p>
        </div>

        {/* Botón WhatsApp destacado en mobile */}
        <div className="mb-8 md:hidden">
          <button
            onClick={handleDirectWhatsApp}
            className="flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-base font-normal shadow-lg transition-all active:scale-[0.98]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              background: "oklch(0.18 0.022 62)",
              color: "oklch(0.968 0.012 85)",
              boxShadow: "0 10px 25px oklch(0.25 0.048 148 / 0.15)",
            }}
          >
            <MessageCircle className="h-5 w-5" />
            Escríbenos por WhatsApp
          </button>
          <p
            className="mt-2 text-center text-xs font-normal"
            style={{ color: "oklch(0.46 0.022 70)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Respuesta rápida y directa
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-5 md:gap-12 lg:gap-16">
          {/* Formulario */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border p-6 shadow-sm md:p-8 lg:p-10"
              style={{ borderColor: "oklch(0.880 0.018 82)", backgroundColor: "oklch(0.968 0.012 85)" }}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-normal"
                    style={{ color: "oklch(0.18 0.022 62)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Nombre completo *
                  </label>
                  <input
                    id="name"
                    placeholder="Ej. Carlos Pérez"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-11 w-full rounded-xl px-4 text-sm font-normal outline-none transition-colors"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      border: "1px solid oklch(0.880 0.018 82)",
                      backgroundColor: "oklch(0.968 0.012 85)",
                      color: "oklch(0.18 0.022 62)",
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-normal"
                    style={{ color: "oklch(0.18 0.022 62)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    Teléfono / WhatsApp
                  </label>
                  <input
                    id="phone"
                    placeholder="Ej. 5 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 w-full rounded-xl px-4 text-sm font-normal outline-none transition-colors"
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      border: "1px solid oklch(0.880 0.018 82)",
                      backgroundColor: "oklch(0.968 0.012 85)",
                      color: "oklch(0.18 0.022 62)",
                    }}
                  />
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <label
                  htmlFor="company"
                  className="text-sm font-normal"
                  style={{ color: "oklch(0.18 0.022 62)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Empresa o Proyecto
                </label>
                <input
                  id="company"
                  placeholder="Nombre de tu negocio"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="h-11 w-full rounded-xl px-4 text-sm font-normal outline-none transition-colors"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    border: "1px solid oklch(0.880 0.018 82)",
                    backgroundColor: "oklch(0.968 0.012 85)",
                    color: "oklch(0.18 0.022 62)",
                  }}
                />
              </div>

              <div className="mt-5 space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-normal"
                  style={{ color: "oklch(0.18 0.022 62)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  ¿Cómo podemos ayudarte? *
                </label>
                <textarea
                  id="message"
                  placeholder="Cuéntanos brevemente sobre tu proyecto..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl px-4 py-3 text-sm font-normal outline-none transition-colors"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    border: "1px solid oklch(0.880 0.018 82)",
                    backgroundColor: "oklch(0.968 0.012 85)",
                    color: "oklch(0.18 0.022 62)",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-base font-normal tracking-wide transition-all disabled:opacity-70"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  background: isSubmitting ? "oklch(0.46 0.022 70)" : "oklch(0.35 0.076 148)",
                  color: "oklch(0.968 0.012 85)",
                  letterSpacing: "0.05em",
                  boxShadow: "0 10px 25px oklch(0.25 0.048 148 / 0.12)",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) e.currentTarget.style.background = "oklch(0.42 0.08 148)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "oklch(0.35 0.076 148)";
                }}
              >
                {isSubmitting ? (
                  "Procesando..."
                ) : submitted ? (
                  "¡Redirigiendo a WhatsApp!"
                ) : (
                  <>
                    Enviar consulta <Send className="h-4 w-4" />
                  </>
                )}
              </button>

              <p
                className="mt-3 text-center text-xs font-normal"
                style={{ color: "oklch(0.46 0.022 70)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Al enviar, se abrirá tu WhatsApp con los datos pre-cargados.
              </p>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <div
              className="rounded-3xl border p-6 md:p-8"
              style={{ borderColor: "oklch(0.906 0.007 80 / 0.5)", backgroundColor: "oklch(0.968 0.012 85)" }}
            >
              <h3
                className="text-lg font-normal tracking-tight mb-6"
                style={{ color: "oklch(0.18 0.022 62)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Información de contacto
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "oklch(0.50 0.085 142 / 0.1)" }}
                  >
                    <Mail className="h-4 w-4" style={{ color: "oklch(0.50 0.085 142)" }} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-sm font-normal"
                      style={{ color: "oklch(0.18 0.022 62)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Correo electrónico
                    </p>
                    <a
                      href="mailto:hola@agenciadigital.cu"
                      className="text-sm font-normal break-all transition-colors duration-200"
                      style={{ color: "oklch(0.46 0.022 70)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.50 0.085 142)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.46 0.022 70)")}
                    >
                      hola@agenciadigital.cu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "oklch(0.50 0.085 142 / 0.1)" }}
                  >
                    <MapPin className="h-4 w-4" style={{ color: "oklch(0.50 0.085 142)" }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-normal"
                      style={{ color: "oklch(0.18 0.022 62)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Ubicación
                    </p>
                    <p
                      className="text-sm font-normal"
                      style={{ color: "oklch(0.46 0.022 70)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      La Habana, Cuba
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: "oklch(0.50 0.085 142 / 0.1)" }}
                  >
                    <Clock className="h-4 w-4" style={{ color: "oklch(0.50 0.085 142)" }} />
                  </div>
                  <div>
                    <p
                      className="text-sm font-normal"
                      style={{ color: "oklch(0.18 0.022 62)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Tiempo de respuesta
                    </p>
                    <p
                      className="text-sm font-normal"
                      style={{ color: "oklch(0.46 0.022 70)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Respondemos en horario laboral
                    </p>
                  </div>
                </div>
              </div>

              {/* Botón WhatsApp en desktop */}
              <div className="hidden md:block mt-8 pt-6" style={{ borderTop: "1px solid oklch(0.906 0.007 80 / 0.5)" }}>
                <button
                  onClick={handleDirectWhatsApp}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-normal shadow-sm transition-all"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    backgroundColor: "oklch(0.968 0.012 85)",
                    color: "oklch(0.18 0.022 62)",
                    border: "1px solid oklch(0.880 0.018 82)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "oklch(0.50 0.085 142 / 0.08)";
                    e.currentTarget.style.borderColor = "oklch(0.50 0.085 142)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "oklch(0.968 0.012 85)";
                    e.currentTarget.style.borderColor = "oklch(0.880 0.018 82)";
                  }}
                >
                  <MessageCircle className="h-5 w-5 transition-transform group-hover:scale-110" style={{ color: "oklch(0.50 0.085 142)" }} />
                  Iniciar chat por WhatsApp
                </button>
              </div>
            </div>

            <p
              className="mt-6 text-center text-sm font-normal md:text-left"
              style={{ color: "oklch(0.46 0.022 70)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Tu información está segura.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
