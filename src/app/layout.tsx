import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/main.css";
import "@/styles/chart.css";
import type { Metadata } from "next";
// import { metadata } from "@/constants";

export const metadata: Metadata = {
  title: "Competency wheel app",
  description: "Made for company intern evaluation",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex h-full flex-col items-center justify-between bg-slate-50">
          {children}
        </main>
      </body>
    </html>
  );
}
