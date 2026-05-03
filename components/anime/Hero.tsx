
import React from "react";

interface Props {
    bannerImage: string | undefined;
    title?: string | undefined;
    colorBg?: string | undefined;
}

export default function Hero({ bannerImage, title, colorBg }: Props) {
    return (
        <div className="absolute  inset-0 w-full lg:h-105 2xl:h-130 z-10 overflow-hidden">
            {bannerImage && (
                <>
                    <img src={bannerImage} alt={title || "Desconocido"}  className="object-cover w-full " />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-black/90" />

                    {/* Fade-out bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent" />
                </>
            )}
            {
                !bannerImage && colorBg && (
                    <div className="absolute saturate-150 inset-0" style={{ backgroundColor: colorBg }} />
                )
            }

        </div>
    );
}
