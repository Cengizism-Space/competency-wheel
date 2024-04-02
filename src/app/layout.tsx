import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/chart.css";
// import { metadata } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
          <div className="blurred-bg"></div>
        </main>
      </body>
    </html>
  );
}
