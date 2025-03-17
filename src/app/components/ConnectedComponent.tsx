import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

function ConnectedComponent() {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
  return (
    <div>
      <p>Hello</p>

    </div>
  )
}

export default ConnectedComponent
