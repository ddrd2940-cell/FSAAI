import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "FSAAI — Imagine. Generate.", description: "Create AI videos from a prompt with FSAAI." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
