from unittest.mock import patch
from src.handlers.admin_message_handler import lambda_handler


@patch("src.handlers.admin_message_handler.delete_message")
@patch("src.handlers.admin_message_handler.process_message")
@patch("src.handlers.admin_message_handler.receive_messages")
def test_lambda_handler_with_message(mock_receive, mock_process, mock_delete):
    mock_receive.return_value = [{"Body": "Hi", "ReceiptHandle": "xyz"}]

    lambda_handler()

    mock_process.assert_called_once()
    mock_delete.assert_called_once()
