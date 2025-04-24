from unittest.mock import patch
from src.clients import sqs_client


@patch("src.clients.sqs_client.sqs")
def test_receive_messages(mock_sqs):
    mock_sqs.receive_message.return_value = {
        "Messages": [{"Body": "Test message", "ReceiptHandle": "abc"}]
    }

    messages = sqs_client.receive_messages()
    assert len(messages) == 1
    assert messages[0]["Body"] == "Test message"


@patch("src.clients.sqs_client.sqs")
def test_delete_message(mock_sqs):
    sqs_client.delete_message("abc")
    mock_sqs.delete_message.assert_called_once()
