import React from "react";
import { Card } from "@mui/material";

interface ColumnProps {
  children: React.ReactNode;
  color?: string;
}

export const Column: React.FC<ColumnProps> = (props) => {
  const { children, color = "#F7F8F9" } = props;
  return (
    <Card
      sx={{
        height: "calc(100vh - 100px)",
        bgcolor: color,
      }}
    >
      {children}
    </Card>
  );
};
