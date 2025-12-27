import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import myschema from '@/lib/schema.json'

import "./globals.css";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(myschema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
