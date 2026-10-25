import Link from "next/link";
import Image from "next/image";

interface Props {
    relations?: {
        items: {
            relatedMediaId: number;
            relatedTitle: string;
            relatedImage: string;
        }[];
    };
}

export default function RelatedAnime({ relations }: Props) {
    if (!relations || relations.items.length === 0) return null;

    const items = relations.items.slice(0, 6);

    return (
        <section className="flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold text-text-primary mb-4">Animes relacionados</h2>

            <div className="grid grid-cols-2 gap-4 place-content-center w-full max-w-sm">
                {items.map((anime) => (
                    <Link key={anime.relatedMediaId} href={`/anime/a-${anime.relatedMediaId}`} className="group">
                        <div className="flex flex-col gap-2">
                            <div className="relative aspect-2/3 overflow-hidden rounded-lg border border-border-default bg-bg-tertiary">
                                <Image
                                    src={anime.relatedImage}
                                    alt={anime.relatedTitle}
                                    fill
                                    sizes="160px"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-bg-primary/20 group-hover:bg-bg-primary/10 transition" />
                            </div>

                            <p className="text-sm text-center text-text-secondary leading-tight line-clamp-2 group-hover:text-text-primary transition">
                                {anime.relatedTitle}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
