"use client"

import Youtube1 from "@/components/youtube1";
import Banner1 from "@/components/banner1";


const Intro = () => {
  
  return (
    <>
      <Banner1 />
      <div>
        <p className="text-center px-3 pt-20 pb-7 text-m sm:text-3xl text-header font-bold overline">How to use this site? A step-by-step tutorial.</p>
        <Youtube1 />
      </div>
      <div>
        <p className="px-3 pt-3 text-xl">Disclaimer:</p>
        <p className="px-3 text-sm">The functionality of this site only works on desktop and laptop computers, not on mobile devices. An app is in development. Since a Chrome extension is required, this site only functions completely via the Chrome or Brave browser. The required Chrome extension is a blockchain wallet (e.g. Eternl, Lace or Yoroi). Via this wallet, a plant collection can be recorded on the blockchain. For blockchain transactions, a small amount must be paid (in the order of magnitude of 0.3 Ada, which currently corresponds to approx. $0.20).</p>
        <p className="pb-10 px-3 pt-3 text-xl">PLEASE NOTE: AT THIS TIME THE SITE CAN ONLY BE USED WITH WALLET IN PREPROD MODE! THE SITE IS NOT YET CONNECTED TO CARDANO MAINNET.</p>
      </div>
    </>
  );
};

export default Intro;