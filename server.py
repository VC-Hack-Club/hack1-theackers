### Flask server that interfaces with firebaes

import os
import json
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from flask import request

from sendEmail import send_email as sendDonationEmail

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
def donate():
    genericName = request.args.get('genericName')
    quantity = request.args.get('quantity')
    zipCode = request.args.get('zipCode')
    email = request.args.get('email')
    print(genericName)

    # See if the zipCode document exists
    doc_ref = db.collection(u'locations').document(str(zipCode))
    doc = doc_ref.get()
    if not doc.exists:
        return "Sorry, we don't have any locations in that zip code. Try 95111 or 95054."

    doc_ref = db.collection(u'donate').document()
    doc_ref.set({
        u'genericName': genericName,
        u'quantity': int(quantity),
        u'zipCode': int(zipCode),
        u'email': email,
        u'isClaimed': False,
        u'isDelivered': True
    })
    # template message
    message = "Thank you for donating " + str(quantity) + " " + genericName + " to the Food Bank. We will contact you when your donation is claimed."
    message += "\n To donate more food, feel free to close this tab."
    sendDonationEmail(email, message)
    return message

@app.get('/all')
def all():
    try:
        zipCode = request.args.get('zipCode', default = 0, type = int)
        if zipCode == 0:
            docs = db.collection(u'donate').stream()
        else:
            docs = db.collection(u'donate').where(u'zipCode', u'==', int(zipCode)).stream()
        docs = list(docs)
        if len(docs) == 0:
            return "No results found."
        else:
            html_body = "<table><tr><th>Quantity</th><th>Generic Name</th><th>Zip Code</th><th>Email</th><th>Is Claimed</th><th>Is Delivered</th></tr>"
            for doc in docs:
                html_body += "<tr><td>" + str(doc.to_dict()['quantity']) + "</td><td>" + doc.to_dict()['genericName'] + "</td><td>" + str(doc.to_dict()['zipCode']) + "</td><td>" + doc.to_dict()['email'] + "</td><td>" + str(doc.to_dict()['isClaimed']) + "</td><td>" + str(doc.to_dict()['isDelivered']) + "</td></tr>"
            html_body += "</table>"
            return html_body
    except Exception as e:
        return "Sorry, no results found."

@app.get('/showall')
def all_all():
    docs = db.collection(u'donate').stream()
    docs = list(docs)
    if len(docs) == 0:
        return "No results found."
    else:
        html_body = "<table><tr><th>Quantity</th><th>Generic Name</th><th>Zip Code</th><th>Email</th><th>Is Claimed</th><th>Is Delivered</th></tr>"
        for doc in docs:
            print(doc.to_dict())
            html_body += "<tr><td>" + str(doc.to_dict()['quantity']) + "</td><td>" + doc.to_dict()['genericName'] + "</td><td>" + str(doc.to_dict()['zipCode']) + "</td><td>" + doc.to_dict()['email'] + "</td><td>" + str(doc.to_dict()['isClaimed']) + "</td><td>" + str(doc.to_dict()['isDelivered']) + "</td></tr>"
        html_body += "</table>"
        return html_body        


@app.get('/deliver')
def deliver(id):
    doc_ref = db.collection(u'donate').document(id)
    doc_ref.update({
        u'isDelivered': True
    }, merge=True)
    return {"message": "Success!"}

@app.get('/claim')
def claim():
    id = request.args.get('id')
    doc_ref = db.collection(u'donate').document(id)
    doc_ref.update({
        u'isClaimed': True
    }, merge=True)
    return {"message": "Success!"}

@app.get('/get')
def get():
    zip_code = int(request.args.get('zipCode'))
    docs = db.collection(u'donate').where(u'zipCode', u'==', zip_code).where(u'isClaimed', u'==', False).where(u'isDelivered', u'==', True).stream()
    return [doc.to_dict() for doc in docs]

@app.get('/search')
def search():
    generic_name = request.args.get('genericName')
    docs = db.collection(u'donate').where(u'genericName', u'==', generic_name).where(u'isClaimed', u'==', False).where(u'isDelivered', u'==', True).stream()
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

