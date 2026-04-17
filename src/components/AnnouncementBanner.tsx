"use client";

import { motion } from "framer-motion";
import { Phone, X } from "lucide-react";

interface AnnouncementBannerProps {
  onClose: () => void;
}

export function AnnouncementBanner({ onClose }: AnnouncementBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-[60] bg-[#ce0000]"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-9 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/80">
                Live
              </span>
            </span>
            <span className="hidden sm:block h-3 w-px bg-white/30 shrink-0" />
            <span className="text-[11px] font-mono text-white/90 truncate">
              Website under maintenance — Towing services remain fully operational 24/7
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+17804511555"
              className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-white/80 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3" />
              <span className="hidden sm:inline">+1 (780) 451-1555</span>
            </a>
            <a
              href="tel:+17804511555"
              className="hidden sm:flex items-center gap-1 text-[10px] font-mono font-bold bg-white text-[#ce0000] px-2.5 py-0.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Book a Tow →
            </a>
            <button
              onClick={onClose}
              aria-label="Dismiss announcement"
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
