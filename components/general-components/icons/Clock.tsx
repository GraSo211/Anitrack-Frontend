import { IconProps } from "@/types/Icon";
import React from "react";

export default function Clock({width = 32, height = 32, stroke = "#FFFFFF"}: IconProps) {
    return (
        <svg className="" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 12h3.5" />
            <path d="M12 7v5" />
        </svg>
    );
}
