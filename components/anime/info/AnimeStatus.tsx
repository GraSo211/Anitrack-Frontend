import React from "react";

export default function AnimeStatus({ status }: { status: string }) {
    if (status == "RELEASING") {
        return <p className="border rounded-full font-semibold bg-blue-500/20  text-white w-fit px-2 ">{status}</p>;
    }
    if (status == "FINISHED") {
        return <p className="border rounded-full font-semibold bg-green-500/20 text-white w-fit px-2 ">{status}</p>;
    }
    if (status == "NOT_YET_RELEASED") {
        return <p className="border rounded-full font-semibold w-fit px-2 bg-yellow-500/20 text-white">{status}</p>;
    } 
    if (status == "CANCELLED") {
        return <p className="border rounded-full font-semibold w-fit px-2 bg-gray-700/20 text-white">{status}</p>;
    }
    if (status == "HIATUS") {
        return <p className="border rounded-full font-semibold w-fit px-2 bg-red-500/20 text-white">{status}</p>;
    }

}
