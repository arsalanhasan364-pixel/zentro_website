import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZENTRO — Your Discord, Upgraded",
  description: "The official ZENTRO Discord bot website and dashboard."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
