import Image from "next/image";

interface Props {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    preload?: boolean;
    sizes?: string;
}

export default function CoverImage({ src, alt, className = "", priority, preload, sizes = "320px" }: Props) {
    return (
        <div className={`relative overflow-hidden rounded-xl shadow-xl border border-border-default bg-bg-tertiary aspect-2/3 ${className}`}>
            <Image
                src={src}
                alt={alt}
                fill
                sizes={sizes}
                className="object-cover"
                priority={priority}
                preload={preload}
            />
        </div>
    );
}
