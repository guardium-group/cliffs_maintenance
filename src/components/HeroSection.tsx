"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { fadeInUp, scaleIn, stagger } from "@/lib/motion";
import { statusItems } from "@/lib/constants";

export function HeroSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      className="order-1 text-center lg:text-left"
      initial="hidden"
      animate={controls}
      variants={stagger}
    >
      {/* Badge */}
      <motion.div
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
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
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[2rem] sm:text-4xl md:text-5xl lg:text-4xl xl:text-[3rem] font-medium text-neutral-900 tracking-[-0.02em] leading-[1.1] mb-5 lg:mb-6"
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
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.path
              d="M0 7 Q 50 0 100 7"
              stroke="#ce0000"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </motion.svg>
        </motion.span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={fadeInUp}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base lg:text-[17px] text-neutral-500 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-7 lg:mb-8"
      >
        Our website is temporarily offline for scheduled improvements.
        Our towing services remain fully operational 24/7.
      </motion.p>

      {/* Status grid */}
      <motion.div
        variants={scaleIn}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-2xl border border-neutral-200 p-4 lg:p-5 shadow-sm"
      >
        <p className="text-xs lg:text-sm font-semibold text-neutral-700 mb-4">
          Service Status
        </p>
        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {statusItems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.02)" }}
              className="flex items-center gap-3 py-3 px-3.5 rounded-xl bg-neutral-50 cursor-default"
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  item.online ? "bg-green-100" : "bg-amber-100"
                }`}
              >
                <item.icon
                  className={`h-4 w-4 ${item.online ? "text-green-600" : "text-amber-600"}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-neutral-800 truncate">
                  {item.name}
                </p>
                <p
                  className={`text-[11px] font-medium mt-0.5 ${
                    item.online ? "text-green-600" : "text-amber-600"
                  }`}
                >
                  {item.online ? "Online" : "Upgrading"}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
