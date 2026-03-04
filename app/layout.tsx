import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/general-components/Header/Header";
import Footer from '../components/general-components/Footer';
import { Montserrat } from "next/font/google";
import SideBar from "@/components/general-components/Sidebar";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Anitrack",
  description: "Anitrack description c:",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" >
      <body
        className={`${montserrat.className}   z-50 antialiased grid grid-rows-[auto_1fr_auto] min-h-dvh`}>
        <Header />
        <SideBar></SideBar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
