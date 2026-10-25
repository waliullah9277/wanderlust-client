
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import EditDestinationDialog from "@/components/destinations/EditDestinationDialog";
import DeleteDestinationDialog from "@/components/destinations/DeleteDestinationDialog";

interface Destination {
  _id: string;
  name: string;
  country: string;
  price: string | number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  category: string;
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  let destination: Destination | null = null;

  try {
    const res = await fetch(
      `http://localhost:8000/destinations/${id}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch destination");
    }

    destination = (await res.json()) as Destination;
  } catch (error) {
    console.error("Error fetching destination:", error);
  }

  if (!destination) {
    return (
      <main className="mx-auto min-h-screen max-w-7xl px-5 py-12 sm:px-8">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#00A8E8]"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="py-24 text-center">
          <h1 className="text-2xl font-medium">
            Destination Not Found
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We could not load this destination. Please try again.
          </p>
        </div>
      </main>
    );
  }

  const price = Number(destination.price);

  const highlights = [
    "Beautiful natural scenery",
    "Memorable local experiences",
    "Explore the local culture",
    "Relax and enjoy your trip",
    "Capture unforgettable moments",
  ];

  return (
    <main className="min-h-screen bg-background px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Top navigation and actions */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-[#00A8E8] sm:text-sm"
          >
            <ArrowLeft className="size-4" />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-2">
            <EditDestinationDialog destination={destination}/>
            <DeleteDestinationDialog destination={destination}/>

            
          </div>
        </div>

        {/* Destination cover image */}
        <div className="relative aspect-[16/5] w-full overflow-hidden bg-muted sm:aspect-[16/6]">
          <Image
            src={destination.imageUrl}
            alt={`${destination.name}, ${destination.country}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        </div>

        <div className="mt-5 border-t border-border pt-6 sm:mt-7 sm:pt-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
            {/* Destination information */}
            <section>
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="size-4" />
                {destination.country}
                <span className="border border-border px-2 py-0.5">
                  {destination.category}
                </span>
              </div>

              <h1 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
                {destination.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Star className="size-3.5 fill-green-600 text-green-600" />
                  <strong className="text-foreground">4.9</strong>
                  <span>(234 reviews)</span>
                </span>

                <span className="hidden text-border sm:inline">|</span>

                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  <strong className="font-medium text-foreground">
                    {destination.duration}
                  </strong>
                </span>
              </div>

              {/* Overview */}
              <div className="mt-7">
                <h2 className="text-xl font-medium tracking-tight">
                  Overview
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  {destination.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-6">
                <h2 className="text-xl font-medium tracking-tight">
                  Highlights
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
                  Discover {destination.name} in{" "}
                  {destination.country}, enjoy the local culture,
                  explore beautiful surroundings, and create
                  unforgettable travel memories.
                </p>

                <ul className="mt-4 grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-green-600" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Booking card */}
            <aside className="h-fit border border-border bg-background p-5 shadow-sm lg:sticky lg:top-24">
              <p className="text-xs text-muted-foreground">
                Starting from
              </p>

              <p className="mt-1 text-2xl font-medium tracking-tight text-[#00A8E8]">
                ${price.toLocaleString("en-US")}
              </p>

              <p className="text-xs text-muted-foreground">
                per person
              </p>

              <div className="mt-7">
                <label
                  htmlFor="departureDate"
                  className="mb-2 block text-xs text-muted-foreground"
                >
                  Departure Date
                </label>

                <input
                  id="departureDate"
                  type="date"
                  value={destination.departureDate}
                  readOnly
                  className="h-10 w-full border border-border bg-muted/30 px-3 text-xs outline-none"
                />
              </div>

              <button
                type="button"
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 bg-[#17A2B8] px-4 text-xs font-medium text-white transition-colors hover:bg-[#138496]"
              >
                Book Now
                <ArrowRight className="size-4" />
              </button>

              <ul className="mt-4 space-y-2.5 text-[11px] text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-green-600" />
                  Free cancellation up to 7 days
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-green-600" />
                  Travel assistance included
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-green-600" />
                  Customer support
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
