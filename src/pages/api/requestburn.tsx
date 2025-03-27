import { Blockfrost, fromText, Lucid, mintingPolicyToId, scriptFromNative } from "@lucid-evolution/lucid";
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
    const mintingPolicy = scriptFromNative({type: "all", scripts: [{type: "after", slot: 7}]});
    const policyId = mintingPolicyToId(mintingPolicy);
    const tx = await lucid.newTx().mintAssets({[policyId + fromText("PlantenCollectie")]: -1n}).validFrom(Date.now()).attach.MintingPolicy(mintingPolicy).complete();
    res.status(200).json({ tx: tx.toCBOR() });
  } else {
    // Handle any other HTTP method
  }
}