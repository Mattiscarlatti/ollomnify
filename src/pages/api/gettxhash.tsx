import { Blockfrost, Lucid } from "@lucid-evolution/lucid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const initLucid = () => {
        return Lucid(new Blockfrost (process.env.API_URL_PREPROD!, process.env.BLOCKFROST_KEY_PREPROD!), "Preprod");
    };
    const lucid = await initLucid();
    const data = req.body;
    lucid.selectWallet.fromAddress(data.address, [])
    const utxos = await lucid.utxosAt(data.address as string);
    //console.log(utxos.map(utxo => Object.keys(utxo.assets)));
    const nftUtxo = utxos.find(utxo => Object.keys(utxo.assets).includes("646ab49018d6ef8287bb0cf2ab5a9a7032a673f36cd9cfcef3cf463a506c616e74656e436f6c6c6563746965"));
      if (!nftUtxo) {
        return res.status(404).json({ error: "no Plant Collection found." });
      }
    const nftTxh = nftUtxo.txHash
    res.status(200).json(nftTxh);
  } else {
    // Handle any other HTTP method
  }
}