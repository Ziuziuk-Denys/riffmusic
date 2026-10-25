import type { Metadata, Viewport } from "next";

import { themeInitScript } from "@/components/lib/theme";

export const metadata: Metadata = {
  title: "Riff",
  description: "The music player for your desktop.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/sf-pro-display" />
      </head>
      <body>{children}</body>
    </html>
  );
}
