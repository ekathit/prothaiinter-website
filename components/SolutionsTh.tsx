import Image from "next/image";

export default function SolutionsTH() {
  const solutions = [
    {
      title: "โซ่อุตสาหกรรม",
      desc: "จำหน่ายโซ่ลำเลียง โซ่ลาก และโซ่ Bucket Elevator สำหรับอุตสาหกรรมปูนซีเมนต์ ชีวมวล และงานอุตสาหกรรมหนัก",
      image: "/images/reclaimercard.png",
    },
    {
      title: "สายพานลำเลียง",
      desc: "สายพานลำเลียงคุณภาพสูง รองรับงานขนถ่ายวัสดุในอุตสาหกรรมที่ต้องการความทนทานและประสิทธิภาพสูง",
      image: "/images/beltcard.png",
    },
    {
      title: "ลูกกลิ้งลำเลียง",
      desc: "ลูกกลิ้งลำเลียงประสิทธิภาพสูง ออกแบบเพื่ออายุการใช้งานที่ยาวนาน ลดการบำรุงรักษา และเพิ่มความต่อเนื่องของการผลิต",
      image: "/images/rollercard.png",
    },
  ];

  return (
    <section
      id="solutions"
      className="relative overflow-hidden pt-16 pb-6 lg:pt-24 lg:pb-20"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/solutionbackground.png')",
        }}
      />

      {/* White Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.2em] text-blue-600">
            OUR SOLUTIONS
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">
            ครบทุกความต้องการเพื่ออุตสาหกรรมของคุณ
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            เราจัดหาอุปกรณ์อุตสาหกรรมคุณภาพสูง พร้อมบริการด้านวิศวกรรมและการจัดซื้อ
            เพื่อช่วยเพิ่มความน่าเชื่อถือ ประสิทธิภาพ และความต่อเนื่องของการดำเนินงาน
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="text-xl font-bold text-gray-900 lg:text-2xl">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}