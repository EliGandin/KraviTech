# app/clients/sqs_client.py
from typing import List, Dict, Optional

from server.aws.lambdas.src.aws_connection import AWSConnection

aws = AWSConnection
sqs = aws.admin_messages_sqs


def receive_messages(max_messages: int = 5, wait_time: int = 1) -> Optional[List[Dict]]:
    try:
        response = sqs.receive_message(
            QueueUrl=aws.admin_sqs_url,
            MaxNumberOfMessages=max_messages,
            WaitTimeSeconds=wait_time
        )
        return response.get("Messages", [])
    except Exception as e:
        print(f"[ERROR] Failed to receive messages: {e}")
        return None


def delete_message(receipt_handle: str) -> None:
    try:
        sqs.delete_message(
            QueueUrl=aws.admin_sqs_url,
            ReceiptHandle=receipt_handle
        )
        print("[INFO] Deleted message from queue.")
    except Exception as e:
        print(f"[ERROR] Failed to delete message: {e}")
