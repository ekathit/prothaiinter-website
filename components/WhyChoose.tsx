"use client";

import { motion } from "framer-motion";
import {
  Cog,
  ShieldCheck,
  Globe,
  Headset,
} from "lucide-react";

export default function WhyChooseEN() {
  return (
    <section className="bg-white pt-14 pb-2 lg:pt-24 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            WHY CHOOSE PROTHAI
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Your Reliable Industrial Partner
          </h2>

          <p className="mt-5 text-base leading-8 text-gray-600 lg:text-lg">
            We combine engineering expertise, trusted manufacturing partners,
            quality assurance and responsive support to reduce project risk,
            improve operational efficiency and deliver long-term value.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:mt-16 xl:grid-cols-4">

          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:p-8">

            <div className="absolute left-0 top-0 h-1 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />

            <motion.div
              whileHover={{
                rotate: [-5, 5, -5],
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                },
              }}
            >
              <Cog
                size={40}
                strokeWidth={2.2}
                className="text-blue-700"
              />
            </motion.div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900 lg:mt-6 lg:text-xl">
              Engineering Support
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600 lg:mt-4 lg:text-base lg:leading-7">
              Technical consultation and product selection tailored to your
              industrial applications.
            </p>

          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:p-8">

            <div className="absolute left-0 top-0 h-1 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />

            <motion.div
              whileHover={{
                rotate: [-5, 5, -5],
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                },
              }}
            >
              <ShieldCheck
                size={40}
                strokeWidth={2.2}
                className="text-blue-700"
              />
            </motion.div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900 lg:mt-6 lg:text-xl">
              Quality Assurance
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600 lg:mt-4 lg:text-base lg:leading-7">
              Product inspection and coordination with independent third-party
              inspection agencies.
            </p>

          </div>

          {/* Card 3 */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:p-8">

            <div className="absolute left-0 top-0 h-1 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />

            <motion.div className="inline-flex">
  <motion.div
    style={{ transformOrigin: "50% 50%" }}
    whileHover={{
      rotate: 360,
      transition: {
        duration: 3,
        ease: "linear",
        repeat: Infinity,
      },
    }}
  >
    <Globe
      size={40}
      strokeWidth={2.2}
      className="text-blue-700"
    />
  </motion.div>
</motion.div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900 lg:mt-6 lg:text-xl">
              Trusted Manufacturers
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600 lg:mt-4 lg:text-base lg:leading-7">
              Working with carefully selected manufacturers to deliver reliable
              industrial products.
            </p>

          </div>

          {/* Card 4 */}
          <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl lg:p-8">

            <div className="absolute left-0 top-0 h-1 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />

            <motion.div
              whileHover={{
                rotate: [-5, 5, -5],
                transition: {
                  duration: 0.5,
                  repeat: Infinity,
                },
              }}
            >
              <Headset
                size={40}
                strokeWidth={2.2}
                className="text-blue-700"
              />
            </motion.div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900 lg:mt-6 lg:text-xl">
              After Sales Support
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600 lg:mt-4 lg:text-base lg:leading-7">
              Reliable technical support, spare parts assistance, and responsive
              service to maximize equipment performance.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}