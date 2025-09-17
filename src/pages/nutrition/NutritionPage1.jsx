import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

const gradient = "linear-gradient(135deg, #00c853 0%, #2196f3 100%)";
const bgGradient =
  "radial-gradient(circle at 70% 20%, #1a2334 0%, #101725 100%)";

export default function NutritionPage1({ userData, onDataChange, onNextPage }) {
  const [age, setAge] = useState(userData.age || "");
  const [weight, setWeight] = useState(userData.weight || "");
  const [weightUnit, setWeightUnit] = useState(userData.weightUnit || "kg");
  const [gender, setGender] = useState(userData.gender || "");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [saved, setSaved] = useState(false);

  const canSave =
    age.trim() !== "" &&
    weight.trim() !== "" &&
    gender !== "" &&
    ((heightUnit === "cm" && heightCm.trim() !== "") ||
      (heightUnit === "ft" &&
        heightFt.trim() !== "" &&
        heightIn.trim() !== ""));

  const handleSave = () => {
    if (!canSave) return;
    let formattedHeight =
      heightUnit === "cm" ? `${heightCm} cm` : `${heightFt} ft ${heightIn} in`;

    onDataChange({
      age: age.trim(),
      weight: weight.trim(),
      weightUnit,
      gender,
      height: formattedHeight,
    });

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
          🍏 Nutrition Plan Builder
        </Typography>

        {/* Gender */}
        <Box>
          <Typography color="white" mb={1} fontWeight={600}>
            Gender
          </Typography>
          <ToggleButtonGroup
            value={gender}
            exclusive
            onChange={(_, g) => g && setGender(g)}
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              "& .MuiToggleButton-root": {
                color: "#fff",
                fontWeight: 600,
                px: 3,
                borderRadius: 3,
                "&.Mui-selected": { background: gradient },
              },
            }}
          >
            <ToggleButton value="male">Male</ToggleButton>
            <ToggleButton value="female">Female</ToggleButton>
            <ToggleButton value="other">Other</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Age */}
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
          InputProps={{
            sx: {
              color: "white",
              bgcolor: "rgba(255,255,255,0.05)",
              borderRadius: 2,
            },
          }}
        />

        {/* Weight */}
        <Stack direction="row" spacing={2}>
          <TextField
            label="Weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            fullWidth
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
            InputProps={{
              sx: {
                color: "white",
                bgcolor: "rgba(255,255,255,0.05)",
                borderRadius: 2,
              },
            }}
          />
          <FormControl sx={{ minWidth: 85 }}>
            <Select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              sx={{
                color: "white",
                bgcolor: "rgba(255,255,255,0.05)",
              }}
            >
              <MenuItem value="kg">kg</MenuItem>
              <MenuItem value="lbs">lbs</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Height */}
        <Box>
          <Typography color="white" mb={1} fontWeight={600}>
            Height
          </Typography>
          <Stack direction="row" spacing={2}>
            {heightUnit === "cm" ? (
              <TextField
                label="cm"
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
                InputProps={{
                  sx: {
                    color: "white",
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderRadius: 2,
                  },
                }}
              />
            ) : (
              <>
                <TextField
                  label="ft"
                  type="number"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
                  InputProps={{
                    sx: {
                      color: "white",
                      bgcolor: "rgba(255,255,255,0.05)",
                      borderRadius: 2,
                    },
                  }}
                />
                <TextField
                  label="in"
                  type="number"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
                  InputProps={{
                    sx: {
                      color: "white",
                      bgcolor: "rgba(255,255,255,0.05)",
                      borderRadius: 2,
                    },
                  }}
                />
              </>
            )}
            <FormControl sx={{ minWidth: 85 }}>
              <Select
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value)}
                sx={{
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.05)",
                }}
              >
                <MenuItem value="cm">cm</MenuItem>
                <MenuItem value="ft">ft</MenuItem>
              </Select>
            </FormControl>
          </Stack>
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
