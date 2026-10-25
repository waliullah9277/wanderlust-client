"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { cn } from "cn";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "https://i.pravatar.cc/300?img=12",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "https://i.pravatar.cc/300?img=47",
  },
  {
    quote:
      '"From The Pristine Beaches Of Phuket To The Vibrant Night Markets, Every Moment Was Picture-Perfect. The Itinerary Struck The Ideal Balance Between Adventure And Relaxation."',
    name: "Emily Rodriguez",
    location: "Barcelona, Spain",
    image: "https://i.pravatar.cc/300?img=44",
  },
  {
    quote:
      '"Our Family Trip To Kyoto Was Flawlessly Organized. The Children Loved Every Activity And We Discovered Sides Of Japan We Never Knew Existed."',
    name: "David Thompson",
    location: "London, UK",
    image: "https://i.pravatar.cc/300?img=13",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

function Controls() {
  const { scrollPrev, scrollNext } = useCarousel();

  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
      <Button
        type="button"
        aria-label="Previous testimonials"
        variant="outline"
        size="icon-sm"
        onClick={scrollPrev}
        className="size-9 cursor-pointer rounded-full border-border text-muted-foreground hover:border-[#00A8E8] hover:text-[#00A8E8] sm:size-11"
      >
        <ArrowLeft className="size-4 sm:size-5" />
      </Button>

      <Button
        type="button"
        aria-label="Next testimonials"
        variant="outline"
        size="icon-sm"
        onClick={scrollNext}
        className="size-9 cursor-pointer rounded-full border-border text-muted-foreground hover:border-[#00A8E8] hover:text-[#00A8E8] sm:size-11"
      >
        <ArrowRight className="size-4 sm:size-5" />
      </Button>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="w-full border-t border-[#00A8E8] bg-background px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          {/* Heading + carousel controls */}
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            <div className="min-w-0">
              <h2 className="text-2xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
                What Travelers Say
              </h2>

              <p className="mt-2 text-xs text-muted-foreground sm:mt-3 sm:text-sm">
                Real experiences from our happy travelers
              </p>
            </div>

            <Controls />
          </div>

          {/* Testimonial cards */}
          <CarouselContent className="mt-8 ml-0 sm:mt-10">
            {testimonials.map((item) => (
              <CarouselItem
                key={item.name}
                className="basis-full pl-0 pr-0 md:basis-1/2 md:pr-5"
              >
                <figure className="flex h-full min-w-0 items-start gap-4 rounded-sm border border-border bg-white p-4 shadow-sm sm:gap-6 sm:p-6 md:p-7">
                  {/* Text content */}
                  <div className="flex min-w-0 flex-1 flex-col self-stretch">
                    <blockquote className="text-sm leading-relaxed text-foreground sm:text-base">
                      {item.quote}
                    </blockquote>

                    <figcaption className="mt-auto pt-6">
                      <p className="text-sm text-[#00A8E8] sm:text-base">
                        — {item.name}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        {item.location}
                      </p>
                    </figcaption>
                  </div>

                  {/* Profile image stays on the right */}
                  <div className="relative size-40 shrink-0 overflow-hidden rounded-sm bg-muted sm:size-32 md:size-40">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={`${item.name} profile`}
                        fill
                        sizes="(max-width: 639px) 80px, (max-width: 767px) 128px, 160px"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className={cn(
                          "flex size-full items-center justify-center",
                          "bg-gradient-to-br from-[#00A8E8] to-[#0076a8]",
                          "text-xl font-light text-white sm:text-3xl",
                        )}
                      >
                        {initials(item.name)}
                      </div>
                    )}
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}