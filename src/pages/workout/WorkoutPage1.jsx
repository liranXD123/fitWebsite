import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function WorkoutPage1({ onDataChange }) {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [gender, setGender] = useState("");
  const [saved, setSaved] = useState(false);
  const [heightUnit, setHeightUnit] = useState("cm");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  const canSave = age.trim() !== "" && weight.trim() !== "" && gender !== "";

  const handleSave = () => {
    if (!canSave) return;

    let height;
    if (heightUnit === "cm") {
      height = `${heightCm} cm`;
    } else {
      height = `${heightFt} ft ${heightIn} in`;
    }

    onDataChange({
      age: age.trim(),
      weight: weight.trim(),
      weightUnit,
      gender,
      height,
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleGenderChange = (_, newGender) => {
    if (newGender !== null) setGender(newGender);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "85vh",
        gap: 3,
        color: "white",
        textAlign: "center",
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
        }}
      >
        🏋️ Workout Plan Builder
      </Typography>

      <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)" }}>
        Answer these few questions to build your optimal plan!
      </Typography>

      {/* Gender Selection */}
      <Typography sx={{ color: "white", fontWeight: 600 }}>
        First, how do you identify yourself?
      </Typography>
      <ToggleButtonGroup
        value={gender}
        exclusive
        onChange={handleGenderChange}
        sx={{
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <ToggleButton
          value="male"
          sx={{
            color: "white",
            "&.Mui-selected": {
              background: "linear-gradient(135deg,#00c853,#2196f3)",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "rgba(0,200,83,0.2)",
            },
          }}
        >
          Male
        </ToggleButton>
        <ToggleButton
          value="female"
          sx={{
            color: "white",
            "&.Mui-selected": {
              background: "linear-gradient(135deg,#00c853,#2196f3)",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "rgba(33,150,243,0.2)",
            },
          }}
        >
          Female
        </ToggleButton>
        <ToggleButton
          value="other"
          sx={{
            color: "white",
            "&.Mui-selected": {
              background: "linear-gradient(135deg,#00c853,#2196f3)",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          Other
        </ToggleButton>
      </ToggleButtonGroup>

      {/* Age */}
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
          And now, what is your age?
        </Typography>
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
          InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
          InputProps={{ sx: { color: "white" } }}
        />
      </Box>

      {/* Weight */}
      <Box sx={{ width: "100%", maxWidth: 420 }}>
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
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
            InputProps={{ sx: { color: "white" } }}
            sx={{ flex: 1 }}
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
              sx={{ color: "white" }}
            >
              <MenuItem value="kg">kg</MenuItem>
              <MenuItem value="lbs">lbs</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Height */}
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
          Your height
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
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
              sx={{ color: "white" }}
            >
              <MenuItem value="cm">cm</MenuItem>
              <MenuItem value="ft">ft</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {heightUnit === "cm" ? (
          <TextField
            label="Height (cm)"
            variant="outlined"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            type="number"
            fullWidth
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
            InputProps={{ sx: { color: "white" } }}
          />
        ) : (
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Feet"
              variant="outlined"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              type="number"
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
              InputProps={{ sx: { color: "white" } }}
            />
            <TextField
              label="Inches"
              variant="outlined"
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              type="number"
              InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
              InputProps={{ sx: { color: "white" } }}
            />
          </Box>
        )}
      </Box>

      {/* Save button */}
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Button
          onClick={handleSave}
          disabled={!canSave}
          variant="contained"
          fullWidth
          sx={{
            borderRadius: "12px",
            py: 1.2,
            fontWeight: 700,
            textTransform: "none",
            background: "linear-gradient(135deg,#00c853 0%, #2196f3 100%)",
            "&:hover": {
              background: "linear-gradient(135deg,#00e676 0%, #42a5f5 100%)",
            },
          }}
        >
          Save
        </Button>
        {saved && (
          <Typography sx={{ color: "#c8ffc8", mt: 1, textAlign: "center" }}>
            ✅ Saved!
          </Typography>
        )}
      </Box>
    </Box>
  );
}
