import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florentina Ops",
  description: "Internal operations app for Floreria Florentina",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
