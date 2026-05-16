import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
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
          <header className="flex items-center border-b px-6 py-3">
            <div className="flex flex-1">
              <Link href="/" className="font-semibold">npmstats</Link>
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
