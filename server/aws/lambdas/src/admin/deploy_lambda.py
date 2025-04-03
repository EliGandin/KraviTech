import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from src.lambda_client import LambdaClient

# from ..lambda_client import LambdaClient

lambda_name = "SQSMessageProcessor"

# Create Lambda function
with open("function.zip", "rb") as f:
    zip_content = f.read()

lambda_client = LambdaClient()

lambda_response = lambda_client.create_function(
    lambda_name,
    "python3.9",
    "arn:aws:iam::000000000000:role/execution_role",
    "admin_message_handler.lambda_handler",
    {"ZipFile": zip_content},
)

print(f"Lambda Created: {lambda_response}")

# Get SQS queue URL
queue_name = os.environ.get("SQS_QUEUE_NAME", "admin_messages")
queue_url = os.environ.get("SQS_QUEUE_URL",
                           "http://sqs.us-east-1.localhost.localstack.cloud:4566/000000000000/admin_messages")

# Get queue ARN
queue_arn = f"arn:aws:sqs:us-east-1:000000000000:{queue_name}"

# Create event source mapping to trigger Lambda from SQS
event_source_mapping = lambda_client.create_event_source_mapping(queue_arn, lambda_name, 1)

print(f"Event Source Mapping Created: {event_source_mapping}")
