import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/shadcn/toast";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Carbono",
  description:
    "Clonador de sites com IA — copie ou re-imagine qualquer website em segundos.",
  icons: {
    icon: "/logo-c.svg",
    shortcut: "/logo-c.svg",
  },
  openGraph: {
    title: "Carbono",
    description:
      "Clonador de sites com IA — copie ou re-imagine qualquer website em segundos.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Carbono",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carbono",
    description:
      "Clonador de sites com IA — copie ou re-imagine qualquer website em segundos.",
    images: ["/og-image.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} font-sans`}>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
