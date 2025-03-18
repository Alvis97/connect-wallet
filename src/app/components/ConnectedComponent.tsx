"use client";

import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import WalletInfo from './WalletInfo';

function ConnectedComponent() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();

  return (
    <div>
      <WalletInfo />
    </div>
  )
}

export default ConnectedComponent
