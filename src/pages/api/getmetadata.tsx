import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "POST") {
    try {
        const data = req.body;
        const url = `${process.env.API_URL_PREPROD}/txs/${data.txh}/metadata`;
        const response = await fetch(url, {
        headers: { project_id: process.env.BLOCKFROST_KEY_PREPROD! },
        });

        if (!response.ok) {
        throw new Error(`Failed to fetch metadata: ${response.statusText}`);
        }

        const metadata = await response.json();
        res.status(200).json(metadata);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
  }
}