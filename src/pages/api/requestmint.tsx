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
    const tx = await lucid.newTx().mintAssets({[policyId + fromText("PlantenCollectie")]: 1n}).pay.ToAddress(data.address, {[policyId + fromText("PlantenCollectie")]: 1n}).validFrom(Date.now()).attach.MintingPolicy(mintingPolicy).attachMetadata(721, {"646ab49018d6ef8287bb0cf2ab5a9a7032a673f36cd9cfcef3cf463a": {"asset10gzmk6f95nz6ju8zq76df9arlmn2z55l0660xa": {"name": "PlantenCollectie", "image": "ipfs://QmSLAau5zE7wVngxFsYeRroxKgVQouWApLPtZ1opD6FfiW", "planten": data.planten, "factoren": data.factoren}}, "version": 2}).complete();
    res.status(200).json({ tx: tx.toCBOR() });
  } else {
    // Handle any other HTTP method
  }
}