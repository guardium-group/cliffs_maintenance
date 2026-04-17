"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, Mail, Clock, MapPin, Navigation,
  Truck, Headphones, AlertTriangle,
  Facebook, Instagram, Twitter,
  Menu as MenuIcon, X, ExternalLink, ArrowRight,
} from "lucide-react";
import { MarketingPopup } from "@/components/MarketingPopup";

// ── Impound section expires 60 days from April 10 2026 ───────────────────────
const IMPOUND_EXPIRY = new Date("2026-06-09T23:59:59");

const MAPS_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2589.7847183583226!2d-113.4189796232592!3d53.49607917233303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x53a0197c2ac9a557%3A0x10698418c091ee96!2sGuardium%20Towing%20Services!5e1!3m2!1sen!2sca!4v1770702802667!5m2!1sen!2sca";
const MAPS_DIRECTIONS = "https://maps.google.com/?q=Cliffs+Towing+Edmonton+Canada";

const statusItems = [
  { name: "Emergency Dispatch",  icon: Phone,      online: true  },
  { name: "Roadside Assistance", icon: Truck,      online: true  },
  { name: "Phone Support",       icon: Headphones, online: true  },
  { name: "Online Booking",      icon: Clock,      online: false },
];

// ── Framer variants (spring physics per tasteskill) ───────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};
const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Announcement banner
// ─────────────────────────────────────────────────────────────────────────────
function AnnouncementBanner({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
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
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">Live</span>
            </span>
            <span className="hidden sm:block h-3 w-px bg-white/30 shrink-0" />
            <span className="text-[11px] font-medium text-white/90 truncate">
              Website under maintenance — Towing services remain fully operational 24/7
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+17804511555"
              className="flex items-center gap-1.5 text-[11px] font-semibold text-white/80 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3" strokeWidth={2} />
              <span className="hidden sm:inline">+1 (780) 451-1555</span>
            </a>
            <a
              href="tel:+17804511555"
              className="hidden sm:flex items-center gap-1 text-[10px] font-bold bg-white text-[#ce0000] px-2.5 py-0.5 rounded-full hover:bg-white/90 transition-colors"
            >
              Book a Tow →
            </a>
            <button
              onClick={onClose}
              aria-label="Dismiss announcement"
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating pill header
// ─────────────────────────────────────────────────────────────────────────────
const mobileItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, type: "spring" as const, stiffness: 100, damping: 20 },
  }),
};

