import { ViewTransition } from "react";
import Image from "next/image";

interface Props {
    src: string;
    alt: string;
    className?: string;
    preload?: boolean;
    sizes?: string;
    viewTransitionName?: string;
}

export default function CoverImage({ src, alt, className = "", preload, sizes = "320px", viewTransitionName }: Props) {
    return (
        <div className={`relative overflow-hidden rounded-xl shadow-xl border border-border-default bg-bg-tertiary aspect-2/3 ${className}`}>
            <ViewTransition name={viewTransitionName}>
                <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes={sizes}
                    className="object-cover"
                    preload={preload}
                />
            </ViewTransition>
        </div>
    );
}
