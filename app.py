from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS  # 👈 NEW

app = Flask(__name__)
CORS(app)  # 👈 ALLOW all origins for now

classifier = pipeline("sentiment-analysis")

@app.route("/")
def home():
    return "✅ Sentiment Analysis API is running!"

@app.route("/predict-sentiment", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        text = data.get("text", "")

        if not text.strip():
            return jsonify([{"label": "NEUTRAL", "score": 0.0}])

        result = classifier(text)
        return jsonify(result)

    except Exception as e:
        print("❌ Backend Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)


