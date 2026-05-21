from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from dietplan.predict import predict_nutrition
from recommend.recommend import recommend_food
from Recognition.Recognize import recognize_food
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()
frontend_urls = os.getenv("FRONTEND_URL", "").split(",")



app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_urls,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Diet API running 🚀"}


@app.post("/predict")
def predict(data: dict):
    return predict_nutrition(data)


@app.post("/recommend")
def recommend(data: dict):
    return recommend_food(data)


@app.post("/recognize")
async def recognize(file: UploadFile = File(...)):
    image_bytes = await file.read()
    return recognize_food(image_bytes)