import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function WorkoutView({ userData }) {
  // If userData is missing, display a fallback
  if (!userData) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 64px)",
          color: "white",
          width: "100%",
          px: 2,
        }}
      >
        <Typography variant="h5">No user data found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)",
        color: "white",
        width: "100%",
        px: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          background: "linear-gradient(90deg, #00c853, #2196f3)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 3,
        }}
      >
        📝 Your Workout Plan Details
      </Typography>
      {Object.entries(userData).map(([key, value]) => (
        <Typography key={key} sx={{ mb: 1.5, color: "#c3eafe" }}>
          <strong>
            {key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1")}
            :
          </strong>{" "}
          {Array.isArray(value) ? value.join(", ") : value}
        </Typography>
      ))}
    </Box>
  );
}
