import logging
import os
import boto3
from botocore.client import BaseClient
from botocore.exceptions import ClientError

# Load environment variables once
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID', 'test')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY', 'test')
AWS_REGION = os.getenv('AWS_DEFAULT_REGION', 'us-east-1')
AWS_ENDPOINT_URL = os.getenv('AWS_ENDPOINT_URL', 'http://localhost:4566')

# Ensure AWS credentials and region exist
if not AWS_REGION:
    print(AWS_ENDPOINT_URL)

    raise ValueError("AWS_DEFAULT_REGION is not set! Ensure it's configured in your environment.")
if not AWS_ACCESS_KEY_ID or not AWS_SECRET_ACCESS_KEY:
    raise ValueError("AWS credentials not found! Ensure AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are set.")


class LambdaClient:
    def __init__(self) -> None:
        self._session = boto3.session.Session(region_name=AWS_REGION)
        self._lambda = self._session.client(
            service_name='lambda',
            aws_access_key_id=AWS_ACCESS_KEY_ID,
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            region_name=AWS_REGION,  # Ensure region is set
            endpoint_url=AWS_ENDPOINT_URL
        )
        logging.info(f"Created a Lambda client in region {AWS_REGION}")

    @property
    def session(self) -> boto3.Session:
        return self._session

    @property
    def lambda_client(self) -> BaseClient:
        return self._lambda

    def create_function(self, function_name: str, runtime: str, role: str, handler: str, code: dict):
        try:
            response = self._lambda.create_function(
                FunctionName=function_name,
                Runtime=runtime,
                Role=role,
                Handler=handler,
                Code=code
            )
            function_arn = response["FunctionArn"]
            waiter = self.lambda_client.get_waiter("function_active_v2")
            waiter.wait(FunctionName=function_name)
        except ClientError:
            logging.error("Failed to create Lambda function. Check if the function already exists.")
        else:
            logging.info(f"Lambda function {function_name} created successfully.")
            return function_arn

    def create_event_source_mapping(self, arn: str, func_name: str, batch_size: int) -> dict:
        return self._lambda.create_event_source_mapping(
            EventSourceArn=arn,
            FunctionName=func_name,
            BatchSize=batch_size
        )
