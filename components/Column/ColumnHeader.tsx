import React from "react";
import { CardHeader } from "@mui/material";

interface ColumnHeaderProps {
  title: string;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = (props) => {
  const { title } = props;
  return <CardHeader title={title} />;
};
