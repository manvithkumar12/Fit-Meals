from io import BytesIO
from PIL import Image
from tensorflow.keras.models import load_model
import tensorflow as tf
import numpy as np
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "Recognition.h5")

model = load_model(MODEL_PATH)

class_names = [
    'apple_pie',
    'caesar_salad',
    'cheesecake',
    'fried_rice',
    'hamburger',
    'hot_dog',
    'ice_cream',
    'nachos',
    'omelette',
    'pancakes',
    'pizza',
    'ramen',
    'spaghetti_bolognese',
    'steak',
    'sushi',
    'waffles'
]

def format_food_name(name):
    return name.replace("_", " ").title()

def recognize_food(image_bytes):
    img = Image.open(BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))

    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)

    img_array = tf.keras.applications.efficientnet.preprocess_input(
        img_array
    )

    prediction = model.predict(img_array, verbose=0)

    top3_indices = np.argsort(prediction[0])[-3:][::-1]

    predictions = []

    for idx in top3_indices:
        predictions.append({
            "food": format_food_name(class_names[idx]),
            "confidence": round(float(prediction[0][idx]) * 100, 2)
        })

    return {
        "predictions": predictions
    }