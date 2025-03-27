import { NextApiRequest, NextApiResponse } from 'next';
import { db } from "../../db";
import { floraTable } from "../../db/schema";
import { like } from "drizzle-orm";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { query, selectedOption } = req.body; // Get the query from the request body

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    // Ensure selectedOption is a valid column in floraTable
    const validColumns = {
      idd: floraTable.id,
      latinnam: floraTable.latinname,
      englishnam: floraTable.englishname,
      planttyp: floraTable.planttype,
      edibilit: floraTable.edibility,
      flowerin: floraTable.flowering,
      evergree: floraTable.evergreen,
    };

    // Get the corresponding column from floraTable
    const selectedKey = selectedOption as keyof typeof validColumns;
    const column = validColumns[selectedKey];

    // Fetch data from an external API
    const flora = await db.select({
      id: floraTable.id,
      latin_name: floraTable.latinname,
      english_name: floraTable.englishname,
      plant_type: floraTable.planttype,
      edi_bility: floraTable.edibility,
      flower_ing: floraTable.flowering,
      ever_green: floraTable.evergreen,
    }    
    ).from(floraTable).where(like(column, ("%" + query + "%")))
    
    // Return the fetched data to the frontend
    res.status(200).json(flora);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Failed to fetch data from external API' });
  }
}