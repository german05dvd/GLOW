import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ShoppingBag, Check, Plus, MessageCircle, Send, ArrowLeft, CheckCircle2, Pause, Sparkles } from "lucide-react";

type Product = { id: number; name: string; price: number; tint: string };

const products: Product[] = [
  { id: 1, name: "Camiseta básica", price: 1200, tint: "bg-accent-brand/80" },
  { id: 2, name: "Mochila urbana", price: 3500, tint: "bg-foreground/80" },
  { id: 3, name: "Tenis clásicos", price: 4800, tint: "bg-muted-foreground/60" },
  { id: 4, name: "Gorra bordada", price: 950, tint: "bg-accent-brand/60" },
  { id: 5, name: "Camisa de lino", price: 2800, tint: "bg-secondary" },
  { id: 6, name: "Jeans clásicos", price: 3200, tint: "bg-muted" },
  { id: 7, name: "Vestido casual", price: 4500, tint: "bg-accent-brand/70" },
  { id: 8, name: "Blazer elegante", price: 6800, tint: "bg-foreground/70" },
];

interface CatalogAppProps {
  currentScreen: "catalog" | "whatsapp" | "success";
  activeCartIds: Set<number>;
  onManualInteraction: () => void;
  onManualToggle: (id: number) => void;
  onManualGoToWhatsApp: () => void;
  onManualGoBack: () => void;
  onSendClick: () => void;
  isWhatsAppBackActive: boolean;
  isSendButtonActive: boolean;
  showDraftInInput: boolean;
  messageSent: boolean;
}

