import Image from "next/image";
import React from "react";

interface Props {
    bannerImage: string | undefined;
    title?: string | undefined;
}

export default function Hero({ bannerImage, title }: Props) {
    return (
        <div className="absolute inset-0 w-full lg:h-[420px] 2xl:h-[520px] z-10 overflow-hidden">
            {bannerImage && (
                <>
                    <Image src={bannerImage} alt={title || "Desconocido"} fill priority className="object-cover scale-[1.02]" />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

                    {/* Fade-out bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
                </>
            )}
        </div>
    );
}
