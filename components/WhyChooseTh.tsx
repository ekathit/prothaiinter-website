"use client";

import { motion } from "framer-motion";
import {
  Cog,
  ShieldCheck,
  Globe,
  Headset,
} from "lucide-react";

export default function WhyChooseTH() {
  return (
    <section className="bg-white pt-14 pb-2 lg:pt-24 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            ทำไมต้องเลือก PROTHAI
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            พันธมิตรอุตสาหกรรมที่คุณไว้วางใจ
          </h2>

          <p className="mt-5 text-base leading-8 text-gray-600 lg:text-lg">
            เราผสานความเชี่ยวชาญด้านวิศวกรรม การคัดเลือกผู้ผลิตที่เชื่อถือได้
            การควบคุมคุณภาพ และการสนับสนุนที่รวดเร็ว
            เพื่อช่วยลดความเสี่ยง เพิ่มประสิทธิภาพการดำเนินงาน
            และสร้างคุณค่าให้ธุรกิจของคุณในระยะยาว
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
              การสนับสนุนด้านวิศวกรรม
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600 lg:mt-4 lg:text-base lg:leading-7">
              ให้คำปรึกษาด้านวิศวกรรมและช่วยคัดเลือกผลิตภัณฑ์ที่เหมาะสมกับการใช้งานในแต่ละอุตสาหกรรม
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
              การควบคุมคุณภาพ
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600 lg:mt-4 lg:text-base lg:leading-7">
              ประสานงานและควบคุมคุณภาพ พร้อมการตรวจสอบโดยหน่วยงานอิสระตามมาตรฐานสากล
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
              ผู้ผลิตที่เชื่อถือได้
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600 lg:mt-4 lg:text-base lg:leading-7">
              ร่วมงานกับผู้ผลิตที่ผ่านการคัดเลือกอย่างเข้มงวด เพื่อส่งมอบสินค้าที่มีคุณภาพและเชื่อถือได้
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
              บริการหลังการขาย
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-600 lg:mt-4 lg:text-base lg:leading-7">
              พร้อมให้การสนับสนุนด้านเทคนิค การจัดหาอะไหล่ และการบริการที่รวดเร็ว เพื่อให้เครื่องจักรทำงานได้อย่างต่อเนื่องและมีประสิทธิภาพ
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}