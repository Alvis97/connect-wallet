"use client";


import "./styles/globals.css";

import "@solana/wallet-adapter-react-ui/styles.css";

import { WalletContextProvider } from "./components/WalletContext";
import { ThemeProvider } from "./components/ThemeProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>
        <ThemeProvider>
        {children}
        </ThemeProvider>
        </WalletContextProvider>
      </body>
    </html>
  );
}
