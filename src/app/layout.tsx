import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "next-themes";
import ClientProvider from "./context/ClientProvider";
import Head from "next/head";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HabitX",
  description: "An habit tracker web app.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <ThemeProvider attribute="class"> */}
      {/* <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <ThemeProvider attribute="data-theme">
        <body className={montserrat.className}>
          <ClientProvider>
            <Navbar />
            {children}
            <Footer />
          </ClientProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
