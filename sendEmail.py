# Send an email to the donor
from config import *
import smtplib
from email.mime.text import MIMEText

def send_email(donor, message):
    """Send a thank you email to the donor for their generous donation when it's been claimed"""
    port = 465
    smtp_server = SMTP_EMAIL
    sender_email = SMTP_USER
    password = SMTP_PASS
    receiver_email = donor

    message = MIMEText(message)
    message['Subject'] = 'Thank you for your donation!'
    message['From'] = sender_email
    message['To'] = receiver_email

    server = smtplib.SMTP_SSL(smtp_server, port)
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message.as_string())
    server.quit()