function SiteHeader() {
  const [scrolled,  setScrolled]  = useState(false);
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
      className="fixed top-9 inset-x-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
    >
      <div className="container mx-auto px-2 lg:max-w-[1440px] py-3 backdrop-blur-lg">
        {/* Pill */}
        <div className={[
          "flex items-center justify-between border bg-white/96 backdrop-blur-xl rounded-3xl py-3 px-4 transition-all duration-300",
          scrolled
            ? "border-neutral-200/80 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.10)]"
            : "border-neutral-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.05)]",
        ].join(" ")}>

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
              className="flex items-center justify-between gap-3 text-xs sm:text-[13px] font-semibold text-white px-4 py-2.5 rounded-full"
              style={{
                background: "#ce0000",
                border: "1px solid rgba(180,0,0,0.35)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)",
              }}
              whileHover={{ backgroundColor: "#b50000" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                </motion.span>
                <span className="hidden sm:inline">+1 (780) 451-1555</span>
                <span className="sm:hidden">Call Now</span>
              </div>
            </motion.a>

            <button
              className="lg:hidden p-2 rounded-full hover:bg-neutral-100 transition-colors duration-200"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div key="close"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X className="h-5 w-5 text-neutral-700" strokeWidth={2} />
                  </motion.div>
                ) : (
                  <motion.div key="open"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <MenuIcon className="h-5 w-5 text-neutral-700" strokeWidth={2} />
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
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="lg:hidden mt-2 rounded-2xl overflow-hidden bg-white/98 backdrop-blur-xl border border-neutral-100 shadow-xl"
            >
              <div className="px-4 py-4 space-y-1">
                {[
                  { label: "Impounded Vehicles", icon: AlertTriangle, href: "#impounded-vehicles", external: false },
                  { label: "Guardium Towing",    icon: ExternalLink,  href: "https://guardiumtowing.ca", external: true },
                ].map((item, i) => (
                  <motion.div key={item.label} custom={i} variants={mobileItemVariants} initial="hidden" animate="visible">
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      onClick={item.external ? () => setMenuOpen(false) : scrollToImpound}
                      className="flex items-center gap-3 py-3 px-3 rounded-xl text-sm font-medium text-neutral-700 hover:bg-red-50 hover:text-[#ce0000] transition-colors"
                    >
                      <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                      {item.label}
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  custom={2} variants={mobileItemVariants} initial="hidden" animate="visible"
                  className="pt-3 border-t border-neutral-100"
                >
                  <a href="tel:+17804511555" className="flex items-center gap-2 px-3 py-2 text-[#ce0000] font-semibold text-sm">
                    <Phone className="h-4 w-4" strokeWidth={2} />
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

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────────
function SiteFooter() {
  const socials = [
    { href: "https://www.facebook.com/guardiumgroup",    Icon: Facebook,  label: "Facebook"  },
    { href: "https://www.instagram.com/guardium.group/", Icon: Instagram, label: "Instagram" },
    { href: "https://x.com/group_guardium",              Icon: Twitter,   label: "Twitter"   },
  ];

  return (
    <footer className="bg-[#511010] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative">
        {/* Contact strip */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 py-5 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-10">
              <a href="tel:+17804511555"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
                <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                +1 (780) 451-1555
              </a>
              <a href="mailto:dispatch@cliffstowing.com"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                dispatch@cliffstowing.com
              </a>
              <span className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                4918 Roper Rd NW Suite 206, Edmonton, AB
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="container mx-auto px-4 py-4 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <Image
                src="/cliffs_logo.png"
                alt="Cliff's Towing"
                width={100}
                height={28}
                className="h-7 w-auto object-contain brightness-0 invert opacity-50"
              />
              <div className="flex items-center gap-2">
                {socials.map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white hover:text-[#511010] transition-all duration-200">
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
              <p className="text-xs text-white/35">
                &copy; {new Date().getFullYear()} Cliff&apos;s Towing Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export default function MaintenanceClient() {
  const [showBanner, setShowBanner] = useState(true);
  const [showPopup,  setShowPopup]  = useState(false);
  const showImpound = new Date() < IMPOUND_EXPIRY;

  useEffect(() => {
    if (localStorage.getItem("popup_dismissed") === "1") return;
    const timer = setTimeout(() => setShowPopup(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem("popup_dismissed", "1");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">

      {/* Marketing popup */}
      <AnimatePresence>
        {showPopup && <MarketingPopup onClose={handleClosePopup} />}
      </AnimatePresence>

      {/* Announcement banner */}
      <AnimatePresence>
        {showBanner && <AnnouncementBanner onClose={() => setShowBanner(false)} />}
      </AnimatePresence>

      {/* Fixed header */}
      <SiteHeader />

      {/* Spacer: banner (36px) + header (~96px) */}
      <div className={showBanner ? "h-[132px] shrink-0" : "h-[96px] shrink-0"} />

      {/* Noise texture — tactile feel */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Main ──────────────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 md:px-8 lg:px-12 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto">

          {/* ── Hero grid ───────────────────────────────────────────────── */}
          <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-10 lg:gap-14 xl:gap-20 items-start py-12 lg:py-16 xl:py-20">

            {/* Left */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>

              {/* Eyebrow tag */}
              <motion.div variants={fadeInUp} className="mb-5">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[10px] uppercase font-semibold"
                  style={{
                    background: "#fff1f1",
                    color: "#c00000",
                    border: "1px solid #fecaca",
                    letterSpacing: "0.16em",
                  }}
                >
                  <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                  </span>
                  Ongoing Website Maintenance
                </span>
              </motion.div>

              {/* Headline — massive, tracking-tighter */}
              <motion.h1
                variants={fadeInUp}
                className="text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-6xl font-bold w-full text-neutral-900 tracking-tighter leading-none mb-6"
              >
                We&apos;re making
                things{" "}
                <motion.span
                  className="text-[#ce0000]"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.4 }}
                >
                  wayyy better.
                </motion.span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-base lg:text-[17px] text-neutral-500 leading-relaxed max-w-[60ch] mb-8"
              >
                Our website is temporarily offline for scheduled improvements.
                Our towing services remain fully operational 24 hours a day,
                7 days a week.
              </motion.p>

              {/* Status — clean divider list, no colored icon boxes */}
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl border border-neutral-100 bg-white overflow-hidden"
                style={{
                  boxShadow:
                    "0 1px 3px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
                }}
              >
                <div className="px-5 pt-4 pb-2.5 border-b border-neutral-50">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
                    Service Status
                  </p>
                </div>
                <div className="divide-y divide-neutral-50">
                  {statusItems.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeInUp}
                      className="flex items-center justify-between px-5 py-3.5"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-3.5 w-3.5 text-neutral-400 shrink-0" strokeWidth={1.5} />
                        <span className="text-[13px] font-medium text-neutral-700">{item.name}</span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-[4px] text-[11px] font-semibold ${
                          item.online
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.online ? "bg-green-500" : "bg-amber-500"}`} />
                        {item.online ? "Online" : "Upgrading"}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right — double-bezel map card */}
            <motion.div
              initial="hidden" animate="visible" variants={fadeIn}
              transition={{ delay: 0.25 }}
            >
              {/* Outer shell */}
              <div
                className="rounded-[2rem] p-[5px]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  boxShadow:
                    "0 40px 80px -16px rgba(0,0,0,0.10), 0 12px 32px -6px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.7) inset",
                }}
              >
                {/* Inner core */}
                <div
                  className="overflow-hidden bg-white"
                  style={{
                    borderRadius: "calc(2rem - 5px)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  {/* Map */}
                  <div className="relative h-[200px] lg:h-[250px]">
                    <iframe
                      src={MAPS_EMBED}
                      width="100%" height="100%"
                      style={{ border: 0 }}
                      allowFullScreen loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Cliffs Towing Location"
                      className="absolute inset-0"
                    />
                    <motion.a
                      href={MAPS_DIRECTIONS}
                      target="_blank" rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white text-neutral-800 pl-3 pr-3.5 py-2 rounded-full font-semibold text-xs border border-neutral-200"
                      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.10)" }}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Navigation className="h-3.5 w-3.5 text-[#ce0000]" strokeWidth={2} />
                      Get Directions
                    </motion.a>
                  </div>

                  {/* Contact */}
                  <div className="p-5 lg:p-6">
                    {/* Address */}
                    <div className="pb-4 border-b border-neutral-100">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400 mb-1.5">
                        Head Office
                      </p>
                      <p className="text-[13.5px] font-semibold text-neutral-800 leading-snug">
                        Cliffs Towing — Edmonton
                      </p>
                      <p className="text-[12px] text-neutral-500 mt-0.5 leading-relaxed">
                        4918 Roper Rd NW Suite 206, Edmonton, AB T6B 3T7
                      </p>
                    </div>

                    {/* Phone + email list */}
                    <div className="divide-y divide-neutral-100 mb-4">
                      <a
                        href="tel:+17804511555"
                        className="flex items-center justify-between py-3.5 group"
                      >
                        <div className="flex items-center gap-3">
                          <Phone className="h-3.5 w-3.5 text-neutral-400 shrink-0" strokeWidth={1.5} />
                          <span className="text-[13px] font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                            +1 (780) 451-1555
                          </span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-neutral-300 group-hover:text-neutral-500 transition-colors" strokeWidth={1.5} />
                      </a>
                      <a
                        href="mailto:dispatch@cliffstowing.ca"
                        className="flex items-center justify-between py-3.5 group"
                      >
                        <div className="flex items-center gap-3">
                          <Mail className="h-3.5 w-3.5 text-neutral-400 shrink-0" strokeWidth={1.5} />
                          <span className="text-[13px] font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors">
                            dispatch@cliffstowing.ca
                          </span>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-neutral-300 group-hover:text-neutral-500 transition-colors" strokeWidth={1.5} />
                      </a>
                    </div>

                    {/* CTA — rounded-full pill, button-in-button */}
                    <motion.a
                      href="tel:+17804511555"
                      className="flex items-center justify-between w-full px-4 py-[11px] rounded-full text-white font-semibold text-[13.5px]"
                      style={{
                        background: "#ce0000",
                        border: "1px solid rgba(180,0,0,0.35)",
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 1px 3px rgba(0,0,0,0.18)",
                      }}
                      whileHover={{ backgroundColor: "#b50000" }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="flex items-center gap-2.5">
                        <motion.span
                          animate={{ rotate: [0, 14, -14, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4.5 }}
                        >
                          <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                        </motion.span>
                        <span>Get Assistance Now</span>
                      </div>
                      <span
                        className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
                        style={{
                          background: "rgba(255,255,255,0.16)",
                          border: "1px solid rgba(255,255,255,0.22)",
                        }}
                      >
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                      </span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Impounded Vehicles Notice ──────────────────────────────── */}
          <AnimatePresence>
            {showImpound && (
              <motion.section
                id="impounded-vehicles"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.5 }}
                className="pb-4 scroll-mt-36"
              >
                {/* Divider */}
                <div className="flex items-center gap-4 mb-12">
                  <div className="flex-1 h-px bg-neutral-100" />
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.16em] whitespace-nowrap px-1">
                    Previous Management Notice
                  </span>
                  <div className="flex-1 h-px bg-neutral-100" />
                </div>

                {/* Outer shell — double-bezel, amber accent */}
                <div
                  className="rounded-[2rem] p-[5px]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(217,119,6,0.15)",
                    boxShadow:
                      "0 24px 60px -12px rgba(217,119,6,0.08), 0 8px 24px -4px rgba(0,0,0,0.05), 0 0 0 1px rgba(255,255,255,0.7) inset",
                  }}
                >
                  {/* Inner core */}
                  <div
                    className="overflow-hidden bg-white"
                    style={{ borderRadius: "calc(2rem - 5px)" }}
                  >
                    {/* Amber accent bar */}
                    <div className="h-[3px] w-full bg-amber-400" />

                    <div className="p-5 sm:p-6 lg:p-8">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-6">
                        <motion.div
                          className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0"
                          animate={{ rotate: [0, -3, 3, 0] }}
                          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                        >
                          <AlertTriangle className="h-4.5 w-4.5 text-amber-500" strokeWidth={1.5} />
                        </motion.div>
                        <div>
                          <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-neutral-900 leading-tight tracking-tight">
                            Old Management — Impounded Vehicles
                          </h2>
                          <p className="text-[13px] text-amber-600 font-medium mt-1">
                            Important notice for vehicles impounded before January 2026
                          </p>
                        </div>
                      </div>

                      {/* Notice box */}
                      <div
                        className="rounded-2xl p-5 lg:p-6 mb-6"
                        style={{
                          background: "#fffbeb",
                          border: "1px solid #fde68a",
                        }}
                      >
                        <p className="text-sm sm:text-[15px] text-neutral-700 leading-relaxed">
                          Vehicles impounded before January 2026 can be released between{" "}
                          <span className="font-semibold text-neutral-900">9 a.m. and 4 p.m.</span>,
                          Monday through Friday, at the previous owners&apos; impound lot located at{" "}
                          <span className="font-semibold text-neutral-900">10135 31 Avenue NW</span>.
                        </p>
                        <p className="text-sm sm:text-[15px] text-amber-700 font-semibold mt-3">
                          Impound fees will still apply.
                        </p>
                        <p className="text-sm sm:text-[15px] text-neutral-600 mt-3 leading-relaxed">
                          Please reach out via email at{" "}
                          <a
                            href="mailto:bneedham@edmtaxi.com"
                            className="font-semibold text-neutral-900 hover:text-[#ce0000] transition-colors underline underline-offset-2"
                          >
                            bneedham@edmtaxi.com
                          </a>{" "}
                          or call{" "}
                          <a
                            href="tel:7807333480"
                            className="font-semibold text-neutral-900 hover:text-[#ce0000] transition-colors underline underline-offset-2"
                          >
                            780-733-3480
                          </a>{" "}
                          for immediate assistance.
                        </p>
                      </div>

                      {/* Contact info — clean divider list */}
                      <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden mb-6"
                        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                        <a
                          href="https://maps.google.com/?q=10135+31+Avenue+NW+Edmonton"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 group hover:bg-neutral-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="h-3.5 w-3.5 text-neutral-400 shrink-0" strokeWidth={1.5} />
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-0.5">Location</p>
                              <p className="text-[13px] font-semibold text-neutral-800">10135 31 Avenue NW, Edmonton</p>
                            </div>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-neutral-300 group-hover:text-neutral-500 transition-colors" strokeWidth={1.5} />
                        </a>
                        <a
                          href="mailto:bneedham@edmtaxi.com"
                          className="flex items-center justify-between px-5 py-4 border-b border-neutral-100 group hover:bg-neutral-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Mail className="h-3.5 w-3.5 text-neutral-400 shrink-0" strokeWidth={1.5} />
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-0.5">Email</p>
                              <p className="text-[13px] font-semibold text-neutral-800">bneedham@edmtaxi.com</p>
                            </div>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-neutral-300 group-hover:text-neutral-500 transition-colors" strokeWidth={1.5} />
                        </a>
                        <a
                          href="tel:7807333480"
                          className="flex items-center justify-between px-5 py-4 group hover:bg-neutral-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Phone className="h-3.5 w-3.5 text-neutral-400 shrink-0" strokeWidth={1.5} />
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 mb-0.5">Call</p>
                              <p className="text-[13px] font-semibold text-neutral-800">780-733-3480</p>
                            </div>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-neutral-300 group-hover:text-neutral-500 transition-colors" strokeWidth={1.5} />
                        </a>
                      </div>

                      {/* CTAs — rounded-full pills, button-in-button */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <motion.a
                          href="mailto:bneedham@edmtaxi.com"
                          className="flex-1 flex items-center justify-between px-4 py-[11px] rounded-full text-white font-semibold text-[13.5px]"
                          style={{
                            background: "#171717",
                            border: "1px solid rgba(0,0,0,0.3)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.20)",
                          }}
                          whileHover={{ backgroundColor: "#262626" }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className="flex items-center gap-2.5">
                            <Mail className="h-3.5 w-3.5" strokeWidth={2} />
                            <span>Email About Your Vehicle</span>
                          </div>
                          <span
                            className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
                            style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.12)" }}
                          >
                            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                          </span>
                        </motion.a>

                        <motion.a
                          href="tel:7807333480"
                          className="flex-1 flex items-center justify-between px-4 py-[11px] rounded-full text-white font-semibold text-[13.5px]"
                          style={{
                            background: "#16a34a",
                            border: "1px solid rgba(22,163,74,0.4)",
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 1px 3px rgba(0,0,0,0.18)",
                          }}
                          whileHover={{ backgroundColor: "#15803d" }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className="flex items-center gap-2.5">
                            <motion.span
                              animate={{ rotate: [0, 14, -14, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
                            >
                              <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                            </motion.span>
                            <span>Call 780-733-3480</span>
                          </div>
                          <span
                            className="flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0"
                            style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.22)" }}
                          >
                            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                          </span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
