import type { Metadata } from "next";

import { geistMono, geistSans, inter } from "@/app/fonts";

import "./preview.css";

export const metadata: Metadata = {
  title: "Hallmark Preview Sandbox | Giorgio Tedesco",
  description: "Non-destructive Hallmark redesign previews for giorgiotedesco.it.",
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
