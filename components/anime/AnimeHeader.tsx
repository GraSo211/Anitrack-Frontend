import { FaFireAlt, FaStar } from "react-icons/fa";
import AnimeStatus from "@/components/anime-general/info/AnimeStatus";
import Genres from "@/components/anime-general/info/Genres";

interface Props {
    title?: string;
    synonyms?: string[];
    averageScore?: number;
    popularity?: number;
    status?: string;
    genres?: string[];
}

export default function AnimeHeader({ title, synonyms, averageScore, popularity, status, genres }: Props) {
    return (
        <div>
            <h1
                className="text-4xl font-extrabold text-text-primary line-clamp-2"
                title={title ?? ""}
            >
                {title ?? "Título desconocido"}
            </h1>

            {synonyms && synonyms.length > 0 && <p className="text-xs my-1 text-text-tertiary">{synonyms.join(", ")}</p>}

            <div className="flex flex-wrap gap-3 items-center text-text-secondary">
                {averageScore ? (
                    <span className="flex gap-1 justify-center items-center">
                        <FaStar /> {averageScore}
                    </span>
                ) : null}
                {popularity ? (
                    <span className="flex gap-1 justify-center items-center">
                        <FaFireAlt /> {popularity}
                    </span>
                ) : null}
                {status ? <AnimeStatus status={status} /> : null}
            </div>

            {genres && <Genres genres={genres} />}
        </div>
    );
}
