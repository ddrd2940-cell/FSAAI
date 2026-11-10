import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "FSAAI — AI Video Studio",
  description: "Create videos from text and images with AI."
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
