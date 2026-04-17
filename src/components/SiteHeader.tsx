"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, AlertTriangle, ExternalLink, Menu as MenuIcon, X } from "lucide-react";

const mobileItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToImpound(e: React.MouseEvent) {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById("impounded-vehicles")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.header
      className="fixed top-4 inset-x-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto px-2 lg:mx-auto lg:max-w-[1440px] py-3">
        {/* Pill */}
        <div
          className={[
            "flex items-center justify-between border bg-white/96 backdrop-blur-xl rounded-3xl py-3 px-4 transition-all duration-300",
            scrolled
              ? "border-gray-200/80 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)]"
              : "border-gray-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)]",
          ].join(" ")}
        >
          <Image
            src="/cliffs_logo.png"
            alt="Cliff's Towing"
            width={130}
            height={36}
            className="h-10 lg:h-12 w-auto object-contain shrink-0"
            priority
          />

          <div className="flex items-center gap-2">
            <motion.a
              href="tel:+17804511555"
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-[#ce0000] hover:bg-[#b50000] px-4 py-2.5 sm:px-5 sm:py-3 rounded-full transition-all duration-200 shadow-md shadow-[#ce0000]/20"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(206,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
              >
                <Phone className="h-3.5 w-3.5" />
              </motion.span>
              <span className="hidden sm:inline">+1 (780) 451-1555</span>
              <span className="sm:hidden">Call Now</span>
            </motion.a>

            <button
              className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 active:scale-95"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5 text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <MenuIcon className="h-5 w-5 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mt-2 rounded-2xl overflow-hidden bg-white/98 backdrop-blur-xl border border-gray-100 shadow-xl"
            >
              <div className="px-4 py-4 space-y-1">
                {[
                  { label: "Impounded Vehicles", icon: AlertTriangle, href: "#impounded-vehicles", external: false },
                  { label: "Guardium Towing",    icon: ExternalLink,  href: "https://guardiumtowing.ca", external: true },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      onClick={item.external ? () => setMenuOpen(false) : scrollToImpound}
                      className="flex items-center gap-3 py-3 px-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-[#ce0000] transition-colors duration-150"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  custom={2}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="pt-3 border-t border-gray-100"
                >
                  <a
                    href="tel:+17804511555"
                    className="flex items-center gap-2 px-3 py-2 text-[#ce0000] font-semibold text-sm"
                  >
                    <Phone className="h-4 w-4" />
                    +1 (780) 451-1555
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
