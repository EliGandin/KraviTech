from src.processors.admin_message_processor import process_message


def test_process_message(capsys):
    msg = {"Body": "Test logic"}
    process_message(msg)

    captured = capsys.readouterr()
    assert "Processing message: Test logic" in captured.out
