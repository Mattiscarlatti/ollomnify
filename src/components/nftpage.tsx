"use client";

import { useEffect, useState } from "react";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { Emulator, Lucid } from "@lucid-evolution/lucid";
import { ChartPlantTypen } from "@/components/chartplanttypen";
import Banner2 from "@/components/banner2";
import Container from "@/components/container";
import { Flora2 } from "../../type";

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

function calculateFactorScore(records: Record<string, number>): number {
  let score = 1;
  const multiplierMap: Record<string, number> = {
    watr: 1.06,
    kalkst: 1.06,
    rommel: 1.06,
    vlaai: 1.06,
    zandgr: 1.02,
    zandwl: 1.02,
    doodht: 1.02,
    bio: 0.66,
  };
  for (const key in records) {
    if (key !== "bio" && records[key] === 1 && multiplierMap[key]) {
      score *= multiplierMap[key];
    } else if (key === "bio" && records[key] === 0) {
      score *= multiplierMap[key];
    }
  }
  return score;
};

const calculateRecordScore = (flora: Flora2): number => {
  let score = 1;
  if (flora.latin_name.includes(" more than 25")) {
    score *= 3;
  }
  if (
    ["tree", "shrub"].some((type) => flora.plant_type.includes(type))
  ) {
    score *= 3;
  } else if (flora.plant_type.includes("perennial")) {
    score *= 1.5;
  }
  return score;
};

const sumList = (numbers: number[]): number => {
  return numbers.reduce((sum, num) => sum + num, 0);
};

