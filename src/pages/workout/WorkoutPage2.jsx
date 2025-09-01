import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function WorkoutPage2({ userData }) {
  return (
    <Box
      sx={{
        color: "white",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4">✅ Data received</Typography>
      <pre style={{ textAlign: "left", marginTop: "20px" }}>
        {JSON.stringify(userData, null, 2)}
      </pre>
    </Box>
  );
}
