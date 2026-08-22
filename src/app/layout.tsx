import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Newsreader } from "next/font/google";
import "./globals.css";
import "./visuals.css";

const sans = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Monkey Shop · Thirty Years in Frankston",
    template: "%s · The Monkey Shop",
  },
  description:
    "A working digital exhibition celebrating Rob, Carla and thirty years behind the counter in Frankston.",
  applicationName: "The Monkey Shop Exhibition",
  keywords: [
    "Frankston",
    "Cignall Frankston",
    "The Monkey Shop",
    "Lucky Monkey Shop",
    "8 Thompson Street",
    "local history",
    "oral history",
  ],
  openGraph: {
    title: "The Monkey Shop · Thirty Years in Frankston",
    description: "Thirty years of luck, stories and Frankston—told across one counter.",
    type: "website",
    locale: "en_AU",
    siteName: "The Monkey Shop",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16130f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
