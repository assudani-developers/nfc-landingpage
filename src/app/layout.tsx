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
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col font-sans bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-black">
        {children}
      </body>
    </html>
  );
}
