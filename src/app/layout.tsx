import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

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
    <html lang="en" className="min-h-dvh bg-[#FAF7F2] antialiased" suppressHydrationWarning>
      <body
        className="min-h-dvh flex flex-col font-sans bg-[#FAF7F2] text-stone-900 selection:bg-amber-200 selection:text-amber-950"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
