import React, { FC, DragEvent, useContext } from "react";
import { Entry } from "@/interfaces";
import { UIContext } from "@/context/ui/UIContext";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

interface PropsEntryCard {
  entry: Entry;
}

export const EntryCard: FC<PropsEntryCard> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);

  // Evento ocurre cuando el usuario comienza a arrastrar una selección .
  const onDragStart = (event: DragEvent) => {
    // Seteamos el id de la tarjeta en el objeto
    event.dataTransfer.setData("text", entry._id);
    // Modificamos la variable para poder cambiar estilos
    startDragging();
  };

  // Evento que ocurre cuanod terminamos de mover la tarjeta
  const onDragEnd = () => {
    // Funcion para cambiar el estado de la variable, isDragging, que se utiliza para poder
    // Cambiar estilos
    endDragging();
  };

  return (
    <Card
      sx={{
        mb: 1,
        padding: "1px 5px",
      }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography whiteSpace="pre-line">{entry?.description}</Typography>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "end",
            pr: 2,
          }}
        >
          <Typography variant="body2">hace 2 horas</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default React.memo(EntryCard);
