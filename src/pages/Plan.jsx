import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Plan() {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">Build my nutrition plan!</Button>
      <Button variant="contained" href="#contained-buttons">
        Build my workout plan!
      </Button>
    </Stack>
  );
}
