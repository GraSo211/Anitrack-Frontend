import Skeleton from "@/components/general-components/Skeleton";

export default function Loading() {
    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                            <Skeleton className="h-7 w-28" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-9 w-24 rounded-md" />
                    </div>

                    <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                        <div className="flex gap-2 overflow-x-auto flex-1">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <Skeleton key={i} className="h-16 w-16 sm:w-20 rounded-xl shrink-0" />
                            ))}
                        </div>
                        <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <Skeleton key={i} className="aspect-[3/4] w-full rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
