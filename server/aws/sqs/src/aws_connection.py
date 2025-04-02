import logging
import os

import boto3
from boto3 import Session
from botocore.exceptions import BotoCoreError, ClientError


class AWSConnection:
    def __init__(self) -> None:
        self._aws_access_key = os.getenv("AWS_ACCESS_KEY_ID", "test")
        self._aws_secret_key = os.getenv("AWS_SECRET_ACCESS_KEY", "test")
        self._region = os.getenv("AWS_DEFAULT_REGION", "us-east-1")
        self._endpoint_url = os.getenv("AWS_ENDPOINT_URL", "http://localhost:4566")

        self._session = boto3.session.Session()
        self._sqs = self._session.client(
            service_name="sqs",
            aws_access_key_id=self._aws_access_key,
            aws_secret_access_key=self._aws_secret_key,
            region_name=self._region,
            endpoint_url=self._endpoint_url,
        )

        logging.info("✅ Created an SQS client connection!")

    @property
    def session(self) -> Session:
        return self._session

    @property
    def sqs(self) -> boto3.client:
        return self._sqs

    def create_queue(self, queue_name: str, fifo: bool = False) -> str:
        """
        Creates an SQS queue.

        :param queue_name: Name of the queue. If FIFO, it must end with `.fifo`.
        :param fifo: Boolean flag to create a FIFO queue.
        :return: Queue URL
        """
        if fifo and not queue_name.endswith(".fifo"):
            queue_name += ".fifo"

        attributes = {}
        if fifo:
            attributes = {
                "FifoQueue": "true",
                "ContentBasedDeduplication": "true",  # Enables automatic deduplication
            }

        try:
            response = self._sqs.create_queue(QueueName=queue_name, Attributes=attributes)
            queue_url = response["QueueUrl"]
            logging.info(f"✅ Successfully created queue: {queue_name} (URL: {queue_url})")
            return queue_url

        except ClientError as e:
            logging.error(f"❌ Failed to create queue {queue_name}: {e.response['Error']['Message']}")
            raise
        except BotoCoreError as e:
            logging.error(f"❌ AWS BotoCore error while creating queue {queue_name}: {str(e)}")
            raise
