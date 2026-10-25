import React from "react";

const footerLinks = [
    { label: "Parte de: GraSo EcoSystem", href: undefined },
    { label: "Hecho por GraSo Studios", href: undefined },
];

export default function Footer() {
    return (
        <footer className="mt-3 lg:mt-6 border-t border-border-default bg-bg-secondary/60 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-text-tertiary">
                    <span>
                        © {new Date().getFullYear()} AniTrack
                    </span>

                    <nav aria-label="Créditos y atribuciones">
                        <ul className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6">
                            {footerLinks.map((link) => (
                                <li key={link.label}>
                                    {link.href ? (
                                        <a href={link.href} className="hover:text-text-primary transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/30 rounded">
                                            {link.label}
                                        </a>
                                    ) : (
                                        <span>{link.label}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <span className="hidden sm:block">
                        Datos provistos por MyAnimeList y AniList
                    </span>
                </div>
            </div>
        </footer>
    );
}
