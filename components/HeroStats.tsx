"use client";

import CountUp from "react-countup";

const stats = [
  {
    value: 6,
    suffix: "+",
    title: "Global",
    subtitle: "Partners",
    delay: 0,
  },
  {
    value: 5,
    title: "Industries",
    subtitle: "Served",
    delay: 0.2,
  },
  {
    value: 30,
    suffix: "+",
    title: "Customers",
    subtitle: "Served",
    delay: 0.4,
  },
  {
    value: 100,
    suffix: "%",
    title: "Engineering &",
    subtitle: "Quality Focused",
    delay: 0.6,
  },
];

type HeroStatsProps = {
  start: boolean;
};

export default function HeroStats({ start }: HeroStatsProps) {
  return (
    <div className="mt-16 border-t border-white/20 pt-10 pb-12 lg:pb-0">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.title} className="text-center">
            <div className="text-4xl font-extrabold text-white md:text-5xl">
              <CountUp
                start={0}
                end={start ? item.value : 0}
                duration={1.6}
                delay={item.delay}
                suffix={item.suffix ?? ""}
                preserveValue={false}
              />
            </div>

            <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-blue-200">
              {item.title}
            </p>

            <p className="text-sm uppercase tracking-wider text-blue-200">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}