import { useState } from "react";
import { Check, MessageCircle, ShoppingBag } from "lucide-react";

const DEMO_PRODUCTS = [
  { id: 1, name: "Camiseta Estampada", price: 1500 },
  { id: 2, name: "Taza Personalizada", price: 800 },
  { id: 3, name: "Bolsa Ecológica", price: 1200 },
  { id: 4, name: "Gorra Bordada", price: 950 },
];

export function CatalogDemo() {
  const [cart, setCart] = useState<Set<number>>(new Set());

  const toggleProduct = (id: number) => {
    setCart((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleWhatsAppOrder = () => {
    const added = DEMO_PRODUCTS.filter((p) => cart.has(p.id));
    if (added.length === 0) return;

    const lines = added
      .map((p) => `• ${p.name} — $${p.price}`)
      .join("\n");

    const total = added.reduce((sum, p) => sum + p.price, 0);
    const message = `Hola, quiero hacer un pedido:\n\n${lines}\n\nTotal: $${total}`;

    const phoneNumber = "5355555555";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const cartCount = cart.size;

  return (
    <section className="relative w-full bg-background px-8 py-24 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Encabezado */}
        <div className="mb-14 text-center">
          <span
            className="text-[10px] font-normal uppercase tracking-[0.28em]"
            style={{ color: "oklch(0.72 0.13 74)", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Catálogo interactivo
          </span>
          <h2
            className="mt-3 text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Añade y pide por{" "}
            <span style={{ color: "oklch(0.72 0.13 74)" }}>WhatsApp</span>
          </h2>
          <p
            className="mt-4 text-sm font-normal leading-[1.85]"
            style={{ color: "oklch(0.72 0.008 80)", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Selecciona los productos que te interesen y envía tu pedido directamente.
          </p>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DEMO_PRODUCTS.map((product) => {
            const isAdded = cart.has(product.id);
            return (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{ borderColor: "oklch(0.906 0.007 80)" }}
              >
                {/* Placeholder de imagen */}
                <div
                  className="relative aspect-[4/3]"
                  style={{ backgroundColor: "oklch(0.988 0.005 80)" }}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    <ShoppingBag
                      className="h-10 w-10"
                      style={{ color: "oklch(0.906 0.007 80)" }}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-5">
                  <h3
                    className="text-lg font-normal tracking-tight text-foreground"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="mt-1 text-sm font-normal"
                    style={{ color: "oklch(0.72 0.008 80)", fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    ${product.price} CUP
                  </p>

                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => toggleProduct(product.id)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-normal tracking-wide transition-colors duration-200"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        background: isAdded ? "oklch(0.14 0.016 62)" : "oklch(0.72 0.13 74)",
                        color: isAdded ? "oklch(0.988 0.005 80)" : "oklch(0.14 0.016 62)",
                        border: isAdded ? "1px solid oklch(0.14 0.016 62)" : "1px solid oklch(0.72 0.13 74)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isAdded) e.currentTarget.style.background = "oklch(0.72 0.13 74 / 0.85)";
                      }}
                      onMouseLeave={(e) => {
                        if (!isAdded) e.currentTarget.style.background = "oklch(0.72 0.13 74)";
                      }}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-4 w-4" />
                          Añadido
                        </>
                      ) : (
                        "Añadir"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón WhatsApp destacado */}
        <div className="mt-16 flex flex-col items-center justify-center gap-4">
          {cartCount > 0 && (
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-normal"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                backgroundColor: "oklch(0.988 0.005 80)",
                color: "oklch(0.14 0.016 62)",
                border: "1px solid oklch(0.906 0.007 80)",
              }}
            >
              <ShoppingBag className="h-4 w-4" style={{ color: "oklch(0.72 0.13 74)" }} />
              {cartCount} {cartCount === 1 ? "producto" : "productos"} seleccionado
            </span>
          )}

          <button
            onClick={handleWhatsAppOrder}
            disabled={cartCount === 0}
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-normal tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              background: "oklch(0.14 0.016 62)",
              color: "oklch(0.988 0.005 80)",
              letterSpacing: "0.05em",
            }}
            onMouseEnter={(e) => {
              if (cartCount > 0) e.currentTarget.style.background = "oklch(0.22 0.016 62)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "oklch(0.14 0.016 62)";
            }}
          >
            <MessageCircle className="h-5 w-5" />
            Finalizar Pedido en WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}