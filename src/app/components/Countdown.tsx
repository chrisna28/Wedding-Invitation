// src/app/components/Countdown.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Countdown() {
  const target = new Date("2026-01-02T00:00:00").getTime();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [finished, setFinished] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const tick = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTime({ d: 0, h: 0, m: 0, s: 0 });
        setFinished(true);      // tandai countdown selesai
        clearInterval(tick);    // hentikan interval
        return;
      }

      setTime({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(tick);
  }, []);

  if (!mounted) return null; // agar SSR aman

  const labels: Record<string, string> = {
    d: "Hari",
    h: "Jam",
    m: "Menit",
    s: "Detik",
  };

  return (
    <section id="countdown" className="pt-10 pb-6 text-center fade-in">
      <h2 className="text-xl font-semibold mb-4 text-[#4a3f35] tracking-wide">
        Hitungan Menuju Hari Bahagia
      </h2>

      {finished ? (
        <div className="text-2xl font-bold text-[#4a3f35]">
          Alhamdulillah, Hari Bahagia Telah Tiba!
        </div>
      ) : (
        <div className="flex justify-center gap-3">
          {Object.entries(time).map(([key, value]) => (
            <div
              key={key}
              className="bg-white/70 border border-[#d4af37]/40 rounded-xl w-20 py-3 shadow-md"
            >
              <div className="text-2xl font-bold text-[#4a3f35]">{value}</div>
              <div className="text-[11px] text-[#86755a] tracking-wide">
                {labels[key]}
              </div>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/details"
        className="inline-block mt-16 bg-[#d4af37] text-black px-6 py-2 rounded-full font-semibold shadow-lg text-sm hover:shadow-xl transition"
      >
        Lihat Undangan
      </Link>
    </section>
  );
}
