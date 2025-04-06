import logging
import os
from typing import List, Optional

import boto3
from boto3 import Session
from boto3.resources.base import ServiceResource


class AWSConnection:
    def __init__(self) -> None:
        self._session = boto3.session.Session()
        self._dynamodb = self._session.resource(
            service_name='dynamodb',
            aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
            region_name=os.environ.get('AWS_DEFAULT_REGION'),
            endpoint_url=os.environ.get('AWS_ENDPOINT_URL')
        )
        logging.info("Created a DynamoDB client connection!")

    @property
    def session(self) -> Session:
        return self._session

    @property
    def dynamodb(self) -> ServiceResource:
        return self._dynamodb

    def list_tables(self) -> List[str]:
        return self._dynamodb.meta.client.list_tables()['TableNames']

    def validate_table_creation(self, table_name: str) -> None:
        tables = self.list_tables()
        if table_name not in tables:
            raise ValueError(f"Table '{table_name}' not created!")

    def create_table(self, table_name: str) -> Optional[ServiceResource]:
        tables = self.list_tables()
        if table_name in tables:
            logging.error(f"Table '{table_name}' already exists.")
            return None

        table = self._dynamodb.create_table(
            TableName=table_name,
            KeySchema=[
                {
                    "AttributeName": "task_id",
                    "KeyType": "HASH",
                },
            ],
            AttributeDefinitions=[
                {
                    "AttributeName": "task_id",
                    "AttributeType": "S",
                },
                {
                    "AttributeName": "mentor_id",
                    "AttributeType": "S",
                },
                {
                    "AttributeName": "menti_id",
                    "AttributeType": "S",
                }
            ],
            GlobalSecondaryIndexes=[
                {
                    "IndexName": "mentorId-index",
                    "KeySchema": [
                        {"AttributeName": "mentor_id", "KeyType": "HASH"}
                    ],
                    "Projection": {"ProjectionType": "ALL"},
                    "ProvisionedThroughput": {
                        "ReadCapacityUnits": 5,
                        "WriteCapacityUnits": 5
                    }
                },
                {
                    "IndexName": "mentiId-index",
                    "KeySchema": [
                        {"AttributeName": "menti_id", "KeyType": "HASH"}
                    ],
                    "Projection": {"ProjectionType": "ALL"},
                    "ProvisionedThroughput": {
                        "ReadCapacityUnits": 5,
                        "WriteCapacityUnits": 5
                    }
                }
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            },
        )

        table.meta.client.get_waiter("table_exists").wait(TableName=table_name)
        self.validate_table_creation(table_name)
        return table

    def print_table(self, table_name: str):
        table = self._dynamodb.meta.client.describe_table(TableName=table_name)
        logging.info(f"Table: {table}")
