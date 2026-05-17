import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GithubStarButton } from "@/components/GithubStarButton";
import "./globals.css";

const metadata: Metadata = {
  title: "npmstats",
  description: "See download stats for any npm package",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <header className="sticky top-0 z-10 flex items-center border-b bg-background px-0 py-3 backdrop-blur-sm brightness-115 drop-shadow-xl/16 sm:px-6">
            <div className="flex flex-1">
              <Link href="/" className="flex items-center font-semibold">
                <Image src="/icon.png" alt="" width={54} height={52} />
                npmstats
              </Link>
            </div>
            <Suspense>
              <GithubStarButton />
            </Suspense>
            <div className="flex flex-1 justify-end">
              <ThemeToggle />
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

export { metadata };
export default RootLayout;
