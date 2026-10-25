import Skeleton from "@/components/general-components/Skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-bg-primary">
            <Skeleton className="w-full min-h-[45vh] lg:min-h-[60vh] 2xl:min-h-[70vh] rounded-none" />

            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-48 lg:mt-56 grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-x-8 gap-y-4 bg-bg-secondary border border-border-default rounded-2xl shadow-2xl p-6">
                    <Skeleton className="order-1 aspect-2/3 w-72 lg:w-full rounded-xl" />

                    <div className="order-2 lg:col-start-2 lg:row-start-1 space-y-2">
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>

                    <div className="order-3 lg:col-start-1 space-y-3">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-1/2" />
                    </div>

                    <div className="order-4 lg:col-start-2 space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </main>
        </div>
    );
}
