import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getCategories } from "@/lib/services/categoryService";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "BALENCIAGA",
  description: "Official Redesign Online Store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const categories = await getCategories();
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header categories={categories} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
