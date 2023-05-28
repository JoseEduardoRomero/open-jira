import { useMemo } from "react";
import type { NextPage } from "next";
import { Grid, Stack } from "@mui/material";
import { Layout } from "@/components/layouts";
import Column from "@/components/Column";

interface Columns {
  title: string;
  status: "pending" | "in-progress" | "finished";
  canCreateNewEntry: boolean;
}

const HomePage: NextPage = () => {
  const columns: Columns[] = useMemo(
    () => [
      {
        title: "Pendientes",
        status: "pending",
        canCreateNewEntry: true,
      },
      {
        title: "En progreso",
        status: "in-progress",
        canCreateNewEntry: false,
      },
      {
        title: "Completadas",
        status: "finished",
        canCreateNewEntry: false,
      },
    ],
    []
  );
  return (
    <Layout title="Home -Open Jira">
      <Stack mt={2}>
        <Grid container spacing={2}>
          {columns.map((column) => (
            <Grid item xs={12} sm={4} key={column?.status}>
              <Column>
                <Column.Header title={column.title} />
                {column.canCreateNewEntry && <Column.NewEntry />}
                <Column.Content status={column.status} />
              </Column>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Layout>
  );
};

export default HomePage;
