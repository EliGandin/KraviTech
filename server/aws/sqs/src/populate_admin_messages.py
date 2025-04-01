import json
import logging

import boto3

from aws_connection import AWSConnection


def main(queue_name: str) -> None:
    connection = AWSConnection()
    sqs_url = create_admin_message_queue(connection, queue_name)
    populate_admin_messages(connection.sqs(), sqs_url)


def create_admin_message_queue(connection: AWSConnection, queue_name: str) -> str:
    try:
        sqs_url = connection.create_queue(queue_name, True)
        if not sqs_url:
            raise ValueError("No Queue")

        return sqs_url
    except Exception:
        logging.error("Failed to create queue, exiting")
        exit(1)


def populate_admin_messages(sqs: boto3.client, sqs_url: str) -> None:
    try:
        with open("json/admin_messages.json", "r") as f:
            data = json.load(f)

        for message in data.get("messages", []):
            message_id = message.get("id")

            message_item = {
                "message_id": message_id,
                "name": message.get("name"),
                "email": message.get("email"),
                "phone_number": message.get("phone_number"),
                "title": message.get("title"),
                "message": message.get("message"),
                "status": message.get("status"),
                "operator_id": message.get("operator_id"),
                "created_date": message.get("created_date"),
                "closed_date": message.get("closed_date"),
            }

            sqs.send_message(QueueUrl=sqs_url,
                             MessageBody=json.dumps(message_item),
                             MessageGroupId="admin-events",
                             MessageDeduplicationId=f"unique-message-id-{message_id}")
            logging.info(f"sent message {message_id}")
    except FileNotFoundError as e:
        logging.error("Failed to populate table because of {}".format(e))
        exit(1)
    except Exception as e:
        logging.error("Failed to populate table because of {}".format(e))
        exit(1)
