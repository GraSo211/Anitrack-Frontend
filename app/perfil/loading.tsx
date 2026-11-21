import Skeleton from "@/components/general-components/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto p-6 text-text-primary">
      <div className="flex gap-6 items-center border-b border-border-default pb-6">
        <Skeleton className="w-[120px] h-[120px] rounded-xl shrink-0" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <section className="mt-8">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </section>
    </div>
  );
}
