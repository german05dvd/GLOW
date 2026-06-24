import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1
        className="text-6xl font-normal tracking-tight"
        style={{ color: "oklch(0.72 0.13 74)", fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        404
      </h1>
      <h2
        className="text-2xl font-normal tracking-tight text-foreground"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Página no encontrada
      </h2>
      <p
        className="text-sm font-normal leading-[1.85]"
        style={{ color: "oklch(0.72 0.008 80)", fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        La página que buscas no existe o ha sido movida.
      </p>
      <Link to="/">
        <button
          className="mt-4 rounded-full px-6 py-3 text-sm font-normal transition-transform hover:scale-105"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            backgroundColor: "oklch(0.72 0.13 74)",
            color: "oklch(0.14 0.016 62)",
          }}
        >
          Volver al inicio
        </button>
      </Link>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1
        className="text-4xl font-normal tracking-tight text-foreground"
        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Algo salió mal
      </h1>
      <p
        className="text-sm font-normal leading-[1.85]"
        style={{ color: "oklch(0.72 0.008 80)", fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Ocurrió un error inesperado. Puedes intentar recargar la página.
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-normal transition-transform hover:scale-105"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            backgroundColor: "oklch(0.72 0.13 74)",
            color: "oklch(0.14 0.016 62)",
          }}
        >
          Intentar de nuevo
        </button>
        <Link to="/">
          <button
            className="rounded-full px-6 py-3 text-sm font-normal transition-colors"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              border: "1px solid oklch(0.906 0.007 80)",
              color: "oklch(0.14 0.016 62)",
              backgroundColor: "transparent",
            }}
          >
            Ir al inicio
          </button>
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "oklch(0.74 0.11 78)" },
      { title: "Glow · Agencia de Marketing Digital" },
      { name: "description", content: "Agencia de marketing digital especializada en mipymes cubanas. Gestión de redes sociales, branding y sitios web conectados a WhatsApp." },
      { name: "author", content: "Glow Agencia" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Glow Agencia" },
      { property: "og:title", content: "Glow · Impulsamos tu Negocio Online" },
      { property: "og:description", content: "Redes sociales, identidad de marca y sitios web catálogo diseñados para vender más en Cuba." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_CU" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Glow · Agencia de Marketing Digital" },
      { name: "twitter:description", content: "Diseñado para mipymes cubanas que quieren vender más, hoy." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@300;400&display=swap",
      },
      // Truco sizes="any" para forzar a Chrome a usar el SVG
      { rel: "icon", type: "image/svg+xml", sizes: "any", href: "/favicon.svg" },
      { rel: "shortcut icon", type: "image/svg+xml", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <HeadContent />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}