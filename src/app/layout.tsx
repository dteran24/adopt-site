import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import Footer from "./components/footer";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  })
{
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
    {children}
        <Footer />
      </body>
    </html>
  );
}
