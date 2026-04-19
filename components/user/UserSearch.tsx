"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { getUserByUsername } from "@/actions/user/getUserByUsername";
import { UserJikan } from "@/types/user/User";

export default function UserSearch() {
    const [users, setUsers] = React.useState<UserJikan | null>(null);
    const [query, setQuery] = React.useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const searchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
            if (!value.trim()) {
                setUsers(null);
                return;
            }
            const result: UserJikan | null = await getUserByUsername(value);
            setUsers(result);
        }, 600);
    };

    const closeDropdown = () => {
        setQuery("");
        setUsers(null);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="relative w-full max-w-md">
            <div className="flex items-center bg-bg-secondary border border-border-default rounded-xl px-3 h-10 backdrop-blur-md transition-all focus-within:ring-2 focus-within:ring-accent-primary">
                <input
                    type="text"
                    value={query}
                    className="w-full bg-transparent text-sm focus:outline-none placeholder-text-muted text-text-primary"
                    placeholder="Buscar usuarios..."
                    onChange={searchUser}
                />
                <CiSearch width={22} height={22} className="text-text-secondary" />
            </div>

            {users && (
                <div className="absolute top-full mt-2 w-full bg-bg-secondary border border-border-default rounded-xl shadow-lg z-50">
                    <Link
                        href={`/usuarios/${users.username}`}
                        className="flex items-center gap-3 p-3 hover:bg-bg-tertiary rounded-xl transition"
                        onClick={closeDropdown}
                    >
                        <Image
                            src={users.imageUrl}
                            alt={users.username}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                        />
                        <span className="text-text-primary text-sm">{users.username}</span>
                    </Link>
                </div>
            )}
        </div>
    );
}