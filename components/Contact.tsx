import Image from "next/image";

export default function Contact() {
  const partners = [
    { name: "Bando Chain", file: "bandologo.png", width: 120 },
    { name: "DRB Industrial", file: "drblogo.png", width: 220 },
    { name: "Joyroll", file: "Joyroll.png", width: 250 },
    { name: "Mackchain", file: "mackchainlogo.avif", width: 180 },
    { name: "Shining", file: "shininglogo.png", width: 120 },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white pt-12 pb-20"
    >
      {/* Background */}

      <div className="absolute inset-0">
        <Image
          src="/images/kaitak.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover opacity-5 blur-sm saturate-50"
        />

        <div className="absolute inset-0 bg-white/95" />
      </div>

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Contact */}

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Contact Us
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            We are ready to support your industrial projects and procurement
            requirements.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-2">

          <div>

            <h3 className="text-2xl font-bold">
              ProThai Inter Supply & Solution Co.,Ltd
            </h3>

            <p className="mt-2 font-semibold text-blue-600">
              Mr.Waiyawit Waiyakorn (Managing Director)
            </p>

            <div className="mt-8 space-y-6 text-gray-700">

              <div>
                <p className="font-semibold">📍 Address</p>

                <p>
                  121/259 Moo 5, Pak Kret Subdistrict, Pak Kret District
                  <br />
                  Nonthaburi, 11120, Thailand
                </p>
              </div>

              <div>
                <p className="font-semibold">☎ Phone</p>
                <p>+66 (0)2-1257096</p>
              </div>

              <div>
                <p className="font-semibold">✉ Email</p>
                <p>sales@prothaiinter.com</p>
              </div>

            </div>

          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-xl">

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.192534567232!2d100.5463433!3d13.9094125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e28359f8ff9a6d%3A0x7242dd9ad9238a1c!2z4LiV4Li24LiB KaitakIOC4iuC4seC5iSA1!5e0!3m2!1sth!2sth!4v1719642000000!5m2!1sth!2sth"
              width="100%"
              height="420"
              loading="lazy"
              allowFullScreen
            />

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