import { Entry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { IEntry } from "../../../models/Entry";

type Data = { message: string } | IEntry[] | IEntry;

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  const entries = await Entry.find().sort({
    createdAt: "ascending",
  });

  res.status(200).json(entries);

  await db.disconnect();
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "" } = req.body;

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  });

  try {
    await db.connect();
    await newEntry.save();
    await db.disconnect();
    return res.status(201).json(newEntry);
  } catch (err) {
    await db.disconnect();
    console.log(err);
    return res.status(500).json({
      message: "Algo salio mal, revisar consola del servidor",
    });
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);
    case "POST":
      return postEntry(req, res);
    default:
      return res.status(400).json({
        message: "Endpoint not found",
      });
  }
}
