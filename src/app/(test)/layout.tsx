
import type { Metadata } from "next";
import { geistSans, geistMono } from "@/app/fonts";

import myschema from '@/app/lib/schema.json'

import "@/app/(site)/globals.css";
import Logo from "@/app/components/Logo";
import Navbar from "@/app/components/layouts/Navbar";
import Footer from "../components/landing/footer";
import MainBlock from "../components/layouts/MainBlock";
import Sidebar from "../components/layouts/SideBar";

export const metadata: Metadata = {
  title: "Giorgio Tedesco | Full Stack Web Developer & 3D Artist",
  description: "Sviluppatore Web Full Stack specializzato in Laravel, WordPress e tecnologie 3D come Blender e Unity. Esperienza nella gestione DNS e infrastrutture web.",
};
export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(myschema) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Main Wrapper Background */}
        <div className="bg-primary h-full w-full overflow">
          <div className="bg-secondary max-w-[1200px] m-auto h-full">
            <div className="flex flex-row w-full items-start">
              <MainBlock>
                {children}
              </MainBlock>
              <Sidebar />
            </div>

            <Footer />


          </div>

        </div>
      </body>
    </html>);
}
