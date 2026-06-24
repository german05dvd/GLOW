import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServicesScroll } from "@/components/ServicesScroll";
import { SocialScrolly } from "@/components/SocialScrolly";
import { BrandScrolly } from "@/components/BrandScrolly";
import { WebsiteScrolly } from "@/components/WebsiteScrolly";
import { TemplatesSection } from "@/components/TemplatesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glow · Agencia de Marketing Digital" },
      {
        name: "description",
        content: "Impulsamos tu negocio online. Gestión de redes sociales, creación de marca y sitios web personalizados.",
      },
      { property: "og:title", content: "Glow · Agencia de Marketing Digital" },
      {
        property: "og:description",
        content: "Impulsamos tu negocio online. Gestión de redes sociales, creación de marca y sitios web personalizados.",
      },
      { property: "og:url", content: "https://tudominio.com/" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "shortcut icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main className="bg-background pt-16">
        <Hero />
        <section id="servicios">
          <ServicesScroll />
        </section>
        <section id="redes">
          <SocialScrolly />
        </section>
        <section id="marca">
          <BrandScrolly />
        </section>
        <section id="catalogo">
          <WebsiteScrolly />
        </section>
        <TemplatesSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}