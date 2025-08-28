import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import WorkoutPage1 from "./workout/WorkoutPage1.jsx";

export default function Plan() {
  const [isWorkout, setIsWorkout] = useState(false);
  function handleWorkoutClick() {
    setIsWorkout(true);
  }
  return !isWorkout ? (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">Build my nutrition plan!</Button>
      <Button
        onClick={handleWorkoutClick}
        variant="contained"
        href="#contained-buttons"
      >
        Build my workout plan!
      </Button>
    </Stack>
  ) : (
    <WorkoutPage1 />
  );
}
