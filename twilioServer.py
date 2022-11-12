from flask import Flask, request, jsonify, render_template
import requests
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from twilio.twiml.messaging_response import MessagingResponse
from sendEmail import send_email as sendDonationEmail
#  Initialize Flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#  Initialize Firestore DB
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Similar to server.py
# Except we are using Twilio instead of HTTP requests
@app.route("/sms", methods=['GET', 'POST'])
def sms_reply():
    """Respond to incoming calls with a simple text message."""
    # Start our TwiML response
    incoming_msg = request.values.get('Body', '')
    resp = MessagingResponse()
    msg = resp.message()
    responded = False
    if 'search' in incoming_msg.lower():
        # Search for a food item in the database based on the user's input
        # Return the first 5 results
        # If there are no results, return a message saying so

        # Get the search term
        generic_name = incoming_msg.split(' ', 1)[1]
        # Search for the food item in the database
        docs = db.collection(u'donate').where(u'genericName', u'==', generic_name).where(u'isClaimed', u'==', False).limit(5).stream()
        # If there are no results, return a message saying so
        # turn docs into a list
        docs = list(docs)
        if len(docs) == 0:
            msg.body("No results found.")
            responded = True
        # Otherwise, return the first 5 results
        else:
            msg_body = "\n\n"
            for doc in docs:
                msg_body += str(doc.to_dict()['quantity']) + " " + doc.to_dict()['genericName'] + " at " + str(doc.to_dict()['zipCode']) + ". "
                msg_body += "\n Reply with 'claim " + doc.id + "' to claim this item. \n"
            msg.body(msg_body)
            responded = True
    elif 'claim' in incoming_msg.lower():
        # Claim a food item in the database based on the user's input of the ID
        # Return a message saying so

        # Get the ID
        id_ = incoming_msg.split(' ', 1)[1].strip()
        print(id_)
        # Make sure the ID isn't claimed
        doc_ref = db.collection(u'donate').document(id_)
        doc = doc_ref.get()
        if not doc.exists:
            msg.body("Sorry, that ID doesn't exist.")
            responded = True
        elif doc.to_dict()['isClaimed']:
            msg.body("Sorry, that item has already been claimed.")
            responded = True
        else:
            # Claim the food item in the database
            doc_ref = db.collection(u'donate').document(id_)
            doc_ref.update({
                u'isClaimed': True
            })
            # Get the food item's data
            doc = doc_ref.get()
            # Grab the zip-code
            zip_code = doc.to_dict()['zipCode']
            loc_ref = db.collection(u'locations').document(str(zip_code))
            # Grab the location's data
            loc = loc_ref.get()
            # Grab the location's address
            address = loc.to_dict()['address']
            maps_link = "https://www.google.com/maps/search/?api=1&query=" + address
            # get the food items name
            generic_name = doc.to_dict()['genericName']
            # Return a message saying so
            msg.body(f"Food item of {generic_name} claimed. It is located at {address}. {maps_link}")
            emailMsg = "Your donation of " + str(doc.to_dict()['quantity']) + " " + doc.to_dict()['genericName'] + " has been claimed. Thank you for your donation!"
            sendDonationEmail(doc.to_dict()['email'], emailMsg)
            responded = True
    elif 'donate' in incoming_msg.lower():
        # Donate a food item in the database based on the user's input of the ID
        # Return a message saying so

        # Get the ID
        id_ = incoming_msg.split(' ', 1)[1].strip()
        # Donate the food item in the database
        doc_ref = db.collection(u'donate').document(id_)
        doc_ref.update({
            u'isDelivered': True
        }, merge=True)
        # Return a message saying so
        msg.body("Food item donated.")
        responded = True
    else:
        # If the user's input is not recognized, return a message saying so
        msg.body("Sorry, I didn't understand that command. Commands are: search, claim, donate.")
        responded = True
    
    # If we haven't responded yet, return a message saying so
    if not responded:
        msg.body("Sorry, I didn't understand that command. Commands are: search, claim, donate.")
    return str(resp)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5700)
