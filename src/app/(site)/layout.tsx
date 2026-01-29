
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import myschema from '@/app/lib/schema.json'

import "@/app/(site)/globals.css";

import Navbar from "@/app/components/googlestudioai/Navbar";
import Footer from "@/app/components/googlestudioai/Footer";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
        <html lang="en" data-theme="light">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(myschema) }}
                />
                <script defer src="https://get.giorgiotedesco.it/script.js" data-website-id="177a1a7f-6206-4656-9668-88f9f69eb853"></script>
            </head>
            <body className={`${inter.variable} font-sans text-slate-900 min-h-screen flex flex-col`}>
                {/* Architectural Grid Background implemented via CSS in layout or globals */}
                <div className="fixed inset-0 -z-50 pointer-events-none opacity-100 bg-brand-ice"
                    style={{
                        backgroundImage: `
                 linear-gradient(to bottom, rgba(37, 99, 235, 0.15) 1px, transparent 1px),
                 linear-gradient(to right, rgba(37, 99, 235, 0.15) 1px, transparent 1px),
                 repeating-linear-gradient(to bottom, rgba(37, 99, 235, 0.08) 0, rgba(37, 99, 235, 0.08) 1px, transparent 1px, transparent 10px),
                 repeating-linear-gradient(to right, rgba(37, 99, 235, 0.08) 0, rgba(37, 99, 235, 0.08) 1px, transparent 1px, transparent 10px)
               `,
                        backgroundSize: '100px 100px'
                    }}
                />
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
