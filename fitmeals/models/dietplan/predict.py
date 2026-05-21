import os
import pickle
import pandas as pd


BASE_DIR = os.path.dirname(__file__)

with open(os.path.join(BASE_DIR, "nutrition_model.pkl"), "rb") as f:
    model = pickle.load(f)

with open(os.path.join(BASE_DIR, "encoders.pkl"), "rb") as f:
    encoders = pickle.load(f)

le_gender = encoders["gender"]
le_activity = encoders["activity"]
le_goal = encoders["goal"]


ACTIVITY_MULTIPLIERS = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "very active": 1.9
}


GOAL_MAPPING = {
    "weight loss": "lose_weight",
    "weight gain": "gain_weight",
    "muscle gain": "build_muscle"
}


GOAL_CONFIG = {
    "gain": {
        "calorie_adjustment": 300,
        "protein_ratio": 0.18,
        "fat_ratio": 0.25,
        "carb_ratio": 0.57,
        "days_per_kg": 18
    },
    "loss": {
        "calorie_adjustment": -400,
        "protein_ratio": 0.32,
        "fat_ratio": 0.30,
        "carb_ratio": 0.38,
        "days_per_kg": 12
    },
    "maintain": {
        "calorie_adjustment": 0,
        "protein_ratio": 0.25,
        "fat_ratio": 0.25,
        "carb_ratio": 0.50,
        "days_per_kg": 15
    }
}


def split_macros(calories, protein, carbs, fats):

    ratios = {
        "Breakfast": 0.25,
        "Lunch": 0.35,
        "Dinner": 0.40
    }

    return {
        meal: {
            "calories": round(calories * ratio),
            "protein": round(protein * ratio),
            "carbs": round(carbs * ratio),
            "fats": round(fats * ratio),
        }
        for meal, ratio in ratios.items()
    }


def calculate_bmr(weight, height, age, gender):

    if gender == "male":
        return (10 * weight) + (6.25 * height) - (5 * age) + 5

    return (10 * weight) + (6.25 * height) - (5 * age) - 161


def determine_goal_type(goal):

    goal = goal.lower()

    if "gain" in goal:
        return "gain"

    if "loss" in goal:
        return "loss"

    return "maintain"


def predict_nutrition(data: dict):

    gender_encoded = le_gender.transform([data["gender"]])[0]

    activity_encoded = le_activity.transform([data["activity"]])[0]

    mapped_goal = GOAL_MAPPING.get(
        data["goal"].lower(),
        data["goal"].lower()
    )

    goal_encoded = le_goal.transform([mapped_goal])[0]

    user_df = pd.DataFrame([[
        gender_encoded,
        data["weight"],
        data["height"],
        data["age"],
        activity_encoded,
        goal_encoded,
        data["target_weight"]
    ]], columns=[
        "gender",
        "weight",
        "height",
        "age",
        "activity",
        "goal",
        "target_weight"
    ])

    prediction = model.predict(user_df)

    ml_calories = float(prediction[0][0])

    weight = float(data["weight"])
    height = float(data["height"])
    age = int(data["age"])
    target_weight = float(data["target_weight"])

    gender = data["gender"].lower()
    activity = data["activity"].lower()
    goal = data["goal"].lower()

    bmr = calculate_bmr(
        weight,
        height,
        age,
        gender
    )

    maintenance_calories = (
        bmr *
        ACTIVITY_MULTIPLIERS.get(activity, 1.55)
    )

    goal_type = determine_goal_type(goal)

    config = GOAL_CONFIG[goal_type]

    formula_calories = (
        maintenance_calories +
        config["calorie_adjustment"]
    )

    calories = (
        (ml_calories * 0.25) +
        (formula_calories * 0.75)
    )

    calories = max(1200, min(calories, 4500))

    protein = (
        calories *
        config["protein_ratio"]
    ) / 4

    carbs = (
        calories *
        config["carb_ratio"]
    ) / 4

    fats = (
        calories *
        config["fat_ratio"]
    ) / 9

    protein = max(45, min(protein, 220))
    carbs = max(100, min(carbs, 450))
    fats = max(35, min(fats, 120))

    calories = round(calories)
    protein = round(protein)
    carbs = round(carbs)
    fats = round(fats)

    weight_difference = abs(
        target_weight - weight
    )

    days = round(
        weight_difference *
        config["days_per_kg"]
    )

    days = max(days, 15)

    timings = split_macros(
        calories,
        protein,
        carbs,
        fats
    )

    return {
        "days": days,
        "calories": calories,
        "protein": protein,
        "carbs": carbs,
        "fats": fats,
        "timings": timings
    }