import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/general-components/Header/Header";
import Footer from "../components/general-components/Footer";
import { Montserrat } from "next/font/google";
import SideBar from "@/components/general-components/Sidebar";
import { cookies } from "next/headers";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const SITE_DESCRIPTION = "Lleva el control de tus animes vistos, descubre los estrenos de la temporada y organiza tu lista de pendientes en un solo lugar. ¡Regístrate y personaliza tu perfil!";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Anitrack - Tu rastreador de anime",
    template: "%s | Anitrack",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Anitrack",
  creator: "Anitrack",
  category: "entertainment",
  keywords: ["anime", "tracker", "anilist", "myanimelist", "lista de anime"],
  authors: [{ name: "Anitrack" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Anitrack",
    url: "/",
    title: "Anitrack - Tu rastreador de anime",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Anitrack - Tu rastreador de anime",
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const isAuthenticated = !!token;

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${montserrat.className} antialiased grid grid-rows-[auto_1fr_auto] min-h-dvh bg-bg text-text`}
      >
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Saltar al contenido principal
        </a>

        <Header isAuthenticated={isAuthenticated} />
        <SideBar isAuthenticated={isAuthenticated} />

        <main id="main-content" className="w-full  focus:outline-none " tabIndex={-1}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
