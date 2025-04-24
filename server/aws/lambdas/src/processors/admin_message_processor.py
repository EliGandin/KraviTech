import logging
from typing import Dict


def process_message(message: Dict) -> None:
    # Simulate your domain logic here
    body = message.get("Body")
    logging.info(f"Processing message: {body}")
