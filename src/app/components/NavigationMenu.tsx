import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import React from 'react'

function NavigationMenu() {
  return (
    <div>
      <p>BlockDash</p>
      <WalletMultiButton />
    </div>
  )
}

export default NavigationMenu
