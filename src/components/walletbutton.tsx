"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import Image from "next/image";

declare global {
  interface Window {
    my_modal: any;
  }
}

const WalletModal = () => {
  const network = NetworkType.TESTNET
  const { isConnected, connect, installedExtensions } = useCardano({
    limitNetwork: network,
  });

  if (typeof window !== "undefined") {
    return (
      <div>
        <button
          className="btn btn-outline rounded-full text-xs sm:text-base hover:text-white flex items-center justify-center gap-x-1 sm:px-3 sm:py-1 relative"
          onClick={() => window.my_modal.showModal()}
        >
          {isConnected ? "CONNECTED" : "CONNECT"}
        </button>
        <dialog id="my_modal" className="modal bg-black p-3 rounded border-[2px] border-gray-400 duration-200 relative">
          <form method="dialog" className="modal-box">
            <div className="flex flex-col p-2 gap-3 sm:gap-3 lg:gap-3">
              {installedExtensions.map((provider: string) => (
                <div key={provider} className="flex justify-around p-1 bg-gray-200 rounded border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
                  <button
                    className="btn btn-outline p-2"
                    onClick={() => connect(provider)}
                  >
                    {provider.toUpperCase()}
                  </button>
                  <span className="h-auto w-20">
                    <Image
                      src={window.cardano[provider].icon}
                      alt={provider}
                      width={36}
                      height={10}
                    />
                  </span>
                </div>
              ))}
            </div>
          </form>
          <form method="dialog" className="modal-backdrop text-center text-gray-200 p-4">
            <button>Close Window</button>
          </form>
        </dialog>
      </div>
    );
  };
};

export default WalletModal;