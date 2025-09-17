import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress, Stack } from "@mui/material";
import { motion } from "framer-motion";

const AIML_API_URL = "https://api.aimlapi.com/v1/chat/completions";
const AIML_API_KEY = "4a94ad7ec49e4c11a92aa823f4996d2b"; // replace with your real key

// Prompt builder for nutrition
function buildNutritionPrompt(userData) {
  return `
You are a world-class certified nutritionist and diet planner.
Given the following client's profile, create a detailed, professional, and practical nutrition program.
Include daily meal breakdowns (breakfast, lunch, dinner, snacks), portion sizes, macronutrient balance, hydration tips.
Keep it realistic, affordable, and motivating. Respect any dietary restrictions.

Client Profile:
- Age: ${userData.age}
- Gender: ${userData.gender}
- Height: ${userData.height}
- Weight: ${userData.weight} ${userData.weightUnit || ""}
- Goal: ${userData.goal}
- Activity level: ${userData.activityLevel}
- Meals per day: ${userData.meals}
- Nutrition type: ${userData.nutritionType}
- Budget: ${userData.budget}
- Allergies/Notes: ${userData.notes || "None"}
`;
}

async function fetchPlan(prompt) {
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
          { role: "system", content: "You are a helpful expert assistant." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("AIMLAPI error:", err);
      throw new Error("API error");
    }

    const data = await res.json();
    return data.choices[0].message.content || "No response.";
  } catch (err) {
    console.error("Fetch error:", err);
    return "❌ Sorry, something went wrong while generating your nutrition plan.";
  }
}

export default function NutritionView({ userData }) {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData) return;
    const prompt = buildNutritionPrompt(userData);

    fetchPlan(prompt).then((content) => {
      setPlan(content);
      setLoading(false);
    });
  }, [userData]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "radial-gradient(circle at 70% 20%, #1a2334 0%, #101725 100%)",
        p: 2,
      }}
    >
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          maxWidth: 780,
          width: "100%",
          p: { xs: 3, sm: 5 },
          borderRadius: 5,
          bgcolor: "rgba(28,34,49,0.97)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.45)",
          color: "white",
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            fontWeight={800}
            textAlign="center"
            sx={{
              background: "linear-gradient(90deg, #00c853 10%, #2196f3 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            🥗 Your Personalized Nutrition Plan
          </Typography>

          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight={200}
              flexDirection="column"
              gap={2}
            >
              <CircularProgress color="success" size={56} thickness={5} />
              <Typography variant="body1" sx={{ color: "#aaa" }}>
                Building your nutrition plan...
              </Typography>
            </Box>
          ) : (
            <Typography
              sx={{
                whiteSpace: "pre-line",
                fontSize: 16,
                lineHeight: 1.6,
              }}
            >
              {plan}
            </Typography>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
