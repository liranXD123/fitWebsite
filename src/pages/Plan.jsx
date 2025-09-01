import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import WorkoutPage1 from "./workout/WorkoutPage1.jsx";
import WorkoutPage2 from "./workout/WorkoutPage2.jsx";

export default function Plan({ userData, setUserData }) {
  // track which screen we're on
  const [page, setPage] = useState("selection");
  // "selection" | "workout1" | "workout2"

  const handleDataChange = (patch) => {
    // merge new data into the global userData state
    setUserData((prev) => ({ ...prev, ...patch }));
  };

  if (page === "selection") {
    return (
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 6 }}>
        <Button variant="contained">Build my nutrition plan!</Button>
        <Button onClick={() => setPage("workout1")} variant="contained">
          Build my workout plan!
        </Button>
      </Stack>
    );
  }

  if (page === "workout1") {
    return (
      <WorkoutPage1
        onDataChange={handleDataChange}
        onNextPage={() => setPage("workout2")}
      />
    );
  }

  if (page === "workout2") {
    return <WorkoutPage2 userData={userData} />;
  }

  return null;
}
