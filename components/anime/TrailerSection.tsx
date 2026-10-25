import Link from "next/link";
import Image from "next/image";
import buildTrailerUrl from "@/utils/buildTrailerUrl";

interface Props {
    trailer: {
        id?: number;
        site?: string;
        thumbnail?: string;
    };
    title?: string;
}

export default function TrailerSection({ trailer, title }: Props) {
    if (!trailer.thumbnail) return null;

    const url = buildTrailerUrl(trailer);
    if (!url) return null;

    return (
        <section>
            <Link href={url} target="_blank" aria-label={`Ver trailer de ${title || "anime"}`}>
                <div className="relative w-full max-w-120 aspect-video">
                    <Image
                        src={trailer.thumbnail}
                        alt={`Trailer de ${title || "anime"}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 480px"
                        className="rounded-lg object-cover hover:brightness-90 transition"
                    />
                </div>
            </Link>
        </section>
    );
}
