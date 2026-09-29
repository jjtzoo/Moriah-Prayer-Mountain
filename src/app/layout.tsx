import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Moriah Prayer Mountain | A Place Set Apart for Prayer",
    template: "%s | Moriah Prayer Mountain",
  },
  description:
    "A place for prayer, rest, fellowship, and spiritual renewal in Masbate, Philippines.",
  openGraph: {
    title: "Moriah Prayer Mountain",
    description:
      "A place in Masbate to come away, seek God, and share life together.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
