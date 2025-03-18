"use client";

import styles from "./styles/page.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import  ConnectedComponent from "./components/ConnectedComponent";


export default function Home() {
const { publicKey, connected } = useWallet();

  return (
    <div className={styles.page}>
      <main className={styles.main}> 
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
