import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { SiLine } from "react-icons/si";
import { MdOutlineMail } from "react-icons/md";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Contact() {
  const partners = [
    { name: "Bando Chain", file: "bandologo.png", width: 120 },
    { name: "DRB Industrial", file: "drblogo.png", width: 220 },
    { name: "Joyroll", file: "Joyroll.png", width: 250 },
    { name: "Mackchain", file: "mackchainlogo.avif", width: 180 },
    { name: "Shining", file: "shininglogo.png", width: 120 },
    { name: "doublearrow", file: "doublearrowlogo.jpg", width: 120 },
    { name: "dongyang", file: "dongyanglogo.png", width: 120 },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white pt-12 pb-20"
    >
      {/* Background */}

<div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: "url('/images/backgroundcloud.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    opacity: 0.12,
  }}
/>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We are ready to support your industrial projects and procurement
            requirements.
          </p>
        </div>

       {/* Main 3-Column Layout */}
<div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
  
  {/* 1) รายละเอียดติดต่อ (ฝั่งซ้าย - ถอดกรอบ/เงา/พื้นหลังออกทั้งหมด) */}
  <div className="lg:col-span-3 flex flex-col justify-between py-1">
    <div>
      <h3 className="text-xl font-bold text-gray-900 leading-snug">
        ProThai Inter Supply & Solution Co.,Ltd
      </h3>

      <div className="mt-6 space-y-4 text-gray-700">
        <div>
          <p className="flex items-center gap-2 font-semibold text-gray-900 text-base">
  <FaMapMarkerAlt className="text-lg text-red-500" />
  Address
</p>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">
            47/341 Kaitak Building, 5th Floor, Popular Road, Banmai, Pak Kret
            <br />
            Nonthaburi, 11120, Thailand
          </p>
        </div>

        <div>
          <p className="flex items-center gap-2 font-semibold text-gray-900 text-base">
  <FaPhoneAlt className="text-lg" />
  Phone
</p>
          <p className="mt-1 text-sm text-gray-600">+66 (0)2-125-7096</p>
          <p className="text-sm text-gray-600">+66 (0)62-891-9962</p>
        </div>

      <div className="mt-4">
  <div className="flex items-center gap-2">
   <p className="flex items-center gap-2 font-semibold text-gray-900 text-base">
  <MdOutlineMail className="text-xl" />
  Email
</p>

    <a
      href="mailto:sales@prothaiinter.com"
      className="text-base text-gray-600 hover:text-blue-600"
    >
      sales@prothaiinter.com
    </a>
  </div>
</div>

<div className="mt-6">
  <p className="font-semibold text-gray-900 text-base flex items-center gap-2">
    <FaWhatsapp className="text-green-500 text-xl" />
    WhatsApp
  </p>

  <a
    href="https://wa.me/66888695167"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-1 block text-base text-gray-600 hover:text-green-600"
  >
    +66 (0)88-869-5167
  </a>
</div>

<div className="mt-6">
  <p className="flex items-center gap-2 text-base font-semibold text-gray-900">
    <SiLine className="text-xl text-green-500" />
    LINE
  </p>

  <a
    href="https://line.me/ti/p/hZ9wkHOgBO"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-1 block text-base text-gray-600 hover:text-green-600"
  >
    Connect via LINE
  </a>
        </div>
      </div>
    </div>
  </div>

  {/* 2) รูปภาพตรงกลาง (col-span-5) */}
  <div className="lg:col-span-5 grid grid-cols-2 gap-3">
    {/* ฝั่งซ้ายของโซนกลาง (50%): รูป kaitakbuilding ใหญ่ที่สุด */}
    <div className="relative h-full min-h-[380px] w-full overflow-hidden rounded-2xl border border-gray-100 shadow-md">
      <Image
        src="/images/kaitakbuilding.jpg"
        alt="Kaitak Building"
        fill
        className="object-cover transition-transform duration-300 hover:scale-[1.02]"
      />
    </div>

    {/* ฝั่งขวาของโซนกลาง (50%): อีก 2 รูปวางซ้อนกันแนวตั้ง */}
    <div className="flex flex-col gap-3 h-full justify-between">
      <div className="relative h-1/2 w-full overflow-hidden rounded-2xl border border-gray-100 shadow-md">
        <Image
          src="/images/frontbuilding.jpg"
          alt="Front Building"
          fill
          className="object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>
      <div className="relative h-1/2 w-full overflow-hidden rounded-2xl border border-gray-100 shadow-md">
        <Image
          src="/images/office.jpg"
          alt="ProThai Office"
          fill
          className="object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>
    </div>
  </div>

  {/* 3) Google Map (ฝั่งขวา - col-span-4) */}
  <div className="lg:col-span-4 flex flex-col min-h-[380px]">
    <div className="h-full w-full overflow-hidden rounded-2xl border border-gray-200 shadow-xl">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.192534567232!2d100.5463433!3d13.9094125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e28359f8ff9a6d%3A0x7242dd9ad9238a1c!2z4LiV4Li24LiB KaitakIOC4iuC4seC5iSA1!5e0!3m2!1sth!2sth!4v1719642000000!5m2!1sth!2sth"
        width="100%"
        height="100%"
        style={{ minHeight: "380px" }}
        loading="lazy"
        allowFullScreen
      />
    </div>
  </div>

</div>

        {/* Manufacturing Partners */}
        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">
              Our Manufacturing Partners
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Trusted manufacturing partners across Asia.
            </p>
          </div>

          <div className="relative mt-14 overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

            <div className="partner-marquee flex w-max items-center">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex h-28 shrink-0 items-center justify-center px-14"
                >
                  <Image
                    src={`/images/${partner.file}`}
                    alt={partner.name}
                    width={partner.width}
                    height={90}
                    className="object-contain transition-all duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 flex flex-col items-center justify-between border-t border-gray-200 pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            © 2026 PROThai Inter Supply & Solution. All Rights Reserved.
          </p>
          <p className="mt-3 md:mt-0">
            Industrial Supply & Engineering Solutions
          </p>
        </div>

      </div>
    </section>
  );
}