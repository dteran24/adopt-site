// pages/api/animals.js
import { FilterOptions } from "@/app/models/pet";
import { getAnimals } from "../../actions";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { bearerToken, filter, type, location, page } = req.query;

  try {
    if (bearerToken) {
      const animals = await getAnimals(
        bearerToken as string,
        filter as unknown as FilterOptions,
        type as string,
        location as string,
        Number(page)
      );

      res.status(200).json(animals);
    }
  } catch (error) {
    console.error("Error fetching animals:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
