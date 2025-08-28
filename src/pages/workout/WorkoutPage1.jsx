import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function WorkoutPage1({ onDataChange }) {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [saved, setSaved] = useState(false);

  const canSave = age.trim() !== "" && weight.trim() !== "";

  const handleSave = () => {
    if (!canSave) return;
    onDataChange({ age: age.trim(), weight: weight.trim(), weightUnit });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // center horizontally
        justifyContent: "center",
        minHeight: "80vh",
        gap: 3,
        color: "white",
        textAlign: "center", // center headings and text
        width: "100%", // make container full width
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        🏋️ Workout Plan Builder
      </Typography>
      <Typography variant="h6" sx={{ color: "gray.300" }}>
        Tell us about yourself
      </Typography>

      {/* Age */}
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
          First, what is your age?
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
            sx={{ flex: 1 }} // take remaining space
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
          }}
        >
          Save
        </Button>
        {saved && (
          <Typography sx={{ color: "#c8ffc8", mt: 1, textAlign: "center" }}>
            Saved!
          </Typography>
        )}
      </Box>
    </Box>
  );
}
