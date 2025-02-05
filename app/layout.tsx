import Header from "@/components/header";
import TabBar from "@/components/tab-bar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Algorithm Playground",
  description: "Time-Space Complexity",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
  shrinkToFit: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="h-screen max-h-screen overflow-hidden bg-background antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen">
            <Header />
            <main className="h-[calc(100dvh-var(--header-height)-var(--footer-height))] overflow-auto">
              {children}
            </main>
            <TabBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
