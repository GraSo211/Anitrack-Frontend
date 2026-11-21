import Image from "next/image";
import React from "react";

interface Props {
    bannerImage: string | undefined;
    title?: string | undefined;
    colorBg?: string | undefined;
}

export default function Hero({ bannerImage, title, colorBg }: Props) {
    return (
        <div className="absolute inset-x-0 top-0 w-full min-h-[45vh] lg:min-h-[60vh] 2xl:min-h-[70vh] z-0 overflow-hidden">
            {bannerImage && (
                <>
                    <Image
                        src={bannerImage}
                        alt={title || "Desconocido"}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        preload
                    />

                    <div className="absolute inset-0 bg-linear-to-b from-overlay-dark/70 via-overlay-dark/40 to-overlay-dark/90" />

                    <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-bg-primary to-transparent" />
                </>
            )}
            {!bannerImage && colorBg && (
                <>
                    <div
                        className="absolute -inset-[10%] animate-breathe pointer-events-none"
                        style={{
                            background: `radial-gradient(60% 70% at 30% 30%, ${colorBg}, transparent 70%)`,
                        }}
                        aria-hidden="true"
                    />
                    <div
                        className="absolute inset-0 bg-linear-to-b from-bg-primary/70 via-bg-primary/85 to-bg-primary pointer-events-none"
                        aria-hidden="true"
                    />
                </>
            )}
        </div>
    );
}