const NFTPage = () => {
  const [txH, setTxh] = useState("");
  const [inputValue, setInputValue] = useState<string>('');
  const [planTen, setPlanten] = useState<number[]>([]);
  const [floras, setFloras] = useState<Flora2[]>([]);
  const [factors, setFactors] = useState<Record<string, number>>({ watr: 0, kalkst: 0, rommel: 0, vlaai: 0, zandgr: 0, zandwl: 0, doodht: 0, bio: 0 });
  const [totalScore, setTotalScore] = useState<number>();
  const [aantal, setAantal] = useState<number>();
  const [aantalBomen, setAantalBomen] = useState<number>();
  const [aantalBomen25, setAantalBomen25] = useState<number>();
  const [aantalGroen, setAantalGroen] = useState<number>();
  const [aantalEetbaar, setAantalEetbaar] = useState<number>();
  const [aantalType, setAantalType] = useState<{ name: string; value: number }[]>([]);
  const [error, setError] = useState('');
  const network = NetworkType.TESTNET;
  const { isConnected, usedAddresses, enabledWallet } = useCardano({
    limitNetwork: network,
  });
  const handleClick = async () => {
    if (isConnected && enabledWallet) {
      try {
        const lucid = await Lucid(new Emulator([]), "Preprod");
        const api = await window.cardano[enabledWallet].enable();
        lucid.selectWallet.fromAPI(api);
        const response = await fetch("/api/gettxhash", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address: usedAddresses[0] }),
        });
        const resTxh = await response.json();
        setTxh(resTxh);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClick2 = () => {
    setTxh(inputValue);
    fetchMetadata(inputValue);
  };

  useEffect(() => {
    if (txH) {
      fetchMetadata(txH);
    }
  }, [txH]);

  const fetchMetadata = async (txH: string) => {
    try {
        const response = await fetch("/api/getmetadata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ txh: txH }),
        });
        const resMetadata = await response.json();
        const jsonMetadata = resMetadata[0]?.json_metadata;
        const policyId = Object.keys(jsonMetadata).find(key => key !== "version");
        const assetId = Object.keys(jsonMetadata[policyId!])[0];
        const plantenString = jsonMetadata[policyId!][assetId]?.planten || [];
        const plantenJson = JSON.stringify(plantenString);
        const plantenArray: number[] = JSON.parse(plantenJson);
        setPlanten(plantenArray);
        const factorString = jsonMetadata[policyId!][assetId]?.factoren || [];
        const factorJson = JSON.stringify(factorString);
        const factorArray: Record<string, number> = JSON.parse(factorJson);
        setFactors(factorArray);
      } catch (error) {
        console.log(error);
    }
  };
  
  useEffect(() => {
    if (planTen && planTen.length > 0) {
      Promise.all(planTen.map((x) => loadFlora(x)))
      .then(resultaten => {
        const jsonObject: Flora2[] = resultaten?.map((x) => (x?.[0]) ?? []).filter((item): item is Flora2 => !!item);
        setFloras(jsonObject);
        const scoreListx = jsonObject.map((x) => (calculateRecordScore(x)));
        const scoreListy = scoreListx.map((x) => (1+(x/10)))
        const recordsum = sumList(scoreListy);
        const factorsum = calculateFactorScore(factors);
        const totalsum = Math.round(recordsum**factorsum);
        setTotalScore(totalsum);
        console.log(recordsum);
        const aantalplanten = jsonObject.length;
        setAantal(aantalplanten);
        const aantalboom = jsonObject.filter(obj => obj.plant_type === " tree");
        const aantalBom = aantalboom.length;
        setAantalBomen(aantalBom);
        const aantalBom25 = jsonObject.filter(obj => obj.latin_name.includes(" more than 25"));
        const aantalB25 = aantalBom25.length;
        setAantalBomen25(aantalB25);
        const aantalGroenBl = jsonObject.filter(obj => obj.ever_green === " evergreen");
        const aantalGroenB = aantalGroenBl.length;
        setAantalGroen(aantalGroenB);
        const aantalEetb = jsonObject.filter(obj => obj.edi_bility?.trim());
        const aantalEetba = aantalEetb.length;
        setAantalEetbaar(aantalEetba);
        const plantTypeCounts = jsonObject.reduce<Record<string, number>>((acc, flor) => {
          acc[flor.plant_type] = (acc[flor.plant_type] || 0) + 1;
          return acc;        
        }, {});
        const formattedPlantTypeCounts: { name: string; value: number }[] = 
          Object.entries(plantTypeCounts).map(([key, value]) => ({
            name: key,
            value: value as number,
        }));
        const sortedPTCounts = [...formattedPlantTypeCounts].sort((a, b) => b.value - a.value);
        setAantalType(sortedPTCounts);
      })
      .catch(error => console.error("Error loading flora:", error));
    };
  }, [planTen]);

  const loadFlora = async (planT: number) => {
    try {
      const response = await fetch('/api/loadflora', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: planT }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const datax: Flora2[] = await response.json();
      return datax;
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAPI = async () => {
    if (isConnected && enabledWallet) {
      try {
        const lucid = await Lucid(new Emulator([]), "Preprod");
        const api = await window.cardano[enabledWallet].enable();
        lucid.selectWallet.fromAPI(api);
        const response = await fetch("/api/requestburn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address: usedAddresses[0] }),
        });
        const { tx } = await response.json();
        const signedTx = await lucid.fromTx(tx).sign.withWallet().complete();
        const txh = await signedTx.submit();
        console.log(txh);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container>
    <div className="grid grid-cols-1 gap-6 bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">
      { txH && 
        <div className="grid grid-cols-6 px-3 py-2">
          <p className="flex flex-col col-span-5 rounded-l-xl items-center justify-center gap-x-1 px-3 py-1">Results shown of Plant Collection with adres: {txH}</p>
          <button className="flex flex-col col-span-1 bg-black rounded-xl hover:bg-slate-950 text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-3 py-1 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative" onClick={handleAPI}>
              Burn this Collection
          </button>
        </div>
      }
      <div className="grid grid-cols-1 gap-2 gap-x-2 px-3 py-2 items-center">
        <div className="grid grid-cols-2">
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Input the address referring to a plant collection..."
            className="flex flex-col rounded-l-xl text-center items-center justify-center text-xs sm:text-base gap-x-1 px-1 sm:px-3 py-1 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative" 
            name="inputtxh"
          />
          <button onClick={handleClick2} className="bg-black rounded-r-xl hover:bg-slate-950 text-xs sm:text-base text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-1 sm:px-3 py-1 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">Load Plant Collection from Added Adres</button>
        </div>
        <button onClick={handleClick} className="bg-black rounded-xl hover:bg-slate-950 text-xs sm:text-base text-slate-100 hover:text-white flex items-center justify-center gap-x-1 px-1 sm:px-3 py-1 border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">Load Plant Collection from Connected Wallet</button>
      </div>
      { aantalEetbaar &&  
        <div className="relative w-full h-[200px] flex items-center bg-gray-200"> 
        <Banner2 
            plantendata0={{
              aantalPlantenSoorten: aantal as number,
              aantalBoomSoorten: aantalBomen as number,
              aantalBoomSoorten25: aantalBomen25 as number,
              aantalEetbareSoorten: aantalEetbaar as number,
              aantalGroenblijvendeSoorten: aantalGroen as number,
               biodiversiteitsScore: totalScore as number
            }}
      /></div>
      }
      { aantalEetbaar &&
        <div className="grid grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-2"><p className="">Type of Plants</p><ChartPlantTypen plantendata1={aantalType as any[]} /></div>
        </div>
      }
      { aantalEetbaar && 
        <div>
          <table className="table-auto border-collapse border border-gray-400 w-full text-left">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-2">No</th>
                <th className="border border-gray-300 px-2 py-2">Latin Name</th>
                <th className="border border-gray-300 px-2 py-2">english Name</th>
                <th className="border border-gray-300 px-2 py-2">Type of Plant</th>
                <th className="border border-gray-300 px-2 py-2">Eetbaar</th>
                <th className="border border-gray-300 px-2 py-2">Bloeimaanden</th>
                <th className="border border-gray-300 px-2 py-2">Groenblijvend</th>
              </tr>
            </thead>
            <tbody>
              {floras.map((flor) => (
                <tr key={flor.id}>
                  <td className="border border-gray-300 px-2 py-2">{flor.id}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor.latin_name}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.english_name}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.plant_type}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.edi_bility}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.flower_ing}</td>
                  <td className="border border-gray-300 px-2 py-2">{flor?.ever_green}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
    </Container>
  );
}

export default NFTPage;