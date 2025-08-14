import { Toaster } from "react-hot-toast";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Suspense } from "react";
// import Myheader from "@/components/Myheader";
import Image from "next/image";

<Image
  src="/image.ico"
  alt="Site Logo"
  width={40}
  height={40}
  className="rounded-full"
/>


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Note APP",
  description: "A full-stack note-taking web app built with Next.js Create, Read, Update, and Delete your personal notes with privacy.",
};

export default function RootLayout({
  children,
}){
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster
  position="top-center"
  reverseOrder={true}
/>
        <BackgroundWrapper>
          
          <Suspense fallback={<div>Loading header...</div>}>
          </Suspense>
          {children}
        </BackgroundWrapper>
      </body>
    </html>
  );
}