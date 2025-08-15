import { Anime } from "./Anime";

export type AnimesResponse = {
    data: {
        Page: {
            media: Anime[];
        };
    };
};
