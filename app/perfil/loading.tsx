import Skeleton from "@/components/general-components/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 text-text-primary space-y-6 md:space-y-8 animate-fade-in">
      {/* Hero skeleton */}
      <div className="rounded-2xl bg-bg-secondary border border-border-default p-5 md:p-8">
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center">
          <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-2xl shrink-0" />
          <div className="flex flex-col gap-3 w-full">
            <Skeleton className="h-9 w-56" />
            <Skeleton className="h-4 w-40" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-32 rounded-full" />
              <Skeleton className="h-6 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* KPI row skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-2xl" />
        ))}
      </div>

      {/* Main content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-56 w-full rounded-2xl" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-80 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
