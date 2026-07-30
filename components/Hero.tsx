"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import HeroStats from "@/components/HeroStats";

export default function Hero() {
  const [startCount, setStartCount] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-slate-950 px-6 pt-32 lg:pt-20 text-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.78),rgba(15,23,42,0.88))]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold tracking-tight md:text-7xl"
        >
          PROTHAI
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-5 text-2xl font-semibold text-blue-200 md:text-3xl"
        >
          INTER SUPPLY &amp; SOLUTION CO., LTD.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl"
        >
          Reliable Partner for Industrial Supply,
          <br />
          Engineering Procurement and Technical Solutions.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <a
            href={`mailto:sales@prothaiinter.com?subject=Request%20for%20Quotation&body=Dear%20ProThai%20Team,%0D%0A%0D%0AWe%20would%20like%20to%20request%20a%20quotation%20for%20the%20following:%0D%0A%0D%0ACompany:%0D%0AContact%20Person:%0D%0AEmail:%0D%0APhone:%0D%0A%0D%0AProduct%20/%20Service%20Required:%0D%0A%0D%0AProject%20Details:%0D%0A%0D%0APlease%20attach%20your%20drawings%20or%20specifications.%0D%0A%0D%0AThank%20you.%0D%0A`}
            className="rounded-xl bg-blue-600 px-9 py-4 text-base font-bold text-white shadow-xl transition hover:scale-105 hover:bg-blue-700"
          >
            Get a Quote
          </a>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          onAnimationComplete={() => setStartCount(true)}
        >
          <HeroStats start={startCount} />
        </motion.div>

      </div>
    </section>
  );
}