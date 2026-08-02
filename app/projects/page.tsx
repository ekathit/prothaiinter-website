import Image from "next/image";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* Hero */}

        <section className="relative overflow-hidden border-b border-slate-200">

          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: "url('/images/backgroundprojecthero.png')",
              backgroundPosition: "center top",
            }}
          />

          {/* Content */}
          <div className="relative mx-auto max-w-7xl px-6 py-20">

            <h1 className="text-5xl font-bold text-slate-900">
              Industrial Supply Projects
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Explore selected industrial equipment supplied by ProThai
              across various industries.
            </p>

          </div>

        </section>

        {/* Search & Filter */}

        <section className="border-b border-slate-200 bg-white">

          <div className="mx-auto flex max-w-7xl flex-wrap gap-4 px-6 py-8">

            <div className="relative flex-1 min-w-[260px]">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search Customer..."
                className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-blue-500 focus:outline-none"
              />

            </div>

            <select className="rounded-xl border border-slate-300 px-4 py-3">

              <option>All Categories</option>
              <option>Cement Industry</option>
              <option>Biomass Power Plant</option>
              <option>Paper & Pulp</option>
              <option>Mining & Quarry</option>

            </select>

            <select className="rounded-xl border border-slate-300 px-4 py-3">

              <option>Latest Delivery</option>
              <option>Oldest Delivery</option>
              <option>Customer A-Z</option>

            </select>

          </div>

        </section>

        {/* Projects */}

        <section className="py-16">

          <div className="mx-auto max-w-7xl space-y-8 px-6">

            {projects.map((project) => (

              <div
                key={project.customer}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
              >

                <div className="grid md:grid-cols-[380px_1fr]">

                  {/* Image */}

                  <div className="relative h-72 bg-slate-200">

                    <Image
                      src={project.image}
                      alt={project.customer}
                      fill
                      className="object-cover"
                    />

                  </div>

                  {/* Content */}

                  <div className="flex items-center p-10">

                    <dl className="grid grid-cols-[170px_1fr] gap-y-6">

                      <dd className="col-span-2">

                        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                          {project.category}
                        </span>

                      </dd>

                      <dt className="font-medium text-slate-400">
                        Customer Name
                      </dt>

                      <dd className="font-semibold text-slate-900">
                        {project.customer}
                      </dd>

                      <dt className="font-medium text-slate-400">
                        Product
                      </dt>

                      <dd className="text-slate-700">
                        {project.product}
                      </dd>

                      <dt className="font-medium text-slate-400">
                        Delivered
                      </dt>

                      <dd className="text-slate-700">
                        {project.delivered}
                      </dd>

                    </dl>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>
    </>
  );
}