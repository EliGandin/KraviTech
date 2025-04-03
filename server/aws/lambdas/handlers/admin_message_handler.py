import json

from server.aws.lambdas.src.lambda_client import LambdaClient


def lambda_handler(event, context):
    lambda_client = LambdaClient()
    for record in event["Records"]:
        message = record["body"]
        print(f"Received SQS Message: {message}")
    return {
        "statusCode": 200,
        "body": json.dumps("Messages processed successfully")
    }
