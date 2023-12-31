import { useContext, useMemo, DragEvent } from "react";
import { List, Paper } from "@mui/material";
import React from "react";
import { EntryCard } from "./";
import { EntryStatus } from "@/interfaces";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "../../context/ui/UIContext";
import styles from "./EntryList.module.css";

interface PropsEntryList {
  status: EntryStatus;
}

export const EntryList = ({ status }: PropsEntryList) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  // Evento que ocurre cuando una selección que se puede arrastrar se coloca en un objetivo.
  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    // Hace que el navegador no cominece a recargar, evitamos este comportamiento
    event.preventDefault();
  };

  // Evento que ocurre cuando una selección arrastrable se arrastra sobre un destino
  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    // Extraemos el id que previamente seteamos en el objeto que vamos a mover
    const id = event.dataTransfer.getData("text");
    // Buscamos el elemento dentro del array de entradas
    const entry = entries.find((e) => e._id === id)!;
    // Modificamos el estatus de la tarjeta segun la columna donde estemos
    entry.status = status;
    // Mandamos a la base de datos para poder actualizar
    updateEntry(entry);
    // Modificamos estilos
    endDragging();
  };

  return (
    <div
      className={isDragging ? styles?.dragging : ""}
      onDrop={onDropEntry}
      onDragOver={allowDrop}
    >
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "auto",
          background: "transparent",
        }}
      >
        <List
          sx={{
            opacity: isDragging ? 0.2 : 1,
            transition: "all .3s",
          }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default React.memo(EntryList);
