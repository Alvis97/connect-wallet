"use client";

import styles from "./page.module.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import  ConnectedComponent from "./components/ConnectedComponent";
import NavigationMenu from "./components/NavigationMenu";


export default function Home() {
const { publicKey, connected } = useWallet();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <NavigationMenu />  
        { !connected ? (
          <>
    <h1>Connect your Phantom Wallet to view, send, and manage your NFTs & Tokens securely.</h1>
     <h4></h4>
     {/* <p>Connected: {publicKey.toBase58()}</p> */}
          </>
        ) : (
          <ConnectedComponent/>
        )}
       
      </main>
      <footer className={styles.footer}>
  
     
      </footer>
    </div>
  );
}
