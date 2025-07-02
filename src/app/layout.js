import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Anvit - The Ultimate Web Designer",
  description: "Crafting exceptional digital experiences with 3+ years of expertise in modern web technologies. From responsive designs to full-stack applications, I bring ideas to life with pixel-perfect precision.",
  openGraph: {
    title: "Anvit - The Ultimate Web Designer",
    description: "Crafting exceptional digital experiences with 3+ years of expertise in modern web technologies. From responsive designs to full-stack applications, I bring ideas to life with pixel-perfect precision.",
    url: "https://madebyanvit.vercel.app/",
    siteName: "madebyanvit",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: '/assets/img/anvit-office-nw.webp', 
        width: 1200,
        height: 630,
        type: "image/jpg",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}