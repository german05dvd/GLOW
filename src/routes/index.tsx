import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { ServicesScroll } from "@/components/ServicesScroll";
import { SocialScrolly } from "@/components/SocialScrolly";
import { BrandScrolly } from "@/components/BrandScrolly";
import { WebsiteScrolly } from "@/components/WebsiteScrolly";
import { TemplatesSection } from "@/components/TemplatesSection";
import { ContactSection } from "@/components/ContactSection";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
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
    </>
  );
}