function CatalogApp({
  currentScreen,
  activeCartIds,
  onManualInteraction,
  onManualToggle,
  onManualGoToWhatsApp,
  onManualGoBack,
  onSendClick,
  isWhatsAppBackActive,
  isSendButtonActive,
  showDraftInInput,
  messageSent,
}: CatalogAppProps) {
  const selectedItems = products.filter((p) => activeCartIds.has(p.id));
  const totalAmount = selectedItems.reduce((sum, p) => sum + p.price, 0);

  const whatsappMessageLines = selectedItems.length
    ? [
        "¡Hola! Quiero hacer un pedido:",
        "",
        ...selectedItems.map((p) => `• ${p.name} — $${p.price.toLocaleString()}`),
        "",
        `*Total: $${totalAmount.toLocaleString()}*`,
      ]
    : ["¡Hola! Quiero más información sobre sus productos."];

  const draftText = selectedItems.length
    ? `Pedido: ${selectedItems.map((p) => p.name).join(", ")} — Total: $${totalAmount.toLocaleString()}`
    : "¡Hola! Quiero más información...";

  return (
    <div
      className="relative flex h-full w-full flex-col bg-background select-none text-left overflow-hidden rounded-[1.9rem]"
      onClick={onManualInteraction}
    >
      {currentScreen === "catalog" && (
        <>
          <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 shrink-0">
            <span className="text-sm font-bold text-foreground">MiTienda</span>
            <div className="flex items-center gap-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <div className="relative">
                <ShoppingBag className="h-4 w-4 text-foreground" />
                {activeCartIds.size > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent-brand text-[10px] font-bold text-accent-brand-foreground">
                    {activeCartIds.size}
                  </span>
                )}
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-3">
            <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Productos
            </h4>
            <div className="grid grid-cols-2 gap-3 pb-24">
              {products.map((p) => {
                const isAdded = activeCartIds.has(p.id);
                return (
                  <article
                    key={p.id}
                    className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
                  >
                    <div className={`aspect-square w-full ${p.tint}`} />
                    <div className="space-y-1 p-2.5">
                      <p className="truncate text-xs font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">${p.price.toLocaleString()}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onManualToggle(p.id);
                        }}
                        className={`mt-1.5 flex w-full items-center justify-center gap-1 rounded-md px-2 py-1.5 text-[11px] font-semibold transition-all duration-300 cursor-pointer ${
                          isAdded ? "bg-green-600 text-white" : "bg-foreground text-background"
                        }`}
                      >
                        {isAdded ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                        {isAdded ? "Añadido" : "Añadir"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onManualGoToWhatsApp();
            }}
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-green-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-green-500/20 whitespace-nowrap cursor-pointer z-10"
          >
            <MessageCircle className="h-4 w-4" />
            Hacer Pedido por WhatsApp
            {activeCartIds.size > 0 && (
              <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">
                {activeCartIds.size}
              </span>
            )}
          </button>
        </>
      )}

      {currentScreen === "whatsapp" && (
        <div className="flex flex-col h-full w-full overflow-hidden rounded-[1.9rem]">
          <header className="flex items-center gap-2 bg-[#075e54] px-3 py-3 text-white shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onManualGoBack();
              }}
              className={`rounded-full p-1 transition-all cursor-pointer ${
                isWhatsAppBackActive
                  ? "bg-white/30 scale-95 ring-2 ring-white/50 ring-offset-2 ring-offset-[#075e54]"
                  : "hover:bg-white/10"
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white uppercase">
              MT
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight">X</span>
              <span className="text-[9px] text-white/80">en línea</span>
            </div>
          </header>

          <div
            className="flex-1 bg-[#efeae2] p-3 overflow-y-auto flex flex-col justify-end space-y-2"
            style={{
              backgroundImage: "radial-gradient(#dfdcd6 1px, transparent 0)",
              backgroundSize: "12px 12px",
            }}
          >
            <div className="mx-auto my-1 rounded bg-info/10 px-2 py-1 text-center text-[9px] text-muted-foreground/90 max-w-[90%]">
              🔒 Simulación del flujo automatizado.
            </div>

            {messageSent && (
              <div className="self-end bg-[#d9fdd3] text-[#111b21] p-2.5 rounded-xl rounded-tr-none max-w-[85%] text-[11px] shadow-sm space-y-0.5 border border-[#e1f7de] animate-in fade-in-50 slide-in-from-bottom-1 duration-300">
                {whatsappMessageLines.map((line, idx) => (
                  <p key={idx} className={line.startsWith("*") ? "font-bold" : ""}>
                    {line.replace(/\*/g, "")}
                  </p>
                ))}
                <div className="text-right text-[8px] text-muted-foreground/70 mt-1">
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ✓✓
                </div>
              </div>
            )}
          </div>

          <footer className="bg-[#f0f2f5] p-2 flex items-center gap-2 border-t border-border/40 shrink-0">
            <div className="flex-1 bg-white rounded-lg px-3 py-1.5 text-[11px] text-muted-foreground/60 truncate border border-black/5">
              {showDraftInInput ? draftText : (messageSent ? "Escribe un mensaje..." : "Mensaje generado...")}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSendClick();
              }}
              className={`h-8 w-8 rounded-full flex items-center justify-center text-white transition-all cursor-pointer ${
                isSendButtonActive
                  ? "bg-[#00a884] ring-2 ring-[#00a884] ring-offset-2 ring-offset-[#f0f2f5] scale-110 animate-pulse"
                  : "bg-[#00a884] hover:scale-105"
              }`}
              aria-label="Enviar mensaje"
            >
              <Send className="h-3.5 w-3.5 ml-0.5" />
            </button>
          </footer>
        </div>
      )}

      {currentScreen === "success" && (
        <div className="flex flex-col h-full w-full items-center justify-center bg-background text-foreground p-6 text-center animate-in fade-in zoom-in-95 duration-300 rounded-[1.9rem]">
          <CheckCircle2 className="h-16 w-16 text-green-500 animate-bounce" />
          <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">¡Sencillo!</h3>
          <p className="mt-2 text-xs text-muted-foreground max-w-[80%]">
            Tus clientes ordenan sin salir de WhatsApp y tú controlas el inventario de manera eficiente.
          </p>
        </div>
      )}
    </div>
  );
}

export function WebsiteScrolly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [screen, setScreen] = useState<"catalog" | "whatsapp" | "success">("catalog");
  const [cart, setCart] = useState<Set<number>>(new Set());
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [isWhatsAppBackSimulated, setIsWhatsAppBackSimulated] = useState(false);
  const [isSendButtonSimulated, setIsSendButtonSimulated] = useState(false);
  const [showDraftInInput, setShowDraftInInput] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sequenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const manualSequenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const resetInactivityTimer = useCallback(() => {
    setIsUserInteracting(true);
    if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
    if (manualSequenceTimerRef.current) clearTimeout(manualSequenceTimerRef.current);

    inactivityTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 5000);
  }, []);

  const runSendSequence = useCallback(() => {
    if (manualSequenceTimerRef.current) clearTimeout(manualSequenceTimerRef.current);
    if (successTimerRef.current) clearTimeout(successTimerRef.current);

    setShowDraftInInput(true);
    setMessageSent(false);

    manualSequenceTimerRef.current = setTimeout(() => {
      setIsSendButtonSimulated(true);

      manualSequenceTimerRef.current = setTimeout(() => {
        if (!messageSent) {
          setMessageSent(true);
          setShowDraftInInput(false);
          setIsSendButtonSimulated(false);

          manualSequenceTimerRef.current = setTimeout(() => {
            setIsWhatsAppBackSimulated(true);

            manualSequenceTimerRef.current = setTimeout(() => {
              setIsWhatsAppBackSimulated(false);
              setScreen("success");

              successTimerRef.current = setTimeout(() => {
                setScreen("catalog");
                setCart(new Set());
                if (isUserInteracting) {
                  setIsUserInteracting(false);
                }
              }, 2000);
            }, 2000);
          }, 1500);
        }
      }, 3000);
    }, 1500);
  }, [messageSent, isUserInteracting]);

  const handleSendClick = useCallback(() => {
    if (manualSequenceTimerRef.current) clearTimeout(manualSequenceTimerRef.current);
    if (successTimerRef.current) clearTimeout(successTimerRef.current);

    setMessageSent(true);
    setShowDraftInInput(false);
    setIsSendButtonSimulated(false);

    manualSequenceTimerRef.current = setTimeout(() => {
      setIsWhatsAppBackSimulated(true);

      manualSequenceTimerRef.current = setTimeout(() => {
        setIsWhatsAppBackSimulated(false);
        setScreen("success");

        successTimerRef.current = setTimeout(() => {
          setScreen("catalog");
          setCart(new Set());
          if (isUserInteracting) {
            setIsUserInteracting(false);
          }
        }, 2000);
      }, 2000);
    }, 1500);
  }, [isUserInteracting]);

  useEffect(() => {
    if (!isSectionVisible || isUserInteracting) return;

    let step = 0;
    const runAutoplayLoop = () => {
      if (isUserInteracting || !isSectionVisible) return;

      if (step === 0) {
        setScreen("catalog");
        setCart(new Set());
        setIsWhatsAppBackSimulated(false);
        setIsSendButtonSimulated(false);
        setShowDraftInInput(false);
        setMessageSent(false);
        sequenceTimerRef.current = setTimeout(() => { step = 1; runAutoplayLoop(); }, 2000);
      } else if (step === 1) {
        setCart(new Set([1]));
        sequenceTimerRef.current = setTimeout(() => { step = 2; runAutoplayLoop(); }, 1500);
      } else if (step === 2) {
        setCart(new Set([1, 2]));
        sequenceTimerRef.current = setTimeout(() => { step = 3; runAutoplayLoop(); }, 1500);
      } else if (step === 3) {
        setScreen("whatsapp");
        sequenceTimerRef.current = setTimeout(() => { step = 4; runAutoplayLoop(); }, 1500);
      } else if (step === 4) {
        setShowDraftInInput(true);
        sequenceTimerRef.current = setTimeout(() => { step = 5; runAutoplayLoop(); }, 1500);
      } else if (step === 5) {
        setIsSendButtonSimulated(true);
        sequenceTimerRef.current = setTimeout(() => { step = 6; runAutoplayLoop(); }, 2000);
      } else if (step === 6) {
        setMessageSent(true);
        setShowDraftInInput(false);
        setIsSendButtonSimulated(false);
        sequenceTimerRef.current = setTimeout(() => { step = 7; runAutoplayLoop(); }, 1500);
      } else if (step === 7) {
        setIsWhatsAppBackSimulated(true);
        sequenceTimerRef.current = setTimeout(() => { step = 8; runAutoplayLoop(); }, 2000);
      } else if (step === 8) {
        setIsWhatsAppBackSimulated(false);
        sequenceTimerRef.current = setTimeout(() => { step = 9; runAutoplayLoop(); }, 1000);
      } else if (step === 9) {
        setScreen("success");
        sequenceTimerRef.current = setTimeout(() => { step = 0; runAutoplayLoop(); }, 2000);
      }
    };

    runAutoplayLoop();

    return () => {
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    };
  }, [isUserInteracting, isSectionVisible]);

  useEffect(() => {
    if (screen === "whatsapp" && isUserInteracting && !showDraftInInput && !messageSent) {
      runSendSequence();
    }
  }, [screen, isUserInteracting, showDraftInInput, messageSent, runSendSequence]);

  useEffect(() => {
    return () => {
      if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
      if (manualSequenceTimerRef.current) clearTimeout(manualSequenceTimerRef.current);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  const handleManualToggle = (id: number) => {
    resetInactivityTimer();
    setCart((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleManualGoToWhatsApp = () => {
    resetInactivityTimer();
    setScreen("whatsapp");
  };

  const handleManualGoBack = () => {
    resetInactivityTimer();
    if (manualSequenceTimerRef.current) clearTimeout(manualSequenceTimerRef.current);
    setScreen("success");

    successTimerRef.current = setTimeout(() => {
      setScreen("catalog");
      setCart(new Set());
      if (isUserInteracting) {
        setIsUserInteracting(false);
      }
    }, 2000);
  };

  const handleToggleInteractive = () => {
    setIsUserInteracting((prev) => !prev);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["25%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  const bgShape1X = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgShape2Y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgShape3Rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const bgShape4Y = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const bgShape5Rotate = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={containerRef}
      className="relative bg-background overflow-hidden"
      style={{ height: "115vh" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: bgShape1X }}
          className="absolute top-[10%] -left-20 w-80 h-80 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: bgShape2Y }}
          className="absolute top-[12%] -right-12 w-56 h-56 opacity-[0.04]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z" fill="currentColor" className="text-foreground" />
          </svg>
        </motion.div>
        <motion.div
          style={{ y: bgShape4Y, rotate: bgShape5Rotate }}
          className="absolute bottom-[15%] left-[8%] w-40 h-40 opacity-[0.03]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z" fill="currentColor" className="text-accent-brand" />
          </svg>
        </motion.div>
        <motion.div
          style={{ rotate: bgShape3Rotate }}
          className="absolute top-[20%] left-[45%] w-24 h-24 opacity-[0.025]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z" fill="currentColor" className="text-foreground" />
          </svg>
        </motion.div>
        <motion.div
          style={{ rotate: bgShape3Rotate }}
          className="absolute top-1/2 left-[10%] -translate-y-1/2 w-24 h-24 opacity-[0.05]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="20" cy="20" r="3" fill="currentColor" className="text-accent-brand" />
            <circle cx="50" cy="20" r="3" fill="currentColor" className="text-accent-brand" />
            <circle cx="80" cy="20" r="3" fill="currentColor" className="text-accent-brand" />
            <circle cx="20" cy="50" r="3" fill="currentColor" className="text-accent-brand" />
            <circle cx="50" cy="50" r="3" fill="currentColor" className="text-accent-brand" />
            <circle cx="80" cy="50" r="3" fill="currentColor" className="text-accent-brand" />
            <circle cx="20" cy="80" r="3" fill="currentColor" className="text-accent-brand" />
            <circle cx="50" cy="80" r="3" fill="currentColor" className="text-accent-brand" />
            <circle cx="80" cy="80" r="3" fill="currentColor" className="text-accent-brand" />
          </svg>
        </motion.div>
        <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-accent-brand/10 to-transparent" />
        <div className="absolute bottom-[25%] left-[15%] w-32 h-32 rounded-full border" style={{ borderColor: "oklch(0.50 0.085 142 / 0.12)" }} />
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
          <motion.div
            style={{ opacity }}
            className="flex flex-col justify-center text-center md:text-left space-y-4 md:space-y-5 order-2 md:order-1"
          >
            <div>
              <span
                className="text-[10px] font-normal uppercase tracking-[0.28em]"
                style={{ color: "oklch(0.50 0.085 142)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Sitios web · catálogos autónomos
              </span>
              <h2
                className="mt-3 text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Experimenta el flujo en{" "}
                <span style={{ color: "oklch(0.50 0.085 142)" }}>tiempo real.</span>
              </h2>
            </div>

            <p
              className="text-sm sm:text-base max-w-xl leading-[1.85] mx-auto md:mx-0"
              style={{ color: "oklch(0.72 0.008 80)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Interactúa con el catálogo simulado como si fueras tu propio cliente.
              Al hacer tu pedido, verás cómo nuestro sistema estructura automáticamente el mensaje
              para WhatsApp. Simple, rápido y sin fricción.
            </p>

            <div className="flex flex-col items-center gap-2 mx-auto md:mx-0 md:items-start">
              <button
                onClick={handleToggleInteractive}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-normal transition-all shadow-lg ${
                  isUserInteracting
                    ? "shadow-foreground/20"
                    : "shadow-accent-brand/30 animate-pulse"
                }`}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  background: isUserInteracting ? "oklch(0.25 0.048 148)" : "oklch(0.50 0.085 142)",
                  color: isUserInteracting ? "oklch(0.968 0.012 85)" : "oklch(0.25 0.048 148)",
                }}
              >
                {isUserInteracting ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Salir del modo interactivo
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    ¡Haz click aquí para interactuar tú mismo!
                  </>
                )}
              </button>
              <span
                className="text-xs font-normal"
                style={{ color: "oklch(0.72 0.008 80)", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {isUserInteracting ? "✨ Modo interactivo activado" : "Demo automática en curso"}
              </span>
            </div>
          </motion.div>

          <div className="flex justify-center md:justify-end items-center order-1 md:order-2 w-full">
            <motion.div
              style={{ y, scale, opacity, borderColor: "oklch(0.25 0.048 148)", backgroundColor: "oklch(0.25 0.048 148)" }}
              className="relative h-[62vh] min-h-[440px] max-h-[600px] w-[290px] sm:w-[310px] rounded-[2.8rem] border-[10px] shadow-2xl shrink-0 overflow-hidden"
            >
              <div className="absolute left-1/2 top-2.5 z-30 h-4 w-24 -translate-x-1/2 rounded-full pointer-events-none" style={{ backgroundColor: "oklch(0.25 0.048 148)" }} />
              <div className="h-full w-full overflow-hidden rounded-[2.1rem] bg-background relative z-10">
                <CatalogApp
                  currentScreen={screen}
                  activeCartIds={cart}
                  onManualInteraction={resetInactivityTimer}
                  onManualToggle={handleManualToggle}
                  onManualGoToWhatsApp={handleManualGoToWhatsApp}
                  onManualGoBack={handleManualGoBack}
                  onSendClick={handleSendClick}
                  isWhatsAppBackActive={isWhatsAppBackSimulated}
                  isSendButtonActive={isSendButtonSimulated}
                  showDraftInInput={showDraftInInput}
                  messageSent={messageSent}
                />
              </div>
              <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] blur-3xl" style={{ backgroundColor: "oklch(0.50 0.085 142 / 0.12)" }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
