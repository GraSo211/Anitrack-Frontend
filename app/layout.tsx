import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/general-components/Header/Header";
import Footer from '../components/general-components/Footer';
import { Montserrat } from "next/font/google";
import SideBar from "@/components/general-components/Sidebar";
import { cookies } from "next/headers";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Anitrack",
  description: "Anitrack description c:",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>
)


{
    const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const isAuthenticated = !!token;



  return (
    <html lang="es" >
      <body
        className={`${montserrat.className}   z-50 antialiased grid grid-rows-[auto_1fr_auto] min-h-dvh`}>
        <Header isAuthenticated={isAuthenticated} />
        <SideBar></SideBar>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
