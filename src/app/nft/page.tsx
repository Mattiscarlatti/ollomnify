"use client";

import dynamic from "next/dynamic";

const NFTPage = dynamic(() => import("../../components/nftpage"), { ssr: false });

const NFT = () => {
  return (
      <div>
        <NFTPage />
      </div>
    );
  };
  
  export default NFT;

