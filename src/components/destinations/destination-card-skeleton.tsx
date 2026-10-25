
const DestinationCardSkeleton = () => {
  return (
    <article
      aria-hidden="true"
      className="min-w-0 overflow-hidden rounded-xl border border-border bg-background shadow-sm"
    >
      <div className="aspect-[16/9] animate-pulse bg-muted" />

      <div className="space-y-3 p-4 sm:p-5">
        <div className="h-3 w-24 animate-pulse rounded bg-muted" />

        <div className="flex items-start justify-between gap-3">
          <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-5 w-16 animate-pulse rounded bg-muted" />
        </div>

        <div className="h-3 w-28 animate-pulse rounded bg-muted" />

        <div className="border-t border-border pt-3">
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </article>
  );
};

export default DestinationCardSkeleton;
