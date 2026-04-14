"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion";
import { gsap } from "gsap";
import {
  Phone, Mail, Clock, MapPin, Navigation,
  Truck, Headphones, AlertTriangle,
  Facebook, Instagram, Twitter,
  Menu as MenuIcon, X, ExternalLink,
} from "lucide-react";

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

// ── Framer variants ───────────────────────────────────────────────────────────
const fadeInUp    = { hidden: { opacity: 0, y: 30 },    visible: { opacity: 1, y: 0 } };
const fadeIn      = { hidden: { opacity: 0 },           visible: { opacity: 1 } };
const scaleIn     = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };
const slideInRight = { hidden: { opacity: 0, x: 50 },  visible: { opacity: 1, x: 0 } };
const stagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Announcement banner
// ─────────────────────────────────────────────────────────────────────────────
function AnnouncementBanner() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] bg-[#ce0000]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-9 gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="hidden sm:flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/80">Live</span>
            </span>
            <span className="hidden sm:block h-3 w-px bg-white/30 shrink-0" />
            <span className="text-[11px] font-mono text-white/90 truncate">
              Website under maintenance — Towing services remain fully operational 24/7
            </span>
          </div>
          <a
            href="tel:+17804511555"
            className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-white/80 hover:text-white transition-colors shrink-0"
          >
            <Phone className="h-3 w-3" />
            <span className="hidden sm:inline">+1 (780) 451-1555</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating pill header (Cliffs Towing style)
// ─────────────────────────────────────────────────────────────────────────────
const mobileItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

function SiteHeader() {
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
      className="fixed top-9 inset-x-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto max-w-7xl py-3">
        {/* Pill */}
        <div className={[
          "flex items-center justify-between border bg-white/96 backdrop-blur-xl rounded-full py-3 px-6 transition-all duration-300",
          scrolled
            ? "border-gray-200/80 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.12)]"
            : "border-gray-100 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.06)]",
        ].join(" ")}>

          {/* Logo */}
          <Image
            src="/cliffs_logo.png"
            alt="Cliff's Towing"
            width={130}
            height={36}
            className="h-12 w-auto object-contain shrink-0"
            priority
          />

          {/* Desktop nav */}
          {/* <nav className="hidden lg:flex items-center gap-1">
            <a
              href="#impounded-vehicles"
              onClick={scrollToImpound}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-[#ce0000] hover:bg-red-50 transition-all duration-200"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              Impounded Vehicles
            </a>
            <a
              href="https://guardiumtowing.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-[#ce0000] hover:bg-red-50 transition-all duration-200"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Guardium Towing
            </a>
          </nav> */}

          {/* Right: CTA + hamburger */}
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
                  <motion.div key="close"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-5 w-5 text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div key="open"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
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
                  <motion.div key={item.label} custom={i} variants={mobileItemVariants} initial="hidden" animate="visible">
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
                  custom={2} variants={mobileItemVariants} initial="hidden" animate="visible"
                  className="pt-3 border-t border-gray-100"
                >
                  <a href="tel:+17804511555" className="flex items-center gap-2 px-3 py-2 text-[#ce0000] font-semibold text-sm">
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

// ─────────────────────────────────────────────────────────────────────────────
// Footer — Guardium Group brand color (#511010)
// ─────────────────────────────────────────────────────────────────────────────
function SiteFooter() {
  const socials = [
    { href: "https://www.facebook.com/guardiumgroup",    Icon: Facebook,  label: "Facebook"  },
    { href: "https://www.instagram.com/guardium.group/", Icon: Instagram, label: "Instagram" },
    { href: "https://x.com/group_guardium",              Icon: Twitter,   label: "Twitter"   },
  ];

  return (
    <footer className="bg-[#511010] relative overflow-hidden">
      {/* Subtle background orbs (matching Guardium Group footer) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative">
        {/* Contact strip */}
        <div className="border-b border-white/10">
          <div className="container mx-auto px-4 py-5 max-w-7xl">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-10">
              <a href="tel:+17804511555"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm">
                <Phone className="h-4 w-4 shrink-0" />
                +1 (780) 451-1555
              </a>
              <a href="mailto:dispatch@cliffstowing.com"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm">
                <Mail className="h-4 w-4 shrink-0" />
                dispatch@cliffstowing.com
              </a>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="h-4 w-4 shrink-0" />
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
                className="h-7 w-auto object-contain brightness-0 invert opacity-60"
              />

              <div className="flex items-center gap-2">
                {socials.map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-[#511010] transition-all duration-200">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <p className="text-xs text-white/40">
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
  const orbRef1 = useRef<HTMLDivElement>(null);
  const orbRef2 = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const showImpound = new Date() < IMPOUND_EXPIRY;

  useEffect(() => {
    if (orbRef1.current && orbRef2.current) {
      gsap.to(orbRef1.current, { y: 30, x: 20, duration: 6, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(orbRef2.current, { y: -25, x: -15, duration: 5, ease: "sine.inOut", repeat: -1, yoyo: true });
    }
  }, []);

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] relative overflow-x-hidden">

      {/* Fixed header */}
      {/* <AnnouncementBanner /> */}
      <SiteHeader />
      {/* Spacer: banner h-9(36px) + header py-3+pill+py-3 ~96px = 132px */}
      <div className="h-[132px] shrink-0" />

      {/* Noise texture */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div
          ref={orbRef1}
          className="absolute top-[-20%] right-[-15%] w-[600px] lg:w-[800px] h-[600px] lg:h-[800px] rounded-full blur-[100px] lg:blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(206,0,0,0.06) 0%, rgba(206,0,0,0.02) 50%, transparent 100%)" }}
        />
        <div
          ref={orbRef2}
          className="absolute bottom-[-15%] left-[-15%] w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] rounded-full bg-gradient-to-tr from-neutral-300/30 to-transparent blur-[80px] lg:blur-[100px]"
        />
      </div>

      {/* Main */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 md:px-8 lg:px-12 pb-10 lg:pb-14" ref={sectionRef}>
        <div className="max-w-7xl mx-auto flex flex-col">

          {/* Hero grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-20 items-start py-8 lg:py-12">

            {/* Left */}
            <motion.div
              className="order-1 text-center lg:text-left"
              initial="hidden" animate="visible" variants={stagger}
            >
              {/* Badge */}
              <motion.div
                variants={fadeInUp} transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full bg-white border border-neutral-200 px-4 py-2 mb-5 lg:mb-6 shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#ce0000] opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ce0000]" />
                </span>
                <span className="text-xs lg:text-sm font-medium text-neutral-700">
                  Ongoing Website Maintenance
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[2rem] sm:text-4xl md:text-5xl lg:text-5xl xl:text-[3.5rem] font-semibold text-neutral-900 tracking-[-0.02em] leading-[1.1] mb-5 lg:mb-6"
              >
                We&apos;re making things{" "}
                <motion.span
                  className="text-[#ce0000] relative inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
                >
                  wayyy better.
                  <motion.svg
                    className="absolute -bottom-1 lg:-bottom-1.5 left-0 w-full"
                    viewBox="0 0 100 8" preserveAspectRatio="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    <motion.path
                      d="M0 7 Q 50 0 100 7" stroke="#ce0000" strokeWidth="1"
                      fill="none" strokeLinecap="round" opacity="0.3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </motion.svg>
                </motion.span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base lg:text-[17px] text-neutral-500 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-7 lg:mb-8"
              >
                Our website is temporarily offline for scheduled improvements.
                Our towing services remain fully operational 24/7.
              </motion.p>

              {/* Status grid */}
              <motion.div variants={scaleIn} transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl border border-neutral-200 p-4 lg:p-5 shadow-sm"
              >
                <p className="text-xs lg:text-sm font-semibold text-neutral-700 mb-4">Service Status</p>
                <motion.div className="grid grid-cols-2 gap-3" variants={stagger} initial="hidden" animate="visible">
                  {statusItems.map((item, i) => (
                    <motion.div
                      key={i}
                      variants={fadeInUp} transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.02)" }}
                      className="flex items-center gap-3 py-3 px-3.5 rounded-xl bg-neutral-50 cursor-default"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.online ? "bg-green-100" : "bg-amber-100"}`}>
                        <item.icon className={`h-4 w-4 ${item.online ? "text-green-600" : "text-amber-600"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-neutral-800 truncate">{item.name}</p>
                        <p className={`text-[11px] font-medium mt-0.5 ${item.online ? "text-green-600" : "text-amber-600"}`}>
                          {item.online ? "Online" : "Upgrading"}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right — map + contact card */}
            <motion.div
              className="order-2"
              initial="hidden" animate="visible" variants={slideInRight}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -top-4 -right-4 w-24 h-24 lg:w-32 lg:h-32 bg-[#ce0000]/10 rounded-3xl blur-2xl"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-28 h-28 lg:w-36 lg:h-36 bg-neutral-200/50 rounded-3xl blur-2xl"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />

                <div className="relative bg-white rounded-2xl lg:rounded-3xl border border-neutral-200/80 shadow-2xl shadow-neutral-200/60 overflow-hidden">

                  {/* Map */}
                  <motion.div
                    className="relative h-44 sm:h-52 lg:h-56 bg-neutral-100"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <iframe
                      src={MAPS_EMBED} width="100%" height="100%"
                      style={{ border: 0 }} allowFullScreen loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Cliffs Towing Location"
                      className="absolute inset-0"
                    />
                    <motion.a
                      href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white hover:bg-neutral-50 text-neutral-800 pl-3 pr-3.5 py-2 rounded-full font-semibold text-xs shadow-lg hover:shadow-xl transition-all duration-200 border border-neutral-200"
                      whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Navigation className="h-3.5 w-3.5 text-[#ce0000]" />
                      Get Directions
                    </motion.a>
                  </motion.div>

                  {/* Contact info */}
                  <div className="p-5 lg:p-6">
                    {/* Address */}
                    <motion.div
                      className="flex items-start gap-3.5 pb-4 lg:pb-5 border-b border-neutral-100"
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#ce0000]/10 flex items-center justify-center shrink-0">
                        <MapPin className="h-5 w-5 text-[#ce0000]" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900 text-sm lg:text-base">Cliffs Towing Head Office</p>
                        <p className="text-neutral-500 text-xs lg:text-sm mt-0.5">4918 Roper Rd NW Suite 206, Edmonton, AB T6B 3T7</p>
                      </div>
                    </motion.div>

                    {/* Phone + Email */}
                    <motion.div
                      className="grid grid-cols-2 gap-3 pt-4 lg:pt-5"
                      variants={stagger} initial="hidden" animate="visible"
                    >
                      <motion.div className="text-center" variants={fadeInUp} transition={{ delay: 0.7 }}>
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mx-auto mb-2">
                          <Phone className="h-5 w-5 text-green-600" />
                        </div>
                        <motion.a href="tel:+17804511555"
                          className="font-semibold text-[11px] sm:text-xs lg:text-sm text-neutral-900 hover:text-[#ce0000] transition-colors leading-snug block"
                          whileHover={{ scale: 1.05 }}
                        >
                          +1 (780) 451-1555
                        </motion.a>
                      </motion.div>

                      <motion.div className="text-center" variants={fadeInUp} transition={{ delay: 0.8 }}>
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-2">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <motion.a href="mailto:dispatch@cliffstowing.com"
                          className="font-semibold text-[10px] sm:text-[12px] lg:text-xs text-neutral-900 hover:text-[#ce0000] transition-colors leading-snug block break-all"
                          whileHover={{ scale: 1.05 }}
                        >
                          dispatch@<wbr />cliffstowing.com
                        </motion.a>
                      </motion.div>
                    </motion.div>

                    {/* CTA */}
                    <motion.a
                      href="tel:+17804511555"
                      className="mt-5 flex items-center justify-center gap-2.5 w-full bg-[#ce0000] hover:bg-[#b50000] text-white py-3.5 lg:py-4 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#ce0000]/25"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(206,0,0,0.35)", y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Phone className="h-4 w-4" />
                      </motion.span>
                      Get Assistance Now — We are fully operational
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Impounded Vehicles Notice */}
          <AnimatePresence>
            {showImpound && (
              <motion.section
                id="impounded-vehicles"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="pb-2 scroll-mt-36"
              >
                {/* Divider */}
                <div className="flex items-center gap-4 mb-12">
                  <div className="flex-1 h-px bg-neutral-200" />
                  <span className="text-[10px] sm:text-xs font-semibold text-neutral-400 uppercase tracking-widest whitespace-nowrap px-1">
                    Previous Management Notice
                  </span>
                  <div className="flex-1 h-px bg-neutral-200" />
                </div>

                <div className="relative bg-white rounded-2xl lg:rounded-3xl border border-amber-200/80 shadow-lg shadow-amber-100/40 overflow-hidden">
                  <div className="h-1 w-full bg-linear-to-r from-amber-400 via-amber-500 to-amber-400" />

                  <div className="p-5 sm:p-6 lg:p-8">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6 lg:mb-7">
                      <motion.div
                        className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center shrink-0"
                        animate={{ rotate: [0, -3, 3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
                      >
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                      </motion.div>
                      <div>
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-neutral-900 leading-tight">
                          Old Management — Impounded Vehicles
                        </h2>
                        <p className="text-sm text-amber-600 font-medium mt-1">
                          Important notice for vehicles impounded before January 2026
                        </p>
                      </div>
                    </div>

                    {/* Notice */}
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 lg:p-6 mb-6">
                      <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                        Vehicles impounded before January 2026 can be released between{" "}
                        <span className="font-semibold text-neutral-900">9 a.m. and 4 p.m.</span>, Monday through Friday,
                        at the previous owners&apos; impound lot located at{" "}
                        <span className="font-semibold text-neutral-900">10135 31 Avenue NW</span>.
                      </p>
                      <p className="text-sm sm:text-base text-amber-700 font-semibold mt-3">
                        Impound fees will still apply.
                      </p>
                      <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
                        Please reach out via email at{" "}
                        <a href="mailto:bneedham@edmtaxi.com"
                          className="font-semibold text-neutral-900 hover:text-[#ce0000] transition-colors underline underline-offset-2">
                          bneedham@edmtaxi.com
                        </a>{" "}
                        or call{" "}
                        <a href="tel:7807333480"
                          className="font-semibold text-neutral-900 hover:text-[#ce0000] transition-colors underline underline-offset-2">
                          780-733-3480
                        </a>{" "}
                        for immediate assistance.
                      </p>
                    </div>

                    {/* Contact cards */}
                    <div className="grid sm:grid-cols-3 gap-3 lg:gap-4 mb-6">
                      <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-100 rounded-xl p-4 lg:p-5">
                        <div className="w-10 h-10 rounded-lg bg-[#ce0000]/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-5 w-5 text-[#ce0000]" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Location</p>
                          <p className="text-sm font-semibold text-neutral-900">10135 31 Avenue NW</p>
                        </div>
                      </div>

                      <motion.a href="mailto:bneedham@edmtaxi.com"
                        className="flex items-center gap-4 bg-neutral-50 border border-neutral-100 rounded-xl p-4 lg:p-5 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group"
                        whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.99 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                          <Mail className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Email</p>
                          <p className="text-sm font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors truncate">
                            bneedham@edmtaxi.com
                          </p>
                        </div>
                      </motion.a>

                      <motion.a href="tel:7807333480"
                        className="flex items-center gap-4 bg-neutral-50 border border-neutral-100 rounded-xl p-4 lg:p-5 hover:border-green-200 hover:bg-green-50/50 transition-colors group"
                        whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.99 }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                          <Phone className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider mb-0.5">Call</p>
                          <p className="text-sm font-semibold text-neutral-900 group-hover:text-green-700 transition-colors">
                            780-733-3480
                          </p>
                        </div>
                      </motion.a>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.a href="mailto:bneedham@edmtaxi.com"
                        className="flex-1 flex items-center justify-center gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-white py-3.5 lg:py-4 rounded-xl font-semibold text-sm transition-all duration-200"
                        whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}
                      >
                        <Mail className="h-4 w-4" />
                        Email About Your Vehicle
                      </motion.a>
                      <motion.a href="tel:7807333480"
                        className="flex-1 flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-700 text-white py-3.5 lg:py-4 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md shadow-green-600/20"
                        whileHover={{ scale: 1.02, y: -1, boxShadow: "0 12px 30px rgba(22,163,74,0.3)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.span
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 4 }}
                        >
                          <Phone className="h-4 w-4" />
                        </motion.span>
                        Call 780-733-3480
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
