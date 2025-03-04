# from typing import Final
#
# import boto3
# import logging
#
# # It might take a moment for LocalStack to start; wait a bit.
# logging.info("Waiting for LocalStack to be ready...")
#
# tasks_table_name: Final[str] = "Tasks"
#
# # Connect to DynamoDB on LocalStack.
# dynamodb = boto3.client(
#     'dynamodb',
#     endpoint_url='http://localstack:4566',  # Use service name from docker-compose.
#     region_name='us-east-1',
#     aws_access_key_id='test',
#     aws_secret_access_key='test'
# )
#
# # Create a DynamoDB table.
# print(f"Creating DynamoDB table: '{tasks_table_name}'...")
# tables = dynamodb.list_tables()
# if tasks_table_name in tables['TableNames']:
#     print(f"Table '{tasks_table_name}' already exists.")
#
# table = dynamodb.create_table(
#     TableName='Tasks',
#     KeySchema=[
#         {
#             'AttributeName': 'id',
#             'KeyType': 'HASH'
#         }
#     ],
#     AttributeDefinitions=[
#         {
#             'AttributeName': 'id',
#             'AttributeType': 'S'
#         }
#     ],
#     ProvisionedThroughput={
#         'ReadCapacityUnits': 5,
#         'WriteCapacityUnits': 5
#     }
# )
#
# # Wait until the table exists.
# tables = dynamodb.list_tables()
# if tasks_table_name in tables['TableNames']:
#     print(f"Table {tasks_table_name} created !")
# else:
#     print(f"Table {tasks_table_name} not created!")
#     exit(1)


import argparse

import os
import logging
from typing import Final

from populate_dynamo import main as upload_tasks

tasks_table_name: Final[str] = "Tasks"


def main(args):
    images_dir = os.environ.get('IMAGES_DIR')
    if args.action == "db":
        logging.info("updating tasks in SQL DB")
        # populate_db(bucket_name)

    if args.action == "dynamo":
        logging.info("creating and uploading tasks to dynamo !")
        upload_tasks(tasks_table_name)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('--action', metavar='-a', dest="action",
                        help='which action to do? (what to populate db or tasks?)',
                        required=True,
                        choices=['db', 'dynamo'])
    args = parser.parse_args()
    LOGLEVEL = os.environ.get('LOGLEVEL', 'INFO').upper()
    logging.basicConfig(format='%(levelname)s: %(message)s', level=LOGLEVEL)
    main(args)
