import React, { useState } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

const gradient = "linear-gradient(135deg, #00c853 0%, #2196f3 100%)";
const bgGradient =
  "radial-gradient(circle at 70% 20%, #1a2334 0%, #101725 100%)";

export default function WorkoutPage1({ onDataChange, onNextPage }) {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [gender, setGender] = useState("");
  const [saved, setSaved] = useState(false);

  const [heightUnit, setHeightUnit] = useState("cm");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

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

    let formattedHeight;
    if (heightUnit === "cm") {
      formattedHeight = `${heightCm} cm`;
    } else {
      formattedHeight = `${heightFt} ft ${heightIn} in`;
    }

    onDataChange({
      age: age.trim(),
      weight: weight.trim(),
      weightUnit,
      gender,
      height: formattedHeight,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 1000);

    onNextPage();
  };

  const handleGenderChange = (_, newGender) => {
    if (newGender !== null) setGender(newGender);
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
        boxSizing: "border-box",
        py: 6,
        px: 2,
      }}
    >
      <Paper
        component={motion.div}
        elevation={7}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, type: "spring" }}
        sx={{
          width: "100%",
          maxWidth: 520,
          py: { xs: 3, sm: 5 },
          px: { xs: 3, sm: 5 },
          borderRadius: 5,
          bgcolor: "rgba(28,34,49,0.97)",
          boxShadow: "0 8px 30px rgba(0, 200, 83, 0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Stack width="100%" alignItems="center" spacing={1}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              letterSpacing: 1.2,
            }}
          >
            <Box component="span" sx={{ mr: 1, fontSize: "1.6em" }}>
              🏋️
            </Box>
            <Box
              component="span"
              sx={{
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Workout Plan Builder
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255,255,255,0.82)",
              fontWeight: 400,
              letterSpacing: 0.3,
              textAlign: "center",
            }}
          >
            Answer these few questions to build your optimal plan!
          </Typography>
        </Stack>

        {/* Gender Selection */}
        <Box width="100%">
          <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
            First, how do you identify yourself?
          </Typography>
          <ToggleButtonGroup
            value={gender}
            exclusive
            onChange={handleGenderChange}
            sx={{
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 1.5px 9px 0 rgba(33,150,243,0.13)",
              p: 0.5,
              gap: 1,
              width: "100%",
              justifyContent: "center",
            }}
          >
            {[
              { value: "male", label: "Male", bg: "rgba(0,200,83,0.2)" },
              { value: "female", label: "Female", bg: "rgba(33,150,243,0.2)" },
              { value: "other", label: "Other", bg: "rgba(255,255,255,0.2)" },
            ].map(({ value, label, bg }) => (
              <ToggleButton
                key={value}
                value={value}
                sx={{
                  color: "white",
                  fontWeight: 600,
                  px: 4,
                  fontSize: 15,
                  borderRadius: 3,
                  transition: "all 0.15s",
                  "&.Mui-selected": {
                    background: gradient,
                    color: "#fff",
                    boxShadow: "0 6px 20px 0 rgba(0,200,83,0.18)",
                  },
                  "&:hover": {
                    backgroundColor: bg,
                    color: "#fff",
                  },
                }}
              >
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Age */}
        <Box width="100%" maxWidth={420}>
          <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
            And now, what is your age?
          </Typography>
          <TextField
            label="Age"
            variant="outlined"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
              min: 0,
              style: { color: "#fff" },
            }}
            fullWidth
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
            InputProps={{
              sx: {
                color: "white",
                bgcolor: "rgba(255,255,255,0.04)",
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2196f3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00c853",
                },
              },
            }}
          />
        </Box>

        {/* Weight */}
        <Box width="100%" maxWidth={420}>
          <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
            Your weight
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <TextField
              label="Weight"
              variant="outlined"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              type="number"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                min: 0,
                style: { color: "#fff" },
              }}
              sx={{
                flex: 1,
                bgcolor: "rgba(255,255,255,0.04)",
                borderRadius: 2,
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#2196f3",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00c853",
                },
              }}
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
              InputProps={{ sx: { color: "white" } }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel
                id="weight-unit-label"
                sx={{ color: "rgba(255,255,255,0.8)" }}
              >
                Unit
              </InputLabel>
              <Select
                labelId="weight-unit-label"
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
                label="Unit"
                sx={{
                  color: "white",
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2196f3",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00c853",
                  },
                }}
              >
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="lbs">lbs</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Height */}
        <Box width="100%" maxWidth={420}>
          <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
            Your height
          </Typography>
          {heightUnit === "cm" ? (
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
              <TextField
                label="Height (cm)"
                variant="outlined"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                type="number"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 0,
                  style: { color: "#fff" },
                }}
                sx={{
                  flex: 1,
                  bgcolor: "rgba(255,255,255,0.04)",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2196f3",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00c853",
                  },
                }}
                InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
                InputProps={{ sx: { color: "white" } }}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel
                  id="height-unit-label"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Unit
                </InputLabel>
                <Select
                  labelId="height-unit-label"
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value)}
                  label="Unit"
                  sx={{
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#2196f3",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00c853",
                    },
                  }}
                >
                  <MenuItem value="cm">cm</MenuItem>
                  <MenuItem value="ft">ft</MenuItem>
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Feet"
                variant="outlined"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
                type="number"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 0,
                  style: { color: "#fff" },
                }}
                sx={{
                  flex: 1,
                  bgcolor: "rgba(255,255,255,0.04)",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2196f3",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00c853",
                  },
                }}
                InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
                InputProps={{ sx: { color: "white" } }}
              />
              <TextField
                label="Inches"
                variant="outlined"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                type="number"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  min: 0,
                  style: { color: "#fff" },
                }}
                sx={{
                  flex: 1,
                  bgcolor: "rgba(255,255,255,0.04)",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#2196f3",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#00c853",
                  },
                }}
                InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
                InputProps={{ sx: { color: "white" } }}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel
                  id="height-unit-label"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Unit
                </InputLabel>
                <Select
                  labelId="height-unit-label"
                  value={heightUnit}
                  onChange={(e) => setHeightUnit(e.target.value)}
                  label="Unit"
                  sx={{
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "#2196f3",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#00c853",
                    },
                  }}
                >
                  <MenuItem value="cm">cm</MenuItem>
                  <MenuItem value="ft">ft</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </Box>

        {/* Save */}
        <Box width="100%" maxWidth={420}>
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
              textTransform: "none",
              background: gradient,
              boxShadow: "0 6px 18px rgba(33,150,243,0.18)",
              fontSize: 17,
            }}
          >
            Save
          </Button>
          {saved && (
            <Typography
              sx={{
                color: "#afffaf",
                mt: 1,
                textAlign: "center",
                fontWeight: "600",
              }}
              component={motion.div}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              ✅ Saved!
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
