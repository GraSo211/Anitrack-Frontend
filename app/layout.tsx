import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/general-components/Header";
import Footer from '../components/general-components/Footer';


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
    <html lang="es">
      <body
        className={"z-50 antialiased grid grid-rows-[auto_1fr_auto] min-h-dvh "}>
        <Header />
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
