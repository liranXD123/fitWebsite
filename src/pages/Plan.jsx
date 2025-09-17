import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import WorkoutPage1 from "./workout/WorkoutPage1.jsx";
import WorkoutPage2 from "./workout/WorkoutPage2.jsx";
import WorkoutView from "./workout/WorkoutView.jsx";

import NutritionPage1 from "./nutrition/NutritionPage1.jsx";
import NutritionPage2 from "./nutrition/NutritionPage2.jsx";
import NutritionPage3 from "./nutrition/NutritionPage3.jsx";
import NutritionView from "./nutrition/NutritionView.jsx";

export default function Plan({ userData, setUserData }) {
  const [page, setPage] = useState("selection");

  const handleDataChange = (patch) => {
    setUserData((prev) => ({ ...prev, ...patch }));
  };

  if (page === "selection") {
    return (
      <Stack alignItems="center" spacing={3} pt={5}>
        <Button variant="contained" onClick={() => setPage("nutrition1")}>
          Build my nutrition plan!
        </Button>
        <Button variant="contained" onClick={() => setPage("workout1")}>
          Build my workout plan!
        </Button>
      </Stack>
    );
  }

  // === Nutrition Flow ===
  if (page === "nutrition1") {
    return (
      <NutritionPage1
        userData={userData}
        onDataChange={handleDataChange}
        onNextPage={() => setPage("nutrition2")}
      />
    );
  }

  if (page === "nutrition2") {
    return (
      <NutritionPage2
        userData={userData}
        onDataChange={handleDataChange}
        onNextPage={() => setPage("nutrition3")}
      />
    );
  }

  if (page === "nutrition3") {
    return (
      <NutritionPage3
        userData={userData}
        onDataChange={handleDataChange}
        onNextPage={() => setPage("nutritionView")}
      />
    );
  }

  if (page === "nutritionView") {
    return <NutritionView userData={userData} />;
  }

  // === Workout Flow ===
  if (page === "workout1") {
    return (
      <WorkoutPage1
        onDataChange={handleDataChange}
        onNextPage={() => setPage("workout2")}
      />
    );
  }

  if (page === "workout2") {
    return (
      <WorkoutPage2
        userData={userData}
        onDataChange={handleDataChange}
        onNextPage={() => setPage("workoutView")}
      />
    );
  }

  if (page === "workoutView") {
    return <WorkoutView userData={userData} />;
  }

  return null;
}
