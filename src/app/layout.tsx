import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Portal",
  description: "Student portal dashboard, courses, CGPA and assignments",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen grid grid-cols-[240px_1fr] grid-rows-[56px_1fr]`}>
        <aside className="row-span-2 border-r">
          <Sidebar />
        </aside>
        <header className="border-b">
          <TopNav />
        </header>
        <main className="p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
