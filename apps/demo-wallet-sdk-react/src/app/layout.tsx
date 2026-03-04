// #region wallet-sdk-react-provider

"use client";

import { defaultConnectors } from "@fuels/connectors";
import { FuelProvider } from "@fuels/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import React from "react";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.StrictMode>
      <html>
        <QueryClientProvider client={queryClient}>
          <FuelProvider
            fuelConfig={{ connectors: defaultConnectors({ devMode: true }) }}
          >
            <body className={inter.className}>{children}</body>
          </FuelProvider>
        </QueryClientProvider>
      </html>
    </React.StrictMode>
  );
}
// #endregion wallet-sdk-react-provider
