"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import WalletButton from "./walletbutton";

const WalletConnect = () => {
  const network = NetworkType.TESTNET
  const { isConnected, enabledWallet, disconnect } = useCardano({
    limitNetwork: network,
  });

  if (typeof window !== "undefined") {
    return (
      <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
        {isConnected ? (
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
            <h1>{enabledWallet?.toUpperCase()}</h1>
            <button
              className="btn btn-square btn-outline"
              onClick={() => {
                disconnect();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ) : (
          <></>
        )}
        <WalletButton />
      </div>
    );
  };
};

export default WalletConnect;