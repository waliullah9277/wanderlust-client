"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
    ArrowRight,
    ArrowUpRight,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Star,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

type Destination = {
    _id: string;
    name: string;
    country: string;
    price: number;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
    category: string;
    rating?: number;
};

export default function Featured() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchFeaturedDestinations() {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL}/featured-destinations`,
                    {
                        cache: "no-store",
                        signal: controller.signal,
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load featured destinations.");
                }

                const result = await response.json();

                // Supports either an array or a wrapped API response.
                const items: Destination[] = Array.isArray(result)
                    ? result
                    : Array.isArray(result.destinations)
                        ? result.destinations
                        : Array.isArray(result.data)
                            ? result.data
                            : [];

                setDestinations(items);
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    return;
                }

                console.error("Featured destinations error:", error);
                toast.error("Unable to load featured destinations.");
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchFeaturedDestinations();

        return () => controller.abort();
    }, []);

    const onSelect = useCallback((carouselApi: CarouselApi) => {
        if (!carouselApi) return;

        setCurrent(carouselApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!api) return;

        api.on("select", onSelect);
        api.on("reInit", onSelect);

        return () => {
            api.off("select", onSelect);
            api.off("reInit", onSelect);
        };
    }, [api, onSelect, destinations]);

    const total = api?.scrollSnapList().length ?? 0;

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("en-US", {
            maximumFractionDigits: 0,
        }).format(price);

    const formatDate = (date: string) => {
        if (!date) return "";

        return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <section className="overflow-hidden bg-background py-12 md:py-16">
            <div className="mx-auto max-w-7xl sm:px-6">
                {/* Section heading */}
                <div className="mb-8 flex items-end justify-between gap-4">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#00A8E8]">
                            Explore the world
                        </p>

                        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            Featured Destinations
                        </h2>

                        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                            Handpicked travel experiences for the adventure seekers
                        </p>
                    </div>

                    <Link
                        href="/destinations"
                        className="hidden shrink-0 items-center rounded-none border border-[#00A8E8]/50 px-4 py-2 text-sm font-medium text-[#0099D5] hover:bg-[#00A8E8]/10 sm:inline-flex"
                    >
                        All Destinations
                        <ArrowRight className="ml-2 size-4" />
                    </Link>
                </div>

                {/* Loading skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="animate-pulse">
                                <div className="aspect-[4/2.5] bg-muted" />
                                <div className="mt-4 h-4 w-24 bg-muted" />
                                <div className="mt-3 h-6 w-2/3 bg-muted" />
                                <div className="mt-3 h-4 w-1/2 bg-muted" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && destinations.length === 0 && (
                    <div className="border border-dashed border-border px-6 py-16 text-center">
                        <h3 className="text-lg font-medium">
                            No featured destinations yet
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Check back later for new travel experiences.
                        </p>
                    </div>
                )}

                {/* Destination carousel */}
                {!loading && destinations.length > 0 && (
                    <Carousel
                        setApi={setApi}
                        opts={{
                            align: "start",
                            loop: destinations.length > 3,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-3">
                            {destinations.map((destination) => (
                                <CarouselItem
                                    key={destination._id}
                                    className="basis-[88%] pl-3 sm:basis-1/2 lg:basis-1/3"
                                >
                                    <article className="group h-full">
                                        {/* Image */}
                                        <Link
                                            href={`/destinations/${destination._id}`}
                                            className="relative block aspect-[4/2.5] overflow-hidden bg-muted"
                                            aria-label={`View ${destination.name}`}
                                        >
                                            <Image
                                                src={destination.imageUrl}
                                                alt={destination.name}
                                                width={800}
                                                height={500}
                                                sizes="(max-width: 640px) 88vw, (max-width: 1024px) 50vw, 33vw"
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                            <span className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                                            {typeof destination.rating === "number" && (
                                                <span className="absolute right-3 top-3 flex items-center gap-1 bg-white/95 px-2.5 py-1.5 text-xs font-semibold text-black shadow-sm">
                                                    {destination.rating.toFixed(1)}
                                                    <Star className="size-3.5 fill-black" />
                                                </span>
                                            )}

                                            <span className="absolute bottom-3 left-3 bg-white/95 px-3 py-1.5 text-xs font-medium text-gray-900">
                                                {destination.category}
                                            </span>
                                        </Link>

                                        {/* Destination details */}
                                        <div className="pt-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <MapPin className="size-3.5" />
                                                    {destination.country}
                                                </p>

                                                <p className="shrink-0 text-right text-lg font-semibold text-foreground">
                                                    ${formatPrice(destination.price)}
                                                    <span className="text-xs font-normal text-muted-foreground">
                                                        /Person
                                                    </span>
                                                </p>
                                            </div>

                                            <Link
                                                href={`/destinations/${destination._id}`}
                                                className="mt-2 block text-xl font-medium tracking-tight text-foreground transition-colors hover:text-[#00A8E8]"
                                            >
                                                {destination.name}
                                            </Link>

                                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1.5">
                                                    <CalendarDays className="size-3.5" />
                                                    {destination.duration}
                                                </span>

                                                {destination.departureDate && (
                                                    <span>
                                                        Departure: {formatDate(destination.departureDate)}
                                                    </span>
                                                )}
                                            </div>

                                            <Link
                                                href={`/destinations/${destination._id}`}
                                                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#009FD9] transition-colors hover:text-[#007EAE]"
                                            >
                                                Book Now
                                                <ArrowUpRight className="size-4" />
                                            </Link>
                                        </div>
                                    </article>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                )}

                {/* Carousel controls and progress */}
                {!loading && destinations.length > 0 && (
                    <div className="mt-9 flex items-center gap-5">
                        <p className="min-w-[30px] text-sm font-medium tabular-nums text-foreground">
                            {current + 1}/{total}
                        </p>

                        <div
                            className="h-[2px] flex-1 overflow-hidden bg-border"
                            role="progressbar"
                            aria-label="Carousel progress"
                            aria-valuemin={0}
                            aria-valuemax={total}
                            aria-valuenow={current + 1}
                        >
                            <div
                                className="h-full bg-[#00A8E8] transition-all duration-300"
                                style={{
                                    width: `${total > 0 ? ((current + 1) / total) * 100 : 0}%`,
                                }}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                aria-label="Previous destinations"
                                disabled={!api?.canScrollPrev()}
                                onClick={() => api?.scrollPrev()}
                                className="size-10 rounded-full border-border bg-background text-muted-foreground hover:border-[#00A8E8] hover:text-[#00A8E8]"
                            >
                                <ChevronLeft className="size-4" />
                            </Button>

                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                aria-label="Next destinations"
                                disabled={!api?.canScrollNext()}
                                onClick={() => api?.scrollNext()}
                                className="size-10 rounded-full border-border bg-background text-muted-foreground hover:border-[#00A8E8] hover:text-[#00A8E8]"
                            >
                                <ChevronRight className="size-4" />
                            </Button>
                        </div>
                    </div>
                )}

                <div className="mt-6 sm:hidden">
                    <Link
                        href="/destinations"
                        className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-none border border-[#00A8E8]/50 bg-background px-4 py-2 text-sm font-medium text-[#0099D5] transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        All Destinations
                        <ArrowRight className="ml-2 size-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}