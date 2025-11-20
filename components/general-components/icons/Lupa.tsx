import React from "react";
import { IconProps } from '../../../types/Icon';




export default function Lupa({width = 32, height = 32, stroke = "#FFFFFF"}: IconProps) {
    return (
        <svg className="" xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
        </svg>
    );
}
