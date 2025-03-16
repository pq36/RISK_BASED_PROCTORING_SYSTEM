import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model

# Load model with custom initializer (if needed)
model = load_model("risk_lstm_model.keras")

# Load scaler and feature names
scaler_data = pickle.load(open("scaler.pkl", "rb"))
scaler = scaler_data["scaler"]
FEATURE_NAMES = scaler_data["feature_names"]

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    try:
        # Replace missing values with 0
        for key in data:
            if data[key] is None:
                data[key] = 0

        # Convert input to DataFrame with correct column order
        df_input = pd.DataFrame([data], columns=FEATURE_NAMES)

        # Scale input features
        X_scaled = scaler.transform(df_input)

        # Reshape for LSTM (1 sample, 1 timestep, features)
        X_lstm = X_scaled.reshape(1, 1, -1)

        # Predict risk score
        predicted_array = model.predict(X_lstm)
        predicted_value = predicted_array[0][0]  # Extract scalar

        # Normalize risk score (adjust scaling as needed)
        risk_score = float(max(0, min(100, round(predicted_value*10, 2))))

        return jsonify({
            "risk_score": risk_score,
            "flagged": risk_score >= 50  # Example threshold for flagging
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=7000)
