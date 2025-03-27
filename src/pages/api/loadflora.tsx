import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "../../db";
import { floraTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { query } = req.body; // Get the query from the request body

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {

    // Fetch data from an external API
    const flora = await db.select({
      id: floraTable.id,
      latin_name: floraTable.latinname,
      dutch_name: floraTable.dutchname,
      english_name: floraTable.englishname,
      plant_type: floraTable.planttype,
      edi_bility: floraTable.edibility,
      flower_ing: floraTable.flowering,
      flower_color: floraTable.flowercolor,
      ever_green: floraTable.evergreen,
      ende_mic: floraTable.endemic,
      en_dangered: floraTable.endangered
    }    
    ).from(floraTable).where(eq(floraTable.id, (query)))
    
    // Return the fetched data to the frontend
    res.status(200).json(flora);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data from external API' });
  }
}