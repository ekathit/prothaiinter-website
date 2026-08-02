import Image from "next/image";
import Link from "next/link";

const industries = [
  {
    category: "Cement Industry",
    image: "/images/cementpro.png",
    customers: [
      "SCG Cement",
      "Asia Cement",
      "TPI Polene...",
    ],
  },
  {
    category: "Biomass Power Plant",
    image: "/images/biomasspro.png",
    customers: [
      "Glow SPP2",
      "PPP Green Complex",
      "Mae Moh...",
    ],
  },
  {
    category: "Paper & Pulp",
    image: "/images/paperpro.png",
    customers: [
      "SCG Packaging",
      "Siam Kraft Industry",
      "Panjapol...",
    ],
  },
  {
    category: "Sugar Industry",
    image: "/images/sugarpro.png",
    customers: [
      "Mitr Phol",
      "Thai Roong Ruang",
      "Khon Kaen Sugar...",
    ],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-white pt-10 pb-24 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <div className="text-center">

          <span className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Projects
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Selected Projects
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-600">
            Examples of industrial supply projects delivered across various industries.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {industries.map((item) => (
            <div
              key={item.category}
              className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}

              <div className="relative h-64 bg-slate-200">

                <Image
                  src={item.image}
                  alt={item.category}
                  fill
                  className="object-cover"
                />

              </div>

              {/* Content */}

              <div className="flex flex-1 flex-col p-7">

                <h3 className="text-2xl font-bold text-slate-900">
                  {item.category}
                </h3>

                <div className="mt-3 h-1 w-10 rounded bg-blue-600" />

                <ul className="mt-7 space-y-4 text-[15px] text-slate-500">

                  {item.customers.map((customer) => (
                    <li
                      key={customer}
                      className="flex items-center gap-3"
                    >
                      <span className="text-slate-400">▪</span>
                      {customer}
                    </li>
                  ))}

                </ul>

              </div>

            </div>
          ))}

        </div>

        {/* Button */}

        <div className="mt-12 flex justify-end">

          <Link
            href="/projects"
            className="rounded-xl bg-blue-600 px-7 py-4 text-base font-semibold text-white transition hover:bg-blue-700"
          >
            View More Projects →
          </Link>

        </div>

      </div>
    </section>
  );
}