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

                    <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/90" />

                    <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-bg-primary to-transparent" />
                </>
            )}
            {!bannerImage && colorBg && (
                <div className="absolute saturate-150 inset-0" style={{ backgroundColor: colorBg }} />
            )}
        </div>
    );
}
