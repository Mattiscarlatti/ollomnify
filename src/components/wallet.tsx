"use client";

import dynamic from "next/dynamic";

const WalletConnect = dynamic(() => import("../components/walletconnect"), { ssr: false });

const Wallet = () => {
  return (
      <div>
        <WalletConnect />
      </div>
    );
  };
  
  export default Wallet;

