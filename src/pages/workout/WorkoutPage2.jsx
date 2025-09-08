import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function WorkoutPage2({ userData, onDataChange, onNextPage }) {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [saved, setSaved] = useState(false);

  const equipmentOptions = [
    "Dumbbells",
    "Bodyweight",
    "Machines",
    "Resistance Bands",
    "Barbell",
    "Kettlebell",
    "Other",
  ];

  // Only digits, 1-7 constraint
  const handleDaysChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only digits
    // If empty, keep empty
    if (!value) {
      setWorkoutsPerWeek("");
    } else {
      const num = Number(value);
      // Between 1 and 7 only
      if (num < 1) setWorkoutsPerWeek("1");
      else if (num > 7) setWorkoutsPerWeek("7");
      else setWorkoutsPerWeek(value);
    }
  };

  // Validates all fields, including days range
  const canSave =
    goal &&
    level &&
    equipment.length > 0 &&
    workoutsPerWeek &&
    Number(workoutsPerWeek) >= 1 &&
    Number(workoutsPerWeek) <= 7;

  const handleEquipmentToggle = (event, newEquipments) => {
    setEquipment(newEquipments);
  };

  const handleSave = () => {
    if (!canSave) return;

    const newData = {
      ...userData,
      goal,
      level,
      workoutsPerWeek,
      equipment,
    };

    onDataChange(newData);

    setSaved(true);
    setTimeout(() => setSaved(false), 1000);
    onNextPage();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 64px)", // Adjust for navbar
        color: "white",
        textAlign: "center",
        width: "100%",
        px: 2,
        gap: 3,
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
        🎯 Set Your Training Goals
      </Typography>

      <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)" }}>
        Let’s personalize your plan!
      </Typography>

      {/* Goal selection */}
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
          What is your main goal?
        </Typography>
        <FormControl fullWidth>
          <InputLabel sx={{ color: "rgba(255,255,255,0.8)" }}>Goal</InputLabel>
          <Select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            label="Goal"
            sx={{ color: "white" }}
          >
            <MenuItem value="Gain strength">Gain strength</MenuItem>
            <MenuItem value="Build muscle mass">Build muscle mass</MenuItem>
            <MenuItem value="Lose weight">Lose weight</MenuItem>
            <MenuItem value="Just to feel good">Just to feel good</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Level selection */}
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
          Your current fitness level
        </Typography>
        <ToggleButtonGroup
          value={level}
          exclusive
          onChange={(_, newLevel) => {
            if (newLevel) setLevel(newLevel);
          }}
          sx={{
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <ToggleButton
            value="Beginner"
            sx={{
              color: "white",
              "&.Mui-selected": {
                background: "linear-gradient(135deg,#00c853,#2196f3)",
                color: "white",
              },
            }}
          >
            Beginner
          </ToggleButton>
          <ToggleButton
            value="Intermediate"
            sx={{
              color: "white",
              "&.Mui-selected": {
                background: "linear-gradient(135deg,#00c853,#2196f3)",
                color: "white",
              },
            }}
          >
            Intermediate
          </ToggleButton>
          <ToggleButton
            value="Advanced"
            sx={{
              color: "white",
              "&.Mui-selected": {
                background: "linear-gradient(135deg,#00c853,#2196f3)",
                color: "white",
              },
            }}
          >
            Advanced
          </ToggleButton>
          <ToggleButton
            value="Professional"
            sx={{
              color: "white",
              "&.Mui-selected": {
                background: "linear-gradient(135deg,#00c853,#2196f3)",
                color: "white",
              },
            }}
          >
            Professional
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Days per week */}
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
          How many days do you want to work out per week?
        </Typography>
        <TextField
          label="Workout days per week"
          variant="outlined"
          type="number"
          inputProps={{
            inputMode: "numeric",
            pattern: "[1-7]*",
            min: 1,
            max: 7,
          }}
          value={workoutsPerWeek}
          onChange={handleDaysChange}
          fullWidth
          InputLabelProps={{ sx: { color: "rgba(255,255,255,0.8)" } }}
          InputProps={{ sx: { color: "white" } }}
          helperText="Enter a number from 1 to 7"
        />
      </Box>

      {/* Equipment selection */}
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
          What equipment do you want to use?
        </Typography>
        <ToggleButtonGroup
          value={equipment}
          onChange={handleEquipmentToggle}
          aria-label="equipment"
          sx={{
            backgroundColor: "rgba(255,255,255,0.07)",
            borderRadius: "10px",
            flexWrap: "wrap",
            gap: 1,
            p: 0.5,
          }}
          multiple
        >
          {equipmentOptions.map((eq) => (
            <ToggleButton
              key={eq}
              value={eq}
              sx={{
                color: "white",
                "&.Mui-selected": {
                  background: "linear-gradient(135deg,#00c853,#2196f3)",
                  color: "white",
                },
                m: 0.5,
              }}
            >
              {eq}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
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
            ✅ Saved!
          </Typography>
        )}
      </Box>
    </Box>
  );
}
