import Skeleton from "@/components/general-components/Skeleton";

export default function Loading() {
    return (
        <div className="p-6 text-text-primary flex justify-center items-center flex-col w-full max-w-7xl mx-auto">
            <Skeleton className="h-8 w-64 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full">
                {Array.from({ length: 10 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-[2/3] w-full rounded-lg" />
                ))}
            </div>
        </div>
    );
}
