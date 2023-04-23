import { useContext, useMemo } from "react";
import { List, Paper } from "@mui/material";
import React from "react";
import { EntryCard } from "./";
import { EntryStatus } from "@/interfaces";
import { EntriesContext } from "@/context/entries";

interface PropsEntryList {
  status: EntryStatus;
}

export const EntryList = ({ status }: PropsEntryList) => {
  const { entries } = useContext(EntriesContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  return (
    <div>
      <Paper
        sx={{
          height: "calc(100vh - 250px)",
          overflow: "auto",
          background: "transparent",
        }}
      >
        <List
          sx={{
            opacity: 1,
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
