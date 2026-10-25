import Skeleton from "@/components/general-components/Skeleton";

export default function Loading() {
    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
                <Skeleton className="w-full h-40 rounded-2xl mb-6" />

                <div className="flex items-center gap-2 mb-6">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-6 w-48" />
                </div>

                <div className="grid grid-cols-7 gap-4">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <Skeleton className="h-16 w-full rounded-xl" />
                            <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                            <Skeleton className="aspect-[3/4] w-full rounded-lg" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
