import Skeleton from "@/components/general-components/Skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <Skeleton className="h-10 w-48 mx-auto mb-8 rounded-lg" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <Skeleton className="aspect-[2/3] w-full rounded-lg" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
