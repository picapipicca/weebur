import React from "react";
import type { Metadata } from "next";
import QueryProvider from "@/shared/provider/QueryProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Weebur",
  description: "과제",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
