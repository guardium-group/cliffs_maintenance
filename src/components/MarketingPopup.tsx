"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, X, ArrowRight } from "lucide-react";

interface MarketingPopupProps {
  onClose: () => void;
}

export function MarketingPopup({ onClose }: MarketingPopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.48)", backdropFilter: "blur(5px)" }}
      onClick={onClose}
    >
      {/* ── Outer shell — Double-Bezel ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="relative w-full max-w-[450px] rounded-[1.75rem] p-[5px]"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow:
            "0 40px 80px -16px rgba(0,0,0,0.14), 0 12px 32px -6px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5) inset",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Inner core ──────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden bg-white"
          style={{
            borderRadius: "calc(1.75rem - 5px)",
            boxShadow: "inset 0 1px 1px rgba(255,255,255,0.85)",
          }}
        >
          {/* ── Hero photo ─────────────────────────────────────────────── */}
          <div className="relative h-[250px] overflow-hidden">
            <Image
              src="/cliffs500rotator.jpg"
              alt="Cliff's Towing truck"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Bottom vignette for badge legibility */}
            
            {/* Close — liquid glass */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
              style={{
                background: "#ce0000",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.32)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.45)",
              }}
            >
              <X className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            </button>
          </div>

          {/* ── Body ────────────────────────────────────────────────────── */}
          <div className="px-5 pt-4 pb-5">
            {/* Eyebrow tag */}
            <div className="mb-3">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] bg-blue-500 text-white text-[9px] uppercase font-semibold"
                style={{
                  
                  
                  letterSpacing: "0.16em",
                }}
              >
                <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-60" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-100" />
                </span>
                Announcement
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-[21px] font-bold text-neutral-900 leading-tight tracking-tight my-4">
              We&apos;re Back &amp; Better Than Ever
            </h2>

            {/* Body copy */}
            <p className="text-[13.5px] text-neutral-500 leading-relaxed mb-4">
              <span className="text-[#ce0000]">
              Cliff&apos;s Towing
                              </span>{" "}
              is officially back under{" "}
              <span className="font-semibold text-neutral-700">
                new management
              </span>{" "}
              and operating at{" "}
              <span className="font-semibold text-neutral-700">
                full capacity
              </span>
              . Available 24 hours a day, every day.
            </p>
            <p className="text-[13.5px] text-neutral-500 leading-relaxed mb-4">
              Whether you need emergency roadside assistance, vehicle recovery,
              or transport services, Cliff’s Towing is here to help 24/7. We
              appreciate your patience during the transition and look forward to
              continuing to serve you.
            </p>

            {/* CTA — pill with button-in-button trailing icon */}
            

            {/* Dismiss */}
            
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
