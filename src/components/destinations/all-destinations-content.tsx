
"use client";

import { useMemo, useState } from "react";

import DestinationCard from "@/components/destinations/destination-card";
import type { Destination } from "@/app/destinations/page";

interface AllDestinationsContentProps {
  destinations: Destination[];
}

const AllDestinationsContent = ({
  destinations,
}: AllDestinationsContentProps) => {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const categories = useMemo(
    () => [...new Set(destinations.map((item) => item.category))],
    [destinations],
  );

  const filteredDestinations = useMemo(() => {
    let result = destinations.filter((destination) => {
      const price = Number(destination.price);

      const matchesCategory =
        category === "all" || destination.category === category;

      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "low" && price < 500) ||
        (priceRange === "medium" && price >= 500 && price <= 1500) ||
        (priceRange === "high" && price > 1500);

      return matchesCategory && matchesPrice;
    });

    if (sortBy === "low") {
      result = [...result].sort(
        (a, b) => Number(a.price) - Number(b.price),
      );
    } else if (sortBy === "high") {
      result = [...result].sort(
        (a, b) => Number(b.price) - Number(a.price),
      );
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }

    return result;
  }, [destinations, category, priceRange, sortBy]);

  return (
    <main className="min-h-screen bg-background px-5 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header>
          <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
            Explore All Destinations
          </h1>

          <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
            Find your perfect travel experience from our curated collection
          </p>
        </header>

        <section
          aria-label="Filter destinations"
          className="mt-6 grid grid-cols-1 border border-border sm:grid-cols-3"
        >
          <select
            aria-label="Filter by category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 w-full border-b border-border bg-background px-3 text-xs outline-none focus:ring-1 focus:ring-[#00A8E8] sm:border-b-0 sm:border-r"
          >
            <option value="all">CATEGORY</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            aria-label="Filter by price range"
            value={priceRange}
            onChange={(event) => setPriceRange(event.target.value)}
            className="h-11 w-full border-b border-border bg-background px-3 text-xs outline-none focus:ring-1 focus:ring-[#00A8E8] sm:border-b-0 sm:border-r"
          >
            <option value="all">PRICE RANGE</option>
            <option value="low">Under $500</option>
            <option value="medium">$500 – $1,500</option>
            <option value="high">Above $1,500</option>
          </select>

          <select
            aria-label="Sort destinations"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="h-11 w-full bg-background px-3 text-xs outline-none focus:ring-1 focus:ring-[#00A8E8]"
          >
            <option value="default">SORT BY</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </section>

        <p className="mt-3 text-xs text-muted-foreground">
          Showing {filteredDestinations.length} destinations
        </p>

        {filteredDestinations.length > 0 ? (
          <section className="mt-6 grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDestinations.map((destination, index) => (
              <DestinationCard
                key={
                  destination._id ??
                  destination.id ??
                  `${destination.name}-${index}`
                }
                destination={destination}
              />
            ))}
          </section>
        ) : (
          <div className="py-20 text-center">
            <h2 className="text-lg font-medium">
              No destinations found
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try changing your category or price filters.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default AllDestinationsContent;
