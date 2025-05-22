import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const PAGE_HINTS: { [key: string]: string } = {
  "/": "Estás en el panel principal. Puedes navegar a las diferentes secciones usando el menú superior.",
  "/customers": "Aquí puedes ver, crear, editar y eliminar clientes. Haz clic en 'Create Customer' para agregar uno nuevo o en 'Ver Órdenes' para ver las órdenes de un cliente.",
  "/adresses": "Aquí puedes gestionar las direcciones de entrega de los clientes.",
  "/products": "Aquí puedes ver y administrar los productos disponibles.",
  "/restaurants": "Aquí puedes ver, crear, editar y eliminar restaurantes. También puedes acceder al menú de cada restaurante.",
  "/orders": "Aquí puedes ver y crear pedidos. Completa el formulario para registrar un nuevo pedido.",
  "/orders/new": "Aquí puedes crear un nuevo pedido llenando el formulario.",
  "/orders/by-customer": "Aquí puedes ver todas las órdenes agrupadas por cliente.",
  "/stats": "Aquí puedes ver estadísticas de ventas, clientes y direcciones en gráficos.",
};

function analyzePage(pathname: string): string {
  // Busca hint por ruta exacta o por prefijo
  let hint = PAGE_HINTS[pathname];
  if (!hint) {
    // Busca por prefijo (por ejemplo, /customers/123/orders)
    const found = Object.keys(PAGE_HINTS).find((k) => pathname.startsWith(k));
    hint = found ? PAGE_HINTS[found] || "" : "";
  }
  return (
    hint ||
    "No tengo información específica para esta página, pero puedes navegar usando el menú superior o consultar las secciones principales."
  );
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "¡Hola! Soy tu asistente. Pregúntame qué puedes hacer en esta página o pide ayuda sobre el sistema." }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMsg: { from: "user"; text: string } = { from: "user", text: input };
    let botText = "";
    const q = input.trim().toLowerCase();

    // Si el usuario pide ayuda o pregunta por la página, responde analizando la ruta
    if (
      q.includes("qué puedo hacer") ||
      q.includes("ayuda") ||
      q.includes("analiza la página") ||
      q.includes("dónde estoy") ||
      q.includes("para qué sirve esta página") ||
      q.includes("cómo funciona")
    ) {
      botText = analyzePage(location.pathname);
    } else {
      // Respuesta genérica si no reconoce la pregunta
      botText =
        "Puedo ayudarte a entender qué puedes hacer en cada página. Pregúntame por ejemplo: '¿Qué puedo hacer aquí?' o 'Ayuda'.";
    }

    const botMsg: { from: "bot"; text: string } = { from: "bot", text: botText };
    setMessages((msgs) => [...msgs, userMsg, botMsg]);
    setInput("");
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: open ? "none" : "block"
        }}
      >
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 56,
            height: 56,
            fontSize: 28,
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            cursor: "pointer"
          }}
          aria-label="Abrir chatbot"
        >
          💬
        </button>
      </div>
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 340,
            maxWidth: "95vw",
            height: 420,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(33,150,243,0.18)",
            zIndex: 10000,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              background: "#1976d2",
              color: "#fff",
              padding: "12px 16px",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              fontWeight: 600,
              fontSize: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            Asistente
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 22,
                cursor: "pointer"
              }}
              aria-label="Cerrar chatbot"
            >
              ×
            </button>
          </div>
          <div
            style={{
              flex: 1,
              padding: "12px 10px",
              overflowY: "auto",
              background: "#f6f8fa"
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  margin: "8px 0",
                  textAlign: msg.from === "user" ? "right" : "left"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background: msg.from === "user" ? "#1976d2" : "#e3eafc",
                    color: msg.from === "user" ? "#fff" : "#222",
                    borderRadius: 12,
                    padding: "7px 14px",
                    maxWidth: "80%",
                    fontSize: 15
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            style={{
              display: "flex",
              borderTop: "1px solid #eee",
              padding: 8,
              background: "#fff",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16
            }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 15,
                outline: "none"
              }}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) handleSend();
              }}
            />
            <button
              type="submit"
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                marginLeft: 8,
                padding: "0 18px",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;