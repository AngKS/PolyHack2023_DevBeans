from flask import Flask, request, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import openai
from dotenv import load_dotenv
import os
import json

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

# Load the model
MODEL_NAME = 'unitary/unbiased-toxic-roberta' # change this to your model
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

def get_suggestions(sentence):
    response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=[
            {"role": "system", "content": 'rewrite me a json, that has three sentence suggestions to make the following sentence none toxic, but convey the same emotion, in the format: {"suggestions": [ <rewritten sentence>, <rewritten sentence> ]} '},
            {"role": "user", "content": sentence},
        ]
    )

    suggestions_json = response['choices'][0]['message']['content']
    suggestions_list = json.loads(str(suggestions_json))['suggestions']

    return suggestions_list


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        data = request.get_json()
        text = data.get('text')
        
        # Ensure that a text was provided
        if not text:
            return jsonify({'error': 'no text provided'}), 400

        inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True)
        outputs = model(**inputs)

        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)

        # Apply threshold
        threshold = 0.5
        predictions = (probabilities > threshold).int()

        # Get labels
        predicted_labels = [model.config.id2label[i] for i, predicted in enumerate(predictions[0]) if predicted == 1]

        suggestions = []

        if len(predicted_labels) > 0:
            suggestions = get_suggestions(text)

        # Convert the prediction to a JSON response
        response = {
            'isSafe': 'false' if len(predicted_labels) > 0 else 'true',
            'unSafeReasons': predicted_labels,
            'suggestions': suggestions
            }

        
        return jsonify(response)
    
@app.route('/classify', methods=['POST'])
def classify():
    if request.method == 'POST':
        data = request.get_json()
        text = data.get('text')
        
        # Ensure that a text was provided
        if not text:
            return jsonify({'error': 'no text provided'}), 400

        inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True)
        outputs = model(**inputs)

        probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)

        # Apply threshold
        threshold = 0.5
        predictions = (probabilities > threshold).int()

        # Get labels
        predicted_labels = [model.config.id2label[i] for i, predicted in enumerate(predictions[0]) if predicted == 1]

        # Convert the prediction to a JSON response
        response = {
            'labels': predicted_labels
        }

        
        return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # listens on port 5000