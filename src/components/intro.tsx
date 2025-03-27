"use client"

import Youtube1 from "@/components/youtube1";
import Banner1 from "@/components/banner1";


const Intro = () => {
  
  return (
    <>
      <Banner1 />
      <div>
        <p className="text-center px-3 pt-20 pb-7 text-m sm:text-3xl text-header font-bold overline">Hoe werkt het? Een stap-voor-stap uitleg.</p>
        <Youtube1 />
      </div>
      <div>
        <p className="px-3 pt-3 text-xl">Disclaimer:</p>
        <p className="px-3 text-sm">De functionaliteit van deze site werkt uitsluitend op desktop en laptop computers, niet op mobiel of tablet. Een app is in ontwikkeling. Omdat er een Chrome extensie nodig is, fungeert deze site slechts volledig via de Chrome of Brave browser. De benodigde Chrome extensie betreft een blockchain wallet (bv. Eternl, Lace of Yoroi). Via deze wallet kan een plantencollectie worden vastgelegd op de blockchain. Voor blockchaintransacties moet wel een klein bedrag betaald worden (in orde van grootte van 0,3 Ada wat momenteel overeenkomt met ca. €0,20).</p>
        <p className="pb-10 px-3 pt-3 text-xl">LET OP: OP DIT MOMENT IS DE SITE NOG SLECHTS MET WALLET IN PREPROD MODE TE GEBRUIKEN! WEBSITE IS NOG NIET GEKOPPELD AAN CARDANO MAINNET.</p>
      </div>
    </>
  );
};

export default Intro;