
import type { Metadata } from "next";

import { siteIdentity } from '@/app/lib/seo';

import "@/app/(site)/globals.css";
import 'highlight.js/styles/github-dark.css';

import Navbar from "@/app/components/googlestudioai/Navbar";
import Footer from "@/app/components/googlestudioai/Footer";

import { inter, geistSans, geistMono } from "@/app/fonts";

export const metadata: Metadata = {
    metadataBase: new URL('https://www.giorgiotedesco.it'),
    title: siteIdentity.title,
    description: siteIdentity.description,
};


export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" data-theme="light">
            <head>
                <script defer src="https://get.giorgiotedesco.it/script.js" data-website-id="177a1a7f-6206-4656-9668-88f9f69eb853"></script>
            </head>
            <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-sans text-slate-900 min-h-screen flex flex-col`}>
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
