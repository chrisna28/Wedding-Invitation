// src/app/components/Guestbook.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { inter } from "../fonts";
import { toast } from "sonner";

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load awal + realtime
  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel("guestbook-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          setMessages((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function loadMessages() {
    const { data } = await supabase
      .from("guestbook")
      .select("*")
      .order("id", { ascending: false });

    setMessages(data || []);
    setLoading(false);
  }

  async function submitMessage(e: any) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const { error } = await supabase
      .from("guestbook")
      .insert([{ name, message }]);

    if (!error) {
      toast.success("Ucapan berhasil dikirim");
      setMessage("");
    }
  }

  return (
    <section className="py-4 px-3 w-full flex flex-col items-center">
      {/* FORM */}
      <form
        onSubmit={submitMessage}
        className="w-full max-w-md space-y-4 bg-white/60 backdrop-blur-lg 
        border border-[#d4af37]/40 rounded-xl p-4 shadow-md"
      >
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${inter.className} w-full px-3 py-3 rounded-md 
          bg-white border border-[#d4af37]/40 text-black
          focus:outline-none focus:border-[#d4af37]`}
        />

        <textarea
          placeholder="Ucapan"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inter.className} w-full px-3 py-3 rounded-md 
          bg-white border border-[#d4af37]/40 text-black h-28 resize-none
          focus:outline-none focus:border-[#d4af37]`}
        ></textarea>

        <button
          className={`${inter.className} w-full py-3 rounded-md bg-[#d4af37] 
          text-black font-semibold shadow-lg hover:shadow-xl transition`}
        >
          Kirim Ucapan
        </button>
      </form>

      {/* GARIS PEMBATAS */}
      <div className="w-full max-w-md my-4 border-t border-[#d4af37]/40"></div>

      {/* LIST (SCROLLABLE) */}
      <div
        className="w-full max-w-md space-y-2.5 max-h-[380px] overflow-y-auto 
        pr-1"
      >
        {loading ? (
          <div className="text-center text-black/50">Memuat ucapan...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-black/50">Belum ada ucapan.</div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white/70 animate-fade backdrop-blur-lg border border-[#d4af37]/40 
              rounded-xl p-4 shadow-sm"
            >
              <div className="font-semibold text-black">{msg.name}</div>
              <div className="text-black/80 text-sm mt-1">{msg.message}</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
