import pandas as pd
import pickle
import os

from sklearn.neighbors import NearestNeighbors

BASE_DIR = os.path.dirname(__file__)

scaler_path = os.path.join(
    BASE_DIR,
    "scaler.pkl"
)

scaler = pickle.load(
    open(scaler_path, "rb")
)

foods_path = os.path.join(
    BASE_DIR,
    "clean_foods.csv"
)

df = pd.read_csv(foods_path)


def calculate_score(
    row,
    preferences,
    deficit,
    user
):

    score = 0

    goal = user["goal"]

    activity = user["activity"]

    weight = user["weight"]

    height = user["height"]

    bmi = weight / ((height / 100) ** 2)

    macro_balance = (
        row["protein"] * 2.5 +
        row["carbs"] * 0.7 -
        row["fat"] * 3
    )

    score += macro_balance

    protein_density = (
        row["protein"] /
        (row["calories"] + 1)
    )

    protein_match = (
        row["protein"] /
        (deficit["protein"] + 1)
    )

    carb_match = (
        row["carbs"] /
        (deficit["carbs"] + 1)
    )

    fat_match = (
        row["fat"] /
        (deficit["fat"] + 1)
    )

    if preferences.get("high_protein"):
        score += protein_density * 100
        score += protein_match * 40

    if preferences.get("low_fat"):
        score -= fat_match * 20

    if preferences.get("low_calories"):
        score -= row["calories"] * 0.02

    if preferences.get("high_carbs"):
        score += carb_match * 30

    if goal == "loss":
        score -= row["calories"] * 0.03
        score -= row["fat"] * 0.5

    if goal == "gain":
        score += row["protein"] * 0.5
        score += row["calories"] * 0.02

    if activity == "high":
        score += row["carbs"] * 0.2

    if activity == "low":
        score -= row["carbs"] * 0.1

    if bmi > 25:
        score -= row["fat"] * 0.3

    if bmi < 18:
        score += row["calories"] * 0.03

    if row["fat"] > 25:
        score -= 60

    if row["fat"] > 40:
        score -= 120

    if row["calories"] > 500:
        score -= 45

    if row["calories"] > 650:
        score -= 80

    if row["protein"] == 0 and row["carbs"] == 0:
        score -= 100

    return round(score, 2)


def recommend_food(data):

    try:

        user = data["user"]

        target = data["target"]

        logged = data["logged"]

        preferences = data["preferences"]

        low_salt = preferences.get(
            "low_salt",
            False
        )

        deficit = {
            "calories": max(
                0,
                target["calories"] - logged["calories"]
            ),

            "protein": max(
                0,
                target["protein"] - logged["protein"]
            ),

            "carbs": max(
                0,
                target["carbs"] - logged["carbs"]
            ),

            "fat": max(
                0,
                target["fat"] - logged["fat"]
            ),
        }

        temp_df = df.copy()

        bad_words = [
            "öl",
            "oil",
            "zucker",
            "sugar",
            "sirup",
            "syrup",
            "maltose",
            "gelatine",
            "isolat",
            "puderzucker",
            "fett",
            "palmöl",
            "speiseöl",
            "lecithin",
            "stärke",
            "mehl",
            "pulver",
            "konzentrat",
            "gluten",
            "getrocknet",
            "fertigmischung",
            "stockfisch"
        ]

        pattern = "|".join(bad_words)

        temp_df = temp_df[
            ~temp_df["foodname"].str.contains(
                pattern,
                case=False,
                na=False
            )
        ]

        temp_df = temp_df[
            (
                (temp_df["protein"] >= 3) |
                (temp_df["carbs"] >= 5)
            )
        ]

        if low_salt:
            temp_df = temp_df[
                temp_df["salt"] < 0.3
            ]

        if preferences.get("high_protein"):
            temp_df = temp_df[
                temp_df["protein"] >= 15
            ]

        if preferences.get("low_fat"):
            temp_df = temp_df[
                temp_df["fat"] <= 5
            ]

        if preferences.get("low_calories"):
            temp_df = temp_df[
                temp_df["calories"] <= 100
            ]

        if preferences.get("high_carbs"):
            temp_df = temp_df[
                temp_df["carbs"] >= 40
            ]

        if temp_df.empty:
            return {
                "error": "No foods available after filtering"
            }

        if len(temp_df) < 5:
            return {
                "error": "Too few foods match preferences"
            }

        temp_df = temp_df.reset_index(drop=True)

        temp_df["score"] = temp_df.apply(
            lambda row: calculate_score(
                row,
                preferences,
                deficit,
                user
            ),
            axis=1
        )

        features = temp_df[
            [
                "calories",
                "protein",
                "carbs",
                "fat"
            ]
        ]

        X_scaled = scaler.transform(features)

        deficit_scaled = scaler.transform(
            pd.DataFrame([deficit])
        )

        neighbor_count = min(
            25,
            len(temp_df)
        )

        temp_model = NearestNeighbors(
            n_neighbors=neighbor_count
        )

        temp_model.fit(X_scaled)

        distances, indices = temp_model.kneighbors(
            deficit_scaled
        )

        results = temp_df.iloc[
            indices[0]
        ].copy()

        results["distance"] = distances[0]

        results["final_score"] = (
            results["score"] * 1.5
            - results["distance"] * 5
        )

        results = results.sort_values(
            by="final_score",
            ascending=False
        ).head(9)

        if results.empty:
            return {
                "error": "No recommendations found"
            }

        min_score = results["final_score"].min()

        max_score = results["final_score"].max()

        if max_score == min_score:

            results["match_percent"] = 100

        else:

            results["match_percent"] = (
                (
                    (
                        results["final_score"] - min_score
                    ) /
                    (
                        max_score - min_score
                    )
                ) * 100
            ).round(0).astype(int)

        return results[
            [
                "foodname",
                "calories",
                "protein",
                "fat",
                "carbs",
                "match_percent"
            ]
        ].to_dict(orient="records")

    except Exception as e:

        return {
            "error": str(e)
        }