import { Anime } from "@/types/anime/Anime";

import { getAnimeByMalId } from "./getAnimeByMalId";
import { getAnimeById } from "./getAnimeById";

export async function getAnimeByAnyId(identifier: string): Promise<Anime | null> {
    const [sourceRaw, rawId] = identifier.split("-");
    const source = sourceRaw?.toLowerCase();
    const id = Number.parseInt(rawId);



    console.log("getAnimeByAnyId con identifier:", identifier, "source:", source, "id:", id);
    if (!source || isNaN(id)) {
        console.error("Identifier inválido:", identifier);
        return null;
    }

    switch (source) {
        case "m":
            return await getAnimeByMalId(id);

        case "a":
            return await getAnimeById(id);

        default:
            console.warn("Source desconocido:", source);
            return null;
    }
}