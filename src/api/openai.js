import axios from "axios";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const getWorkoutPlan = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "Sorry, something went wrong connecting to the fitness AI.";
  }
};
