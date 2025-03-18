"use client";

import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import WalletInfo from './WalletInfo';
import TokenInfo from './TokenInfo';

function ConnectedComponent() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

  return (
    <div>
      <WalletInfo />
      <TokenInfo />
    </div>
  )
}

export default ConnectedComponent
