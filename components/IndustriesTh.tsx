import Image from "next/image";

export default function Industries() {
  const industries = [
    {
      title: "Cement",
      image: "/images/cementind2.png",
    },
    {
      title: "Biomass",
      image: "/images/biomassind2.png",
    },
    {
      title: "Pulp & Paper",
      image: "/images/paperind2.png",
    },
    {
      title: "Palm Oil",
      image: "/images/palmoilind2.png",
    },
    {
      title: "Sugar",
      image: "/images/sugarind2.png",
    },
    {
      title: "Mining & Quarry",
      image: "/images/miningind2.png",
    },
  ];

  return (
    <section
      id="industries"
      className="bg-gray-50 pt-8 pb-10 lg:pt-16 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Industries
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            อุตสาหกรรมที่เราให้บริการ
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            เราให้การสนับสนุนผลิตภัณฑ์ในหลากหลายอุตสาหกรรม
          </p>

        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-2 gap-5 lg:grid-cols-3 lg:gap-8">

          {industries.map((industry) => (

            <div
              key={industry.title}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 shadow-md transition-all duration-300 hover:border-blue-600 hover:shadow-xl"
            >

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">

                <Image
                  src={industry.image}
                  alt={industry.title}
                  fill
                  className="
                    object-cover
                    origin-center
                    scale-[1.08]
                    brightness-[0.82]
                    transition-all
                    duration-700
                    ease-out
                    group-hover:scale-[1.12]
                    group-hover:brightness-100
                  "
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/10" />

                {/* Title */}
                <div className="absolute inset-0 flex items-center justify-center">

                  <h3
                    className="
                      px-6
                      text-center
                      text-xl
                      font-bold
                      text-white
                      drop-shadow-[0_3px_10px_rgba(0,0,0,0.8)]
                      transition-all
                      duration-500
                      group-hover:-translate-y-1
                      sm:text-2xl
                      lg:text-4xl
                    "
                  >
                    {industry.title}
                  </h3>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}