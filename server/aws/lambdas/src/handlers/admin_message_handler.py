import logging

from ..clients.sqs_client import receive_messages, delete_message
from ..processors.admin_message_processor import process_message


def lambda_handler(event=None, context=None):
    logging.info("Polling SQS for messages...")

    messages = receive_messages()
    if not messages:
        print("[INFO] No messages found.")
        return

    for message in messages:
        try:
            process_message(message)
            delete_message(message["ReceiptHandle"])
        except Exception as e:
            print(f"[ERROR] Failed to process message: {e}")
