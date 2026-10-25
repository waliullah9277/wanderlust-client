import DestinationCardSkeleton from "@/components/destinations/destination-card-skeleton";

export default function DestinationsLoading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
      {/* Heading skeleton */}
      <div className="mb-8 space-y-3">
        <div className="h-8 w-52 animate-pulse rounded-md bg-muted" />
        <div className="h-4 w-72 max-w-full animate-pulse rounded-md bg-muted" />
      </div>

      {/* Destination cards skeleton */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <DestinationCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}