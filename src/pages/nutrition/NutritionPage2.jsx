import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

const gradient = "linear-gradient(135deg, #00c853 0%, #2196f3 100%)";
const bgGradient =
  "radial-gradient(circle at 70% 20%, #1a2334 0%, #101725 100%)";

export default function NutritionPage2({ userData, onDataChange, onNextPage }) {
  const [goal, setGoal] = useState(userData.goal || "");
  const [activityLevel, setActivityLevel] = useState(
    userData.activityLevel || ""
  );
  const [meals, setMeals] = useState(userData.meals || "");
  const [saved, setSaved] = useState(false);

  const canSave =
    goal && activityLevel && meals && Number(meals) >= 1 && Number(meals) <= 10;

  const handleSave = () => {
    if (!canSave) return;
    onDataChange({
      goal,
      activityLevel,
      meals,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onNextPage();
    }, 800);
  };

  const activityLevels = [
    "Sedentary",
    "Lightly active",
    "Active",
    "Very active",
  ];
  const goals = [
    "Lose weight",
    "Maintain weight",
    "Gain weight",
    "Better nutrition",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        bgcolor: bgGradient,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        component={motion.div}
        elevation={7}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        sx={{
          width: "100%",
          maxWidth: 520,
          p: { xs: 3, sm: 5 },
          borderRadius: 5,
          bgcolor: "rgba(28,34,49,0.97)",
          boxShadow: "0 8px 30px rgba(0, 200, 83, 0.25)",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{
            background: gradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🍴 Nutrition Preferences
        </Typography>

        {/* Goal */}
        <Box>
          <Typography color="white" mb={1} fontWeight={600}>
            Your Goal
          </Typography>
          <ToggleButtonGroup
            value={goal}
            exclusive
            onChange={(_, g) => g && setGoal(g)}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
              "& .MuiToggleButton-root": {
                color: "#fff",
                fontWeight: 600,
                px: 2,
                borderRadius: 3,
                "&.Mui-selected": { background: gradient },
              },
            }}
          >
            {goals.map((g) => (
              <ToggleButton key={g} value={g}>
                {g}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Activity */}
        <Box>
          <Typography color="white" mb={1} fontWeight={600}>
            Activity Level
          </Typography>
          <ToggleButtonGroup
            value={activityLevel}
            exclusive
            onChange={(_, val) => val && setActivityLevel(val)}
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
              "& .MuiToggleButton-root": {
                color: "#fff",
                fontWeight: 600,
                px: 2,
                borderRadius: 3,
                "&.Mui-selected": { background: gradient },
              },
            }}
          >
            {activityLevels.map((al) => (
              <ToggleButton key={al} value={al}>
                {al}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Meals */}
        <Box>
          <Typography color="white" mb={1} fontWeight={600}>
            Meals per Day
          </Typography>
          <TextField
            type="number"
            value={meals}
            onChange={(e) =>
              setMeals(
                e.target.value
                  ? Math.max(1, Math.min(10, Number(e.target.value))).toString()
                  : ""
              )
            }
            fullWidth
            placeholder="Enter 1–10"
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
            InputProps={{
              sx: {
                color: "white",
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {/* Save */}
        <Button
          component={motion.button}
          whileHover={{ scale: 1.03, boxShadow: "0 0 0 3px #00c853" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={!canSave}
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "12px",
            py: 1.3,
            fontWeight: 700,
            background: gradient,
          }}
        >
          Save
        </Button>
        {saved && (
          <Typography
            sx={{ color: "#afffaf", textAlign: "center", fontWeight: 600 }}
            component={motion.div}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            ✅ Saved!
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
