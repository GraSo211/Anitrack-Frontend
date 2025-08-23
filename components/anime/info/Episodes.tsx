import { Episode } from "@/types/Episode";
import formatDate from "@/utils/formatDate";
import React from "react";

interface Props {
    episode: Episode
    xd: boolean;
}

export default function Episodes({ episode, xd }: Props) {
    return (
        <li key={episode.mal_id} className="border-b w-full flex p-1 gap-2 items-center border-gray-700 ">
            <div>
                <h4 className="font-semibold text-md w-full text-gray-200">Capítulo {episode.mal_id}</h4>
                <p className="text-gray-400 text-xs w-full">{episode.title || "Desconocido"}</p>
            </div>

            <span className="text-gray-400 px-0 ml-auto rounded">{episode.aired ? formatDate(episode.aired) : "Desconocido"}</span>
            <span className="text-yellow-300 flex justify-center items-center gap-1 ">
                {episode.score}

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffdf20" stroke="#ffdf20" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                </svg>
            </span>
            {xd ? (
                <button className="hover:scale-x-105 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                </button>
            ) : (
                <button className="hover:scale-x-105 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CCCCCC" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                        <path d="M3 3l18 18" />
                    </svg>
                </button>
            )}
        </li>
    );
}
