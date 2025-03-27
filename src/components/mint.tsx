"use client";

import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Flora, StateProps } from "../../type";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { Emulator, Lucid } from "@lucid-evolution/lucid";

const convertFormDataToString = (formData: { [key: string]: boolean }) => {
  const stringifiedData = Object.keys(formData).reduce((acc, key) => {
    acc[key] = formData[key] ? 1 : 0;
    return acc;
  }, {} as { [key: string]: number });

  return stringifiedData;
};

const Mint = () => {
  const { floraData } = useSelector((state: StateProps) => state?.shopping);
  const listIDs: number[] = floraData?.map((plantje: Flora) => plantje._id);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [formData, setFormData] = useState<{ [key: string]: boolean }>({
    watr: false,
    kalkst: false,
    doodht: false,
    rommel: false,
    zandgr: false,
    zandwl: false,
    bio: false,
    vlaai: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formattedFormData = convertFormDataToString(formData);
    console.log("Selected options:", formData);
    dialogRef.current?.close();
    
    if (isConnected && enabledWallet) {
      try {
        const lucid = await Lucid(new Emulator([]), "Preprod");
        const api = await window.cardano[enabledWallet].enable();
        lucid.selectWallet.fromAPI(api);
        const response = await fetch("/api/requestmint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address: usedAddresses[0], planten: listIDs, factoren: formattedFormData }),
        });
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        const { tx } = await response.json();
        const signedTx = await lucid.fromTx(tx).sign.withWallet().complete();
        const txh = await signedTx.submit();
        console.log(txh);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const network = NetworkType.TESTNET;
  const { isConnected, usedAddresses, enabledWallet } = useCardano({
    limitNetwork: network,
  });

  return (
    <>
      {isConnected ? (
        <div className="p-10 w-full">
          <div className="flex flex-col items-center gap-3 sm:gap-6 lg:gap-8">
            <button className="btn btn-outline rounded-full bg-darkText text-slate-100 px-2 py-2 text-sm flex items-center border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative" onClick={() => dialogRef.current?.showModal()}>
              Start Mint van deze Collectie (met onderstaande planten)
            </button>
            <dialog ref={dialogRef} className="modal bg-white p-3 rounded border-[2px] border-black">
              <h2 className="text-xl font-bold mb-4">Van toepassing op deze plantencollectie</h2>
              <form onSubmit={handleSubmit}>
              <label className="flex">
                  <input
                    type="checkbox"
                    name="watr"
                    checked={formData.watr}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  Schoon stromend water aanwezig in de directe omgeving
                </label>
                <label className="flex">
                  <input
                    type="checkbox"
                    name="kalkst"
                    checked={formData.kalkst}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  Ten minste enkele kuubs kalksteen doorlopend aanwezig
                </label>
                <label className="flex">
                  <input
                    type="checkbox"
                    name="doodht"
                    checked={formData.doodht}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  Ten minste enkele kuubs dood hout doorlopend aanwezig
                </label>
                <label className="flex">
                  <input
                    type="checkbox"
                    name="rommel"
                    checked={formData.rommel}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  Hele winter enkele kuubs dood plantenmateriaal aanwezig
                </label>
                <label className="flex">
                  <input
                    type="checkbox"
                    name="zandgr"
                    checked={formData.zandgr}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  Mul zandgrond in de directe omgeving
                </label>
                <label className="flex">
                  <input
                    type="checkbox"
                    name="zandwl"
                    checked={formData.zandwl}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  Zandwallen in de directe omgeving
                </label>
                <label className="flex">
                  <input
                    type="checkbox"
                    name="bio"
                    checked={formData.bio}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  Onderhoud zonder chemische bestrijdingsmiddelen
                </label>
                <label className="flex">
                  <input
                    type="checkbox"
                    name="vlaai"
                    checked={formData.vlaai}
                    onChange={handleCheckboxChange}
                    className="mt-1 mr-2"
                  />
                  Ontwormingsmiddelvrije veedieren in de directe omgeving
                </label>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="mr-2 btn btn-outline rounded-full bg-darkText text-slate-100 px-2 py-2 text-sm flex items-center border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative"
                    onClick={() => dialogRef.current?.close()}
                  >
                    Sluit Venster
                  </button>
                  <button type="submit" className="btn btn-outline rounded-full bg-darkText text-slate-100 px-2 py-2 text-sm flex items-center border-[2px] border-gray-400 hover:border-orange-600 duration-200 relative">
                    Mint Collectie
                  </button>
                </div>
              </form>
            </dialog>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Mint;