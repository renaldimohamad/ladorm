"use client";

import { useState, useRef, useEffect } from "react";
import { handleQuestion } from "@/utils/ladormAssistant";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";

export default function LadormChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const send = () => {
    if (!input.trim()) return;

    const question = input;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botReply = handleQuestion(question);
      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
      setTyping(false);
    }, 600);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <>
      {/* Floating Bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 p-4 rounded-full shadow-2xl text-white
          bg-gradient-to-br from-[rgba(1,96,114,0.9)] to-[rgba(44,112,91,0.9)]
          hover:scale-110 transition-all duration-300"
        >
          <FiMessageCircle size={24} />
        </button>
      )}

      {/* Chat Box */}
      <div
        className={`z-100 fixed bottom-6 right-6 w-[360px] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 backdrop-blur-xl ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 text-white bg-gradient-to-r from-[rgba(1,96,114,0.9)] to-[rgba(44,112,91,0.9)] flex justify-between items-center">
          <div>
            <h3 className="text-sm font-semibold tracking-wide">
              LADorm Assistant
            </h3>
            <p className="text-xs opacity-90">Informasi penghuni asrama</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="hover:rotate-90 transition-transform duration-300"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto px-5 py-4 space-y-4 bg-white text-sm">
          {messages.length === 0 && (
            <div className="text-gray-500 text-xs">
              👋 Halo! Kamu bisa tanya tentang jurusan, alumni, atau asal
              daerah.
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] px-4 py-2 rounded-2xl leading-relaxed ${
                m.role === "user"
                  ? "ml-auto text-white bg-gradient-to-r from-[rgba(1,96,114,0.9)] to-[rgba(44,112,91,0.9)] shadow-md"
                  : "bg-gray-100 text-gray-800 shadow-sm"
              }`}
            >
              {m.text}
            </div>
          ))}

          {typing && <TypingDots />}

          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="px-4 py-3 bg-white border-t flex items-center gap-3">
          <input
            className="flex-1 text-gray-800 bg-gray-100 rounded-full px-4 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-[rgba(1,96,114,0.5)]
            placeholder:text-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pertanyaan..."
            onKeyDown={(e) => e.key === "Enter" && send()}
          />

          <button
            onClick={send}
            className="p-2 rounded-full text-white shadow-md
            bg-gradient-to-br from-[rgba(1,96,114,0.9)] to-[rgba(44,112,91,0.9)]
            hover:scale-110 transition-all duration-200"
          >
            <FiSend size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

/* Typing Indicator */
function TypingDots() {
  return (
    <div className="bg-gray-100 px-4 py-2 rounded-2xl w-fit shadow-sm">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-[rgba(1,96,114,0.8)] rounded-full animate-bounce" />
        <span className="w-2 h-2 bg-[rgba(1,96,114,0.8)] rounded-full animate-bounce delay-150" />
        <span className="w-2 h-2 bg-[rgba(1,96,114,0.8)] rounded-full animate-bounce delay-300" />
      </div>
    </div>
  );
}
