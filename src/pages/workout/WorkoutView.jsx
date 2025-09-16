import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress, Stack } from "@mui/material";
import { motion } from "framer-motion";

const AIML_API_URL = "https://api.aimlapi.com/v1/chat/completions";
const AIML_API_KEY = "4a94ad7ec49e4c11a92aa823f4996d2b"; // Replace with your AIMLAPI key

// Build prompt for fitness trainer AI
function buildTrainerPrompt(userData) {
  return `
You are a world-class, certified personal fitness trainer.
Given the following client's profile, create a detailed, motivational, safe, and science-based workout program for their goals.
Use clear sections, exercise names, sets/reps, rest times, weekly schedule, and short tips on form, safety, and motivation.
If "other" is filled, include this in your tailoring.

Client Profile:
- Age: ${userData.age}
- Gender: ${userData.gender}
- Height: ${userData.height}
- Weight: ${userData.weight} ${userData.weightUnit || ""}
- Goal: ${userData.goal}
- Fitness level: ${userData.level}
- Equipment available: ${userData.equipment?.join(", ") || "None"}
- Workout days per week: ${userData.workoutsPerWeek}
- Notes/Requests: ${userData.other || "None"}

Please return the program as if handing it to a real client, using lists and formatting for readability.
`;
}

// Fetch workout plan from AIMLAPI
async function getWorkoutPlan(prompt) {
  try {
    const res = await fetch(AIML_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AIML_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant who knows everything.",
          },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("AIMLAPI error response:", errData);
      throw new Error("API error");
    }

    const data = await res.json();
    return data.choices[0].message.content || "No response from AI.";
  } catch (error) {
    console.error("Error fetching workout plan:", error);
    return "Sorry, something went wrong connecting to the fitness AI.";
  }
}

export default function WorkoutView({ userData }) {
  const [program, setProgram] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userData || !userData.age) return;

    setLoading(true);
    setError("");
    const prompt = buildTrainerPrompt(userData);

    getWorkoutPlan(prompt)
      .then((content) => {
        setProgram(content);
        setLoading(false);
      })
      .catch(() => {
        setError("Sorry, failed to generate your workout plan.");
        setLoading(false);
      });
  }, [userData]);

  if (!userData) {
    return (
      <Typography
        sx={{ color: "white", textAlign: "center", mt: 8, fontSize: 20 }}
      >
        No user data found.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "radial-gradient(circle at 70% 20%, #1a2334 0%, #101725 100%)",
        px: 2,
        py: 5,
      }}
    >
      <Paper
        component={motion.div}
        elevation={9}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          maxWidth: 700,
          width: "100%",
          p: { xs: 3, sm: 5 },
          borderRadius: 6,
          bgcolor: "rgba(28,34,49,0.98)",
          boxShadow: "0 10px 48px 0 rgba(33,150,243,0.18)",
          color: "white",
          whiteSpace: "pre-line",
          fontSize: 18,
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              background: "linear-gradient(90deg, #00c853 10%, #2196f3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}
          >
            📝 Your AI-Built Workout Program
          </Typography>

          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={180}
            >
              <CircularProgress color="success" size={56} thickness={5} />
            </Box>
          ) : error ? (
            <Typography
              sx={{ color: "#ff6b6b", fontWeight: "600", textAlign: "center" }}
            >
              {error}
            </Typography>
          ) : (
            program || "No workout plan generated yet."
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
