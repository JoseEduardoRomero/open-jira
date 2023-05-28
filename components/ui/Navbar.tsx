import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";
import { UIContext } from "@/context/ui";

export const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">Open Jira</Typography>
      </Toolbar>
    </AppBar>
  );
};
