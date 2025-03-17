"use client";

import styles from "./page.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";

export default function Home() {
  const wallet = useWallet();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
            <h1>Connect your Phantom Wallet to view, send, and manage your NFTs & Tokens securely.</h1>
            <h4></h4>
            <WalletMultiButton />
            {/* <p>Connected: {publicKey.toBase58()}</p> */}
      </main>
      <footer className={styles.footer}>
  
     
      </footer>
    </div>
  );
}
