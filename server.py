### Flask server that interfaces with firebaes

import os
import json
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin

# Initialize Flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Initialize Firestore DB
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.get('/')
def index():
    return {"message": "Hello, World!"}

@app.get('/donate')
def donate(genericName, quantity, zipCode, email):
    doc_ref = db.collection(u'donate').document()
    doc_ref.set({
        u'genericName': genericName,
        u'quantity': int(quantity),
        u'zipCode': int(zipCode),
        u'email': email,
        u'isClaimed': False,
        u'isDelivered': True
    })
    return {"message": "Success!", "id": doc_ref.id}

@app.get('/deliver')
def request(doc_id):
    doc_ref = db.collection(u'donate').document(doc_id)
    doc_ref.update({
        u'isDelivered': True
    }, merge=True)
    return {"message": "Success!"}

@app.get('/claim')
def request(doc_id):
    doc_ref = db.collection(u'donate').document(doc_id)
    doc_ref.update({
        u'isClaimed': True
    }, merge=True)
    return {"message": "Success!"}

@app.get('/get')
def get(zip_code):
    docs = db.collection(u'donate').where(u'zipCode', u'==', zip_code).where(u'isClaimed', u'==', False).where(u'isDelivered', u'==', False).stream()
    return [doc.to_dict() for doc in docs]

@app.get('/search')
def search(generic_name):
    docs = db.collection(u'donate').where(u'genericName', u'==', generic_name).where(u'isClaimed', u'==', False).where(u'isDelivered', u'==', False).stream()
    return [doc.to_dict() for doc in docs]


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)

# How it works:
# Twilio Studio Flow:
# 1. User texts in a zip code
# 2. Twilio Studio Flow calls the /get endpoint with the zip code
# 3. The /get endpoint returns a list of all the donations in that zip code
# 4. Twilio Studio Flow sends a text message with the list of donations
# 5. User texts in the ID of the donation they want
# 6. Twilio Studio Flow calls the /claim endpoint with the ID
# 7. The /claim endpoint updates the donation to be claimed
# 8. Twilio Studio Flow sends a text message saying the donation has been claimed

