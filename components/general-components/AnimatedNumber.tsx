"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 600;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function AnimatedNumber({
    value,
    className,
}: {
    value: number;
    className?: string;
}) {
    const [display, setDisplay] = useState(0);
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        const decimals = Number.isInteger(value) ? 0 : 1;

        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setDisplay(value);
            return;
        }

        const start = performance.now();

        const tick = (now: number) => {
            const progress = Math.min((now - start) / DURATION, 1);
            const next = value * easeOutCubic(progress);
            setDisplay(decimals === 0 ? Math.round(next) : next);

            if (progress < 1) frameRef.current = requestAnimationFrame(tick);
        };

        frameRef.current = requestAnimationFrame(tick);

        return () => {
            if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
        };
    }, [value]);

    const decimals = Number.isInteger(value) ? 0 : 1;

    return (
        <>
            <span aria-hidden="true" className={className}>
                {display.toLocaleString("es-AR", {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                })}
            </span>
            <span className="sr-only">{value}</span>
        </>
    );
}
