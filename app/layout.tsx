import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const chivo = localFont({
  src: [
    {
      path: "../public/typefaces/ChivoMono-VariableFont_wght.ttf",
      weight: "400",
      style: "normal",
    },

    {
      path: "../public/typefaces/ChivoMono-Italic-VariableFont_wght.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-chivo",
  display: "swap",
});

const twklausanne = localFont({
  src: [
    {
      path: "../public/typefaces/TWKLausanne-900Italic.ttf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/typefaces/TWKLausanne-400.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/typefaces/TWKLausanne-250.ttf",
      weight: "250",
      style: "normal",
    },
  ],
  variable: "--font-twklausanne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kiran Patel",
  description:
    "Portfolio of Kiran Patel, a designer and developer creating digital experiences.",
  metadataBase: new URL("https://kiranpatel.com"),
  openGraph: {
    title: "Kiran Patel",
    description:
      "Portfolio of Kiran Patel, a designer and developer creating digital experiences.",
    url: "https://kiranpatel.com",
    siteName: "Kiran Patel",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kiran Patel Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiran Patel",
    description:
      "Portfolio of Kiran Patel, a designer and developer creating digital experiences.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/images/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${chivo.variable} ${twklausanne.variable} antialiased bg-[var(--shade-900)] text-[var(--shade-50)] selection:bg-[var(--shade-150)] selection:text-[var(--shade-1000)]`}
      >
        {children}
      </body>
    </html>
  );
}
