import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Newsreader } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · The Monkey Shop",
  },
  description: SITE_DESCRIPTION,
  applicationName: "The Monkey Shop Tribute",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon" }],
  },
  keywords: [
    "Frankston",
    SITE_NAME,
    "Lucky Monkey Shop",
    "8 Thompson Street",
    "local history",
    "oral history",
  ],
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
