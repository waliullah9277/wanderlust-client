import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Background */}
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a hidden beach cove"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-28 pb-48 text-center text-white">
        <h1 className="text-5xl leading-[1.1] font-light tracking-tight md:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/90">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="flex items-center gap-3 bg-[#00A8E8] px-7 py-3.5 text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:bg-[#0095d1]"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/destinations"
            className="bg-white/30 px-7 py-3.5 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/40"
          >
            View Destination
          </Link>
        </div>
      </div>

      {/* Search bar */}

      <div className="absolute inset-x-0 bottom-0 z-10 grid w-full grid-cols-2 sm:flex sm:flex-row">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="min-w-0 border-r border-b border-white/20 bg-black/40 px-3 py-3 backdrop-blur-sm sm:flex-1 sm:border-b-0 sm:px-4 md:px-6 md:py-3.5"
          >
            <p className="truncate text-xs font-semibold text-white sm:text-sm">
              {field.label}
            </p>
            <p className="mt-0.5 truncate text-[10px] text-white/70 sm:text-xs">
              {field.placeholder}
            </p>
          </div>
        ))}

        <button
          type="button"
          className="col-span-2 min-h-11 bg-[#00A8E8] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0095d1] sm:col-span-1 sm:min-h-0 sm:px-6 md:px-12"
        >
          Search
        </button>
      </div>

    </section>
  );
}