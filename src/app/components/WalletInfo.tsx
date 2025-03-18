import React, { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

import WalletStyle from '../styles/walletStyles.module.scss';
import { Copies, Wallet } from './Icons';

function WalletInfo() {
    const { connection } = useConnection();
    const { publicKey, connected} = useWallet();
    const [ balance, setBalance ] = useState<number>(0);
    const [ copied, setCopied ] = useState(false);

    const pubKeyStr = publicKey?.toString();

    const maskedKey = pubKeyStr ? `${pubKeyStr.slice(0,4)}...${pubKeyStr.slice(-4)}` : "Not Connected";

    const copyToClipboard = () => {
        if ( pubKeyStr ) {
            navigator.clipboard.writeText(pubKeyStr);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }

    useEffect(() => {
       if (!publicKey) return;

       const fetchBalance = async () => {
        const balanceLamports = await connection.getBalance(publicKey);
        setBalance(balanceLamports / LAMPORTS_PER_SOL);
       };

       fetchBalance();
});

  return (
    <div>
      { !connected ? ( 
        <>
        <p>Error fetching wallet data</p>
        </>
      ) : (
        <>
        <div className="component">
        <Wallet />  
        <div className={WalletStyle.wComponent} >
        <p>PublicKey:</p>
        <span className={WalletStyle.span}>
        <p 
        onClick={copyToClipboard}
        className={WalletStyle.pubKey}
        >{maskedKey}
        <Copies /></p>
        {copied && <p  className={WalletStyle.copied}>Copied!</p>}
        </span>
    
        <p className={WalletStyle.balance}>Balance:</p>
        <p className={WalletStyle.balance}>{balance.toFixed(2)} SOL</p>
        </div>  
  
        <div className={WalletStyle.btnDiv}>
            <button className='btn'>Send SOL</button>
        </div>
        </div>
        </>
      )}  
      
    </div>
  )
}

export default WalletInfo
