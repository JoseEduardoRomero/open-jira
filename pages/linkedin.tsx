import React from "react";
import { Stack, TextField, Button } from "@mui/material";

export const LinkedIn = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      height="100vh"
    >
      <TextField label="email" />
      <TextField label="password" type="password" />
      <Button variant="contained">Login LinkedIn</Button>
    </Stack>
  );
};

export default LinkedIn;
