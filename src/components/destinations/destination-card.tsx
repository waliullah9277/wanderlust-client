import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Star } from "lucide-react";

import type { Destination } from "@/app/destinations/page";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const price = Number(destination.price);
  const rating = destination.rating ?? 4.5;

  return (
    <article className="group min-w-0 overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00A8E8]/50 hover:shadow-lg">
      {/* Destination Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <Image
          src={destination.imageUrl}
          alt={`${destination.name} travel destination`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-md border border-black/5 bg-white/95 px-2.5 py-1.5 text-xs font-medium text-black shadow-sm">
          {rating.toFixed(1)}
          <Star className="size-3 fill-amber-400 text-amber-400" />
        </div>
      </div>

      {/* Destination Details */}
      <div className="space-y-3 p-4 sm:p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-[#00A8E8]" />
          <span>{destination.country}</span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <h2 className="min-w-0 text-sm font-semibold leading-5 transition-colors group-hover:text-[#00A8E8] sm:text-base">
            {destination.name}
          </h2>

          <p className="shrink-0 text-sm font-semibold">
            ${price.toLocaleString("en-US")}
            <span className="ml-1 text-[10px] font-normal text-muted-foreground">
              /Person
            </span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-3.5 shrink-0 text-[#00A8E8]" />
          <span>{destination.duration}</span>
        </div>

        <div className="border-t border-border pt-3">
          <Link
            href={`/destinations/${destination._id ?? destination.id ?? ""}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00A8E8] transition-colors hover:text-[#0095d1]"
          >
            BOOK NOW
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DestinationCard;