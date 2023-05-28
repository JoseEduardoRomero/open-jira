import React from "react";
import { Card } from "@mui/material";

interface ColumnProps {
  children: React.ReactNode;
}

export const Column: React.FC<ColumnProps> = (props) => {
  const { children } = props;
  return (
    <Card
      sx={{
        height: "calc(100vh - 100px)",
        bgcolor: "#F7F8F9",
      }}
    >
      {children}
    </Card>
  );
};
