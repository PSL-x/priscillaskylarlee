import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const bebasNeue = Bebas_Neue({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Priscilla Skylar Lee - Designer & Developer",
  description: "Portfolio of Priscilla Skylar Lee - Designer, Maker, and Tinkerer working at the intersection of design and code.",
  openGraph: {
    title: "Priscilla Skylar Lee - Designer & Developer",
    description: "Portfolio of Priscilla Skylar Lee - Designer, Maker, and Tinkerer working at the intersection of design and code.",
    type: "website",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${bebasNeue.variable} ${dmMono.variable} antialiased`}
      >
        <a
          href="#main-content"
          style={{
            position: 'absolute',
            left: '-999rem',
            zIndex: 999,
            padding: 'var(--space-2)',
            backgroundColor: 'var(--accent)',
            color: 'var(--background)',
            fontWeight: 500
          }}
          className="skip-link"
        >
          Skip to main content
        </a>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
