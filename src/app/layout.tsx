import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
    title: "NextGen - Hackers Meetup",
    description: "Hakcathon Hub - NSBM Green University",
};

const rubik = Rubik({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
