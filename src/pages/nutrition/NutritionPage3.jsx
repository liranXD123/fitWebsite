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

export default function NutritionPage3({ userData, onDataChange, onNextPage }) {
  const [nutritionType, setNutritionType] = useState(
    userData.nutritionType || ""
  );
  const [budget, setBudget] = useState(userData.budget || "");
  const [notes, setNotes] = useState(userData.notes || "");
  const [saved, setSaved] = useState(false);

  const nutritionOptions = [
    "None",
    "Kosher",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Halal",
    "Paleo",
    "Keto",
  ];
  const budgets = ["$", "$$", "$$$"];

  const canSave = nutritionType && budget;

  const handleSave = () => {
    if (!canSave) return;
    onDataChange({ nutritionType, budget, notes });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onNextPage();
    }, 800);
  };

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
          ⚡ Final Touches
        </Typography>

        {/* Nutrition Type */}
        <Box>
          <Typography color="white" mb={1} fontWeight={600}>
            Nutrition Type
          </Typography>
          <ToggleButtonGroup
            value={nutritionType}
            exclusive
            onChange={(_, val) => val && setNutritionType(val)}
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
            {nutritionOptions.map((type) => (
              <ToggleButton key={type} value={type}>
                {type}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Budget */}
        <Box>
          <Typography color="white" mb={1} fontWeight={600}>
            Budget
          </Typography>
          <ToggleButtonGroup
            value={budget}
            exclusive
            onChange={(_, val) => val && setBudget(val)}
            sx={{
              justifyContent: "center",
              gap: 1,
              "& .MuiToggleButton-root": {
                color: "#fff",
                fontWeight: 700,
                px: 3,
                borderRadius: 3,
                "&.Mui-selected": { background: gradient },
              },
            }}
          >
            {budgets.map((b) => (
              <ToggleButton key={b} value={b}>
                {b}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Notes */}
        <TextField
          label="Allergies or notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          multiline
          rows={3}
          InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
          InputProps={{
            sx: {
              color: "white",
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: 2,
            },
          }}
        />

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
