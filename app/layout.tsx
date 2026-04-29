import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TQMP Philippines | Glass and Aluminum Solutions",
  description:
    "TQMP Philippines delivers integrated glass, aluminum, protection, and processing solutions with a modern digital brochure and product catalog experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
