// src/app/components/Splash.tsx

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Splash({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center flex-col overflow-hidden"
          suppressHydrationWarning
        >
          {/* Background image dengan blend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center mix-blend-soft-light"
            style={{ backgroundImage: "url('/images/download.jpeg')" }}
          />

          {/* Mist putih transparan */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
          />

          {/* Gradient overlay biar lebih elegan */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent" />

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-3xl md:text-4xl font-semibold tracking-wide text-[#b89452]"
          >
            Undangan Pernikahan
          </motion.h1>

          {/* Loading bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "90%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="relative z-10 mt-6 h-[3px] bg-[#d4af37]/40 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2 }}
              className="h-full bg-[#d4af37]"
            />
          </motion.div>
        </motion.div>
      ) : (
        children
      )}
    </AnimatePresence>
  );
}
