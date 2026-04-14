import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maintenance | Cliff's Towing",
  description: "Cliff's Towing website is currently under maintenance. For emergencies, call +1 (780) 451-1555.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
