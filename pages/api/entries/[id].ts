import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "@/database";
import { Entry, IEntry } from "@/models";

type Data =
  | {
      message: string;
    }
  | IEntry;

// Obtenemos la entrada por medio de su id
const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  // Nos conectamos a la base de datos de mongo
  await db.connect();
  // Buscamos por medio de Id
  const entryFind = await Entry.findById(id);
  // Desconectamos la instancia
  await db.disconnect();
  // Si no encontramos datos , mandamos un error
  if (!entryFind) {
    return res.status(404).json({
      message: "Entry not found",
    });
  }
  return res.status(204).json(entryFind);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  // Nos conectamos a la base de datos de mongo
  await db.connect();
  // Buscamos y guardamos la referencia para actualizar
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
    // Empujamos los nuevos datos de la entrada
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    // Desconectamos la base de datos
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
  // Por medio del metodo que requiera el usuario , ejecutamos la funcion
  // En dado caso de que no se encuntre arrojamos un mensaje
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
