import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { Tokens, Copies } from "./Icons";  // Ensure Copies is imported
import TokenStyle from "../styles/Token.module.scss";  // Import styles

interface TokenData {
  mint: string;
  amount: number;
}

function TokenInfo() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [copiedMint, setCopiedMint] = useState<string | null>(null);
  const [ sortOption, setSortOption] = useState<string>("newest");

  useEffect(() => {
    if (publicKey && connected) {
      const fetchTokens = async () => {
        try {
          const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            publicKey,
            { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
          );

          const tokenData: TokenData[] = tokenAccounts.value.map((accountInfo) => {
            const tokenAmount = accountInfo.account.data.parsed.info.tokenAmount.uiAmountString;
            const tokenMint = accountInfo.account.data.parsed.info.mint;
            return { mint: tokenMint, amount: tokenAmount };
          });

          setTokens(tokenData);
        } catch (error) {
          console.error("Error fetching tokens", error);
        }
      };

      fetchTokens();
    }
  }, [publicKey, connected, connection]);

  const copyToClipboard = (mint: string) => {
    navigator.clipboard.writeText(mint);
    setCopiedMint(mint);

    setTimeout(() => setCopiedMint(null), 2000);
  };

  const sortedTokens = [...tokens].sort((a, b) => {
    switch (sortOption) {
        case "newest":
            return 0;
        case "oldest":
            return 0;
        case "highest":
            return b.amount - a.amount;
        case "lowest":
            return a.amount - b.amount;
        default:
            return 0;               
    }
  })

  return (
    <div className="component">
      <Tokens />

       {/* Sorting Dropdown */}
      <select 
        value={sortOption} 
        onChange={(e) => setSortOption(e.target.value)}
        className={TokenStyle.select}
      >
        <option value="newest">Newest to Oldest</option>
        <option value="oldest">Oldest to Newest</option>
        <option value="highest">Highest Balance</option>
        <option value="lowest">Lowest Balance</option>
      </select>

      <div className={TokenStyle.tokenComponent}>
      {tokens.length > 0 ? (
        sortedTokens.map((token, index) => (
          <div 
           className={TokenStyle.tokenDiv}
           key={index}>
             <p> Token mint: </p>
            <span className={TokenStyle.span}>
              <p 
                onClick={() => copyToClipboard(token.mint)}
                className={TokenStyle.mint}
              > 
                {token.mint.slice(0, 6)}...{token.mint.slice(-5)}
                <Copies />
              </p>
              {copiedMint === token.mint && (
                <p className={TokenStyle.copied}>Copied!</p>
              )}
            </span>
            <p>Amount: {token.amount}</p>
            <hr className={TokenStyle.hr} />
          </div>
        ))
      ) : (
        <p>Loading token balances...</p>
      )}
      </div>
      <div className={TokenStyle.btnDiv}>
            <button className='btn'>Send Tokens</button>
        </div>
    </div>
  );
}

export default TokenInfo;



