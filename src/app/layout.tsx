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
      {/* w-screen + overflow-x-hidden prevent page-wide horizontal scroll.
          grid stays the same; min-w-0 is added on <main> below. */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-screen overflow-x-hidden grid grid-cols-[200px_40px_1fr] grid-rows-[56px_1fr]`}>
        <aside className="row-span-2 col-start-1 border-r">
          <Sidebar />
        </aside>
        <header className="col-start-3 border-b pl-6 pr-8">
          <TopNav />
        </header>
        {/* min-w-0 lets content shrink inside this grid column instead of pushing page width */}
        <main className="col-start-3 p-6 pl-12 pr-16">
          {children}
        </main> 
      </body>
    </html>
  );
}