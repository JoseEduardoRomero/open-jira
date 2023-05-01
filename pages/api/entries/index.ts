import { Entry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { IEntry } from "../../../models/Entry";

type Data = { message: string } | IEntry[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    default:
      return res.status(400).json({
        message: "Endpoint not found",
      });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  const entries = await Entry.find().sort({
    createdAt: "ascending",
  });

  res.status(200).json(entries);

  await db.disconnect();
};