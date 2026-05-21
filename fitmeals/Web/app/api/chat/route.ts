import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pool } from "pg";
import { NextRequest, NextResponse } from "next/server";

import { isLoggedIn } from "@/src/middleware/isLogged";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API!);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

async function generateWithFallback(prompt: string): Promise<string> {
  const modelsToTry = [
    "gemini-2.5-flash", // Best balance of speed and high intelligence
    "gemini-2.0-flash", // Extremely stable and fast fallback
    "gemini-1.5-flash", // Ultimate safety net
  ];

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
      });

      const result: any = await Promise.race([
        model.generateContent(prompt),

        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 5000),
        ),
      ]);

      return result.response.text();
    } catch (err: any) {
      // Allow fallback on rate limits, server errors, AND timeouts/missing models
      const isRetryable =
        err.message?.includes("503") || 
        err.message?.includes("429") || 
        err.message?.includes("Timeout") ||
        err.message?.includes("400") || 
        err.message?.includes("404");

      if (isRetryable && modelName !== modelsToTry.at(-1)) {
        continue;
      }

      throw err;
    }
  }

  return "AI is currently unavailable.";
}

function calculateNutritionScore(food: any) {
  const proteinScore = Math.min(food.protein * 4, 100);

  const carbScore = 100 - Math.min(food.carbohydrate, 100);

  const fatScore = 100 - Math.min(food.fat * 4, 100);

  const saltScore = 100 - Math.min(food.salt * 40, 100);

  return Math.round((proteinScore + carbScore + fatScore + saltScore) / 4);
}

export const POST = isLoggedIn(async (req: NextRequest) => {
  try {
    const body = await req.json();

    const message = body?.message;

    const locale = body?.locale || "en";

    if (!message) {
      return NextResponse.json(
        {
          error: "Message is required",
        },
        {
          status: 400,
        },
      );
    }

    const cleanMessage = message.toLowerCase().trim();

    const nutrientKeywords = [
      "protein",
      "calories",
      "carbs",
      "fat",
      "salt",
      "macros",
      "nutrition",
      "nutrients",
      "eiweiß",
      "protein",
      "kalorien",
      "kohlenhydrate",
      "fett",
      "salz",
      "makros",
      "nährwerte",
      "nährstoffe",
    ];

    const result = await pool.query(
      `
            SELECT
              foodname,
              energy,
              protein,
              carbohydrate,
              fat,
              salt,
              similarity(foodname, $1) AS score
            FROM german_foods
            WHERE similarity(foodname, $1) > 0.35
            ORDER BY score DESC
            LIMIT 1
            `,
      [cleanMessage],
    );

    const foods = result.rows;

    const isNutrientCard =
      nutrientKeywords.some((keyword) => cleanMessage.includes(keyword)) &&
      foods.length > 0;

    const simplifiedFoods = foods.map((food) => ({
      name: food.foodname,
      calories: food.energy,
      protein: food.protein,
      carbs: food.carbohydrate,
      fat: food.fat,
      salt: food.salt,
    }));

    const foodData =
      foods.length > 0
        ? {
            name: foods[0].foodname,
            calories: foods[0].energy,
            protein: foods[0].protein,
            carbs: foods[0].carbohydrate,
            fat: foods[0].fat,
            salt: foods[0].salt,
            overallScore: calculateNutritionScore(foods[0]),
          }
        : null;

    let prompt = "";

    if (isNutrientCard && foodData) {
      prompt = `
You are FitMeals AI created by Manvith.

Respond ONLY in ${locale === "en" ? "English" : "German"}.

Analyze this food professionally.

Food Data:
${JSON.stringify(foodData)}

User Question:
${message}
Rules:
- Never introduce yourself unless explicitly asked
- Start directly with the answer
- Keep response concise
- Avoid markdown titles
`;
    } else if (foods.length > 0) {
      prompt = `
You are FitMeals AI created by Manvith.

Respond ONLY in ${locale === "en" ? "English" : "German"}.

Use ONLY the provided food database results.

User Question:
${message}

Food Database Results:
${JSON.stringify(simplifiedFoods)}

Rules:
- Never introduce yourself unless explicitly asked
- Start directly with the answer
- Keep response concise
- Avoid markdown titles
`;
    } else {
      prompt = `
You are FitMeals AI created by Manvith.

Respond ONLY in ${locale === "en" ? "English" : "German"}.

You are a professional nutrition and fitness assistant.

User Question:
${message}

Rules:
- Never introduce yourself unless explicitly asked
- Start directly with the answer
- Keep response concise
- Avoid markdown titles
`;
    }
    let reply = "";

    if (isNutrientCard && foodData) {
      reply =
        locale === "en"
          ? `${foodData.name} contains ${foodData.calories} kcal, ${foodData.protein}g protein, ${foodData.carbs}g carbs and ${foodData.fat}g fat. Overall nutrition score: ${foodData.overallScore}/100.`
          : `${foodData.name} enthält ${foodData.calories} kcal, ${foodData.protein}g Protein, ${foodData.carbs}g Kohlenhydrate und ${foodData.fat}g Fett. Gesamtbewertung: ${foodData.overallScore}/100.`;
    } else {
      reply = await generateWithFallback(prompt);
    }

    return NextResponse.json({
      reply,

      foods: simplifiedFoods,

      isNutrientCard,

      foodData,
    });
  } catch (error: any) {
    if (error.message?.includes("503") || error.message?.includes("429")) {
      return NextResponse.json(
        {
          error: "AI is currently busy. Please try again shortly.",
        },
        {
          status: 503,
        },
      );
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",

        details: String(error),
      },
      {
        status: 500,
      },
    );
  }
});
