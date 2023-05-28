import React from "react";
import { CardContent } from "@mui/material";
import { EntryList } from "@/components/ui";

interface ColumnContentProps {
  status: "pending" | "in-progress" | "finished";
}

export const ColumnContent: React.FC<ColumnContentProps> = (props) => {
  const { status } = props;
  return (
    <CardContent>
      <EntryList status={status} />
    </CardContent>
  );
};
