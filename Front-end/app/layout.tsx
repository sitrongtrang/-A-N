import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import NavList from "@/components/sidebar/NavList";
import { useState } from "react";
import Content from "@/components/Content";
import { Providers } from "./providers";
import Topbar from "@/components/topbar/Topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YoloHome",
  description: "Make your house smarter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <Providers>
          <Content>
            <Sidebar>
              <NavList />
            </Sidebar>
            <main className="grow flex flex-col">
              <Topbar />
              <section className="grow responsive-layout bg-background">
                {children}
              </section>
            </main>
          </Content>
        </Providers>
      </body>
    </html>
  );
}
