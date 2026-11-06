import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TapTap NFC | Smart Shop Card & Review Portal",
  description: "Instant NFC & QR Code Smart Landing Pages for modern stores and businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-[#F9F6F0] text-stone-900 selection:bg-amber-200 selection:text-amber-950">
        {children}
      </body>
    </html>
  );
}
