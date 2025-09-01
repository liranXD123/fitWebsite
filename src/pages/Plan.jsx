import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import WorkoutPage1 from "./workout/WorkoutPage1.jsx";

export default function Plan({ userData, setUserData }) {
  const [isWorkout, setIsWorkout] = useState(false);

  function handleWorkoutClick() {
    setIsWorkout(true);
  }

  // function passed to WorkoutPage1 to merge saved fields into App.userData
  const handleDataChange = (patch) => {
    // setUserData is a function from App that merges a patch into global userData
    setUserData(patch);
  };

  return !isWorkout ? (
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 6 }}>
      <Button variant="contained">Build my nutrition plan!</Button>
      <Button onClick={handleWorkoutClick} variant="contained">
        Build my workout plan!
      </Button>
    </Stack>
  ) : (
    // pass the updater to WorkoutPage1 as `onDataChange`
    <WorkoutPage1 onDataChange={handleDataChange} />
  );
}
