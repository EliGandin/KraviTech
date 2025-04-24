import logging
import os
from typing import Optional, List, Dict

import boto3
from boto3 import Session
from botocore.exceptions import BotoCoreError, ClientError


class AWSConnection:
    def __init__(self) -> None:
        self._aws_access_key = os.getenv("AWS_ACCESS_KEY_ID", "test")
        self._aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY", "test")
        self._region = os.getenv("AWS_DEFAULT_REGION", "us-east-1")
        self._endpoint_url = os.getenv("AWS_ENDPOINT_URL", "http://localhost:4566")
        self._admin_sqs_url = os.getenv("ADMIN_SQS_URL",
                                        "http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/admin_messages")

        self._session = boto3.session.Session()
        self._admin_messages_sqs = self._session.client(
            service_name="sqs",
            aws_access_key_id=self._aws_access_key,
            aws_secret_access_key=self._aws_secret_key,
            region_name=self._region,
            endpoint_url=self._endpoint_url,
        )

        logging.info("✅ Created an SQS client connection!")

    @property
    def admin_sqs_url(self) -> str:
        return self._admin_sqs_url

    @property
    def session(self) -> Session:
        return self._session

    @property
    def admin_messages_sqs(self) -> boto3.client:
        return self._admin_messages_sqs

    def receive_messages(self, url: str, max_messages: int = 5, wait_time: int = 1) -> Optional[List[Dict]]:
        """
        Receives messages from the SQS queue.

        :param url: sqs URL
        :param max_messages: Maximum number of messages to receive.
        :param wait_time: Long polling wait time in seconds.
        :return: List of received messages or None if an error occurs.
        """
        try:
            response = self._admin_messages_sqs.receive_message(
                QueueUrl=url,
                MaxNumberOfMessages=max_messages,
                WaitTimeSeconds=wait_time
            )
            return response.get("Messages", [])
        except Exception as e:
            logging.error(f"[ERROR] Failed to receive messages: {e}")
            return None

    def delete_message(self, url: str, receipt_handle: str) -> None:
        """
        Deletes a message from the SQS queue.

        :param url: sqs URL
        :param receipt_handle: Receipt handle of the message to delete.
        """
        try:
            self._admin_messages_sqs.delete_message(
                QueueUrl=url,
                ReceiptHandle=receipt_handle
            )
            logging.info("[INFO] Deleted message from queue.")
        except Exception as e:
            logging.error(f"[ERROR] Failed to delete message: {e}")
