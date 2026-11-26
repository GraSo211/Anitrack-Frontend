import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { SiAnilist, SiMyanimelist } from "react-icons/si";

export default function Footer() {
    return (
        <footer className="bg-bg-secondary min-w-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 lg:pt-20 pb-10 lg:pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-12">
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-text-primary leading-tight max-w-[38ch]">
                        <span className="text-accent-primary" aria-hidden="true">
                            ✿{" "}
                        </span>
                        AniTrack es tu rastreador de anime: sigue tus series, descubre
                        estrenos y ordena tu lista.
                    </p>

                    <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-x-16">
                        <nav aria-label="Información">
                            <h3 className="text-sm font-bold text-text-primary mb-4">
                                Información
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/"
                                        className="inline-block text-text-secondary transition-colors hover:text-text-primary rounded-sm"
                                    >
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/animes"
                                        className="inline-block text-text-secondary transition-colors hover:text-text-primary rounded-sm"
                                    >
                                        Animes
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/en-emision"
                                        className="inline-block text-text-secondary transition-colors hover:text-text-primary rounded-sm"
                                    >
                                        En emisión
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/mi-lista"
                                        className="inline-block text-text-secondary transition-colors hover:text-text-primary rounded-sm"
                                    >
                                        Mi lista
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <nav aria-label="Comunidad">
                            <h3 className="text-sm font-bold text-text-primary mb-4">
                                Comunidad
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="https://github.com/GraSo211/Anitrack-Frontend"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-text-primary rounded-sm"
                                    >
                                        <FaGithub size={18} className="shrink-0" aria-hidden="true" />
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://myanimelist.net"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-text-primary rounded-sm"
                                    >
                                        <SiMyanimelist size={18} className="shrink-0" aria-hidden="true" />
                                        MyAnimeList
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://anilist.co"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-text-primary rounded-sm"
                                    >
                                        <SiAnilist size={18} className="shrink-0" aria-hidden="true" />
                                        AniList
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <nav aria-label="Legal">
                            <h3 className="text-sm font-bold text-text-primary mb-4">
                                Legal
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/terminos"
                                        className="inline-block text-text-secondary transition-colors hover:text-text-primary rounded-sm"
                                    >
                                        Términos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/privacidad"
                                        className="inline-block text-text-secondary transition-colors hover:text-text-primary rounded-sm"
                                    >
                                        Privacidad
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
}
