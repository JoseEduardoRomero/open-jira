import React, { FC, DragEvent, useContext } from "react";
import { Entry } from "../../interfaces";
import { UIContext } from "../../context/ui/UIContext";
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

  const onDragStart = (event: DragEvent) => {
    event.dataTransfer.setData("text", entry._id);
    startDragging();
  };

  const onDragEnd = () => {
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
