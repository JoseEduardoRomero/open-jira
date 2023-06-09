import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "@/database";
import { Entry, IEntry } from "@/models";

type Data =
  | {
      message: string;
    }
  | IEntry;

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  await db.connect();
  const entryFind = await Entry.findById(id);
  await db.disconnect();
  if (!entryFind) {
    return res.status(404).json({
      message: "Entry not found",
    });
  }
  return res.status(204).json(entryFind);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({
      message: "No hay entrada con ese ID" + id,
    });
  }
  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedEntry);
  } catch (err: any) {
    await db.disconnect();
    res.status(400).json({
      message: err.message,
    });
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "El id no es valido" + id,
    });
  }
  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
    default:
      return res.status(400).json({
        message: "Metodo no existe",
      });
  }
}
