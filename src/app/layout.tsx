import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/main.css";
import "@/styles/chart.css";
import type { Metadata } from "next";
// import { metadata } from "@/constants";
import classNames from "classnames";

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
      <body className={classNames(inter.className)}>
        <main className="flex flex-col items-center justify-between">
          {children}
        </main>
      </body>
    </html>
  );
}
