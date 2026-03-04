"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { getUserByUsername } from "@/actions/getUserByUsername";
import { UserJikan } from "@/types/UserJikan";

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
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 h-10 backdrop-blur-md transition-all focus-within:ring-2 focus-within:ring-blue-500">
                <input
                    type="text"
                    value={query}
                    className="w-full bg-transparent text-sm focus:outline-none placeholder-white/50"
                    placeholder="Buscar usuarios..."
                    onChange={searchUser}
                />
                <CiSearch width={22} height={22} stroke="#ffffff" />
            </div>

            {users && (
                <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-600 rounded-xl shadow-lg z-50">
                    <Link
                        href={`/usuarios/${users.username}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-xl transition"
                        onClick={closeDropdown}
                    >
                        <Image
                            src={users.imageUrl}
                            alt={users.username}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                        />
                        <span className="text-gray-200 text-sm">{users.username}</span>
                    </Link>
                </div>
            )}
        </div>
    );
}