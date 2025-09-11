import React, { useState } from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
  Stack,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";

const gradient = "linear-gradient(135deg, #00c853 0%, #2196f3 100%)";
const bgGradient =
  "radial-gradient(circle at 70% 20%, #1a2334 0%, #101725 100%)";

export default function WorkoutPage2({ userData, onDataChange, onNextPage }) {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("");
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [saved, setSaved] = useState(false);
  const [other, setOther] = useState("");

  const handleOtherChange = (e) => {
    setOther(e.target.value);
    onDataChange({ other: e.target.value });
  };

  const equipmentOptions = [
    "Dumbbells",
    "Bodyweight",
    "Machines",
    "Resistance Bands",
    "Barbell",
    "Kettlebell",
    "Other",
  ];

  const handleDaysChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) {
      setWorkoutsPerWeek("");
    } else {
      const num = Number(value);
      if (num < 1) setWorkoutsPerWeek("1");
      else if (num > 7) setWorkoutsPerWeek("7");
      else setWorkoutsPerWeek(value);
    }
  };

  const canSave =
    goal &&
    level &&
    equipment.length > 0 &&
    workoutsPerWeek &&
    Number(workoutsPerWeek) >= 1 &&
    Number(workoutsPerWeek) <= 7;

  const handleEquipmentToggle = (value) => {
    if (equipment.includes(value)) {
      setEquipment(equipment.filter((x) => x !== value));
    } else {
      setEquipment([...equipment, value]);
    }
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

  const fitnessLevels = [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Professional",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        bgcolor: bgGradient,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        py: 5,
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
          px: { xs: 2, sm: 4, md: 5 },
          py: { xs: 3, sm: 5 },
          borderRadius: 4,
          bgcolor: "rgba(28,34,49,0.98)",
          boxShadow: "0 8px 32px 0 rgba(33,150,243,0.12)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
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
            <Box component="span" sx={{ mr: 1, fontSize: "1.5em" }}>
              🎯
            </Box>
            <Box
              component="span"
              sx={{
                background: gradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Set Your Training Goals
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
            Let’s personalize your plan!
          </Typography>
        </Stack>

        {/* Goal selection */}
        <Box width="100%">
          <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
            What is your main goal?
          </Typography>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "rgba(255,255,255,0.8)" }}>
              Goal
            </InputLabel>
            <Select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              label="Goal"
              sx={{
                color: "white",
                ".MuiOutlinedInput-notchedOutline": { borderColor: "#2196f3" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00c853",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#1a2331",
                    color: "#fff",
                  },
                },
              }}
            >
              <MenuItem value="Gain strength">Gain strength</MenuItem>
              <MenuItem value="Build muscle mass">Build muscle mass</MenuItem>
              <MenuItem value="Lose weight">Lose weight</MenuItem>
              <MenuItem value="Just to feel good">Just to feel good</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Level selection (unified) */}
        <Box width="100%">
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
              display: "flex",
              width: "100%",
              boxShadow: "0 1px 8px rgba(0,0,0,0.12)",
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            {fitnessLevels.map((lvl, i) => {
              // Elliptical rounding only on the left of "Beginner" and right of "Professional"
              const isFirst = i === 0;
              const isLast = i === fitnessLevels.length - 1;

              return (
                <ToggleButton
                  key={lvl}
                  value={lvl}
                  sx={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "white",
                    px: 1.5,
                    py: 1.1,
                    minWidth: 0,
                    borderRadius: 0,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    borderTopLeftRadius: isFirst ? "9999px" : 0,
                    borderBottomLeftRadius: isFirst ? "9999px" : 0,
                    borderTopRightRadius: isLast ? "9999px" : 0,
                    borderBottomRightRadius: isLast ? "9999px" : 0,
                    "&.Mui-selected": {
                      background: gradient,
                      color: "#fff",
                      boxShadow: "0 4px 14px 0 rgba(0,200,83,0.14)",
                    },
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #00e676 0%, #2196f3 100%)",
                      color: "#fff",
                      boxShadow: "0 4px 12px 0 rgba(33,150,243,.11)",
                    },
                    "&:not(:last-child)": {
                      borderRight: "1px solid rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  {lvl}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Box>

        {/* Days per week */}
        <Box width="100%">
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
              style: { color: "#fff" },
            }}
            value={workoutsPerWeek}
            onChange={handleDaysChange}
            fullWidth
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.78)" } }}
            InputProps={{ sx: { color: "white" } }}
            helperText="Enter a number from 1 to 7"
            FormHelperTextProps={{ sx: { color: "#fff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                bgcolor: "rgba(255,255,255,0.04)",
                borderRadius: 2,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2196f3",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00c853",
              },
            }}
          />
        </Box>

        {/* Equipment selection */}
        <Box width="100%">
          <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
            What equipment do you want to use?
          </Typography>
          <Grid
            container
            spacing={1}
            justifyContent="center"
            sx={{
              bgcolor: "rgba(255,255,255,0.07)",
              borderRadius: 2,
              py: 1,
              px: { xs: 0.5, sm: 1 },
            }}
          >
            {equipmentOptions.map((eq) => (
              <Grid
                item
                xs={6}
                sm={4}
                md={4}
                key={eq}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ToggleButton
                  value={eq}
                  selected={equipment.includes(eq)}
                  onChange={() => handleEquipmentToggle(eq)}
                  sx={{
                    width: "100%",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 600,
                    borderRadius: 2,
                    fontSize: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 1.5,
                    py: 1,
                    background: equipment.includes(eq)
                      ? "linear-gradient(135deg, #00c853 0%, #2196f3 100%)"
                      : "rgba(255,255,255,0.08)",
                    boxShadow: equipment.includes(eq)
                      ? "0 3px 10px 0 rgba(0,200,83,0.13)"
                      : "none",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #00e676 0%, #2196f3 100%)",
                      color: "#fff",
                    },
                  }}
                >
                  {eq}
                </ToggleButton>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Other info */}
        <Box width="100%">
          <Typography sx={{ color: "white", fontWeight: 600, mb: 1 }}>
            Other things we should know (optional)
          </Typography>
          <TextField
            label="Injuries, preferences, special requests..."
            variant="outlined"
            multiline
            rows={3}
            value={other}
            onChange={handleOtherChange}
            fullWidth
            InputLabelProps={{ sx: { color: "rgba(255,255,255,0.80)" } }}
            InputProps={{
              sx: {
                color: "white",
                bgcolor: "rgba(255,255,255,0.03)",
                borderRadius: 2,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#2196f3",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00c853",
              },
            }}
          />
        </Box>

        {/* Save button */}
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt={1}
        >
          <Button
            component={motion.button}
            whileHover={{ scale: 1.045, boxShadow: "0 0 0 1.5px #00c853" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={!canSave}
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 3,
              py: 1.3,
              fontWeight: 700,
              textTransform: "none",
              fontSize: 18,
              mt: 0.5,
              background: gradient,
              boxShadow: "0 2px 18px 0 rgba(33,150,243,0.13)",
              alignSelf: "center",
              transition: "all 0.18s",
            }}
          >
            Save
          </Button>
          {saved && (
            <Typography
              component={motion.div}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              sx={{ color: "#afffaf", mt: 1, textAlign: "center" }}
            >
              ✅ Saved!
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
