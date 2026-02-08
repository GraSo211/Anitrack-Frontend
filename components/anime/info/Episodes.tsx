import { Episode } from "@/types/Episode";
import React from "react";

interface Props {
    episode: Episode
    watched: boolean;
}

export default function Episodes({ episode, watched }: Props) {
    return (
        <li key={episode.malId} className="border-b w-full flex p-1 gap-2 items-center justify-between border-gray-700 ">
            <div>
                <h4 className="font-semibold text-md w-full text-gray-200">Capítulo {episode.malId}</h4>
                <p className="text-gray-400 text-xs w-full">{episode.title || "Desconocido"}</p>
            </div>



            {watched ? (
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
