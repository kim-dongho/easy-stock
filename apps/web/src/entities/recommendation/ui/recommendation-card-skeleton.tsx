import Skeleton from "@/shared/ui/skeleton";

export default function RecommendationCardSkeleton() {
  return (
    <div className="rounded-lg border border-outline-variant bg-surface-low p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div>
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-1 h-3 w-16" />
          </div>
        </div>
        <Skeleton className="h-5 w-10 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-6 w-24" />
      <div className="mt-3 flex gap-1.5">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
    </div>
  );
}
