from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api", methods=["GET"])
def message():
    # req = request.get_json()
    # data = req['data']
    return jsonify({'message': 'Hello World!'})
