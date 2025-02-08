# Get Messages

## Description

___
This feature returns all the messages, for the admin to view
___

* URL: `/admin/messages`
* Method: `GET`

___

* Example Response:

    ```json
      [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@test.com",
            "phone_number": "0501234567",
            "title": "help",
            "message": "I have a question",
            "status": "OPEN",
            "date": "2025-02-07T00:00:00.000Z",
            "operator_id": 1
        },
        {
            "id": 2,
            "name": "Jane Doe",
            "email": "jane@test.com",
            "phone_number": "0501234567",
            "title": "question",
            "message": "I have a question",
            "status": "OPEN",
            "date": "2025-02-07T00:00:00.000Z",
            "operator_id": 1
        }
      ]
    ```

* Response Codes:
    * `200` - Success
    * `500` - Internal server error

