import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/ConvexClientProvider";

export const metadata: Metadata = {
  title: "NextGen - Hackers Meetup",
  description: "Hackathon Hub - NSBM Green University",
};

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body
        className={`${spaceGrotesk.className} antialiased text-white select-none bg-[#070913] min-h-dvh relative overflow-x-hidden`}
      >
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 bg-[url('/assets/background.png')] bg-cover bg-center bg-no-repeat"
        />
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(11,15,28,0.35)_0%,rgba(6,9,19,0.78)_100%)] pointer-events-none"
        />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
