import localFont from "next/font/local";

export const inter = localFont({
    src: [
        {
            path: "./InterVariable.woff2",
            style: "normal",
        },
        {
            path: "./InterVariable-Italic.woff2",
            style: "italic",
        },
    ],
    variable: "--font-inter",
    display: "swap",
});

export const geistSans = localFont({
    src: "./GeistVF.woff2",
    variable: "--font-geist-sans",
    weight: "100 900",
    display: "swap",
});

export const geistMono = localFont({
    src: "./GeistMonoVF.woff2",
    variable: "--font-geist-mono",
    weight: "100 900",
    display: "swap",
});
