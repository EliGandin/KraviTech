# Post New Message

## Description

___
This feature allows user to send new contact messages, that will be handled by the admins and operator.

* URL: `/admin/message`
* Method: `POST`
* Input Parameters:

| Key            | Data Type | Required |
|----------------|-----------|----------|
| `name`         | `string`  | `Yes`    |
| `email`        | `string`  | `Yes`    |
| `phone_number` | `string`  | `Yes`    |
| `title`        | `string`  | `Yes`    |
| `message`      | `string`  | `Yes`    |

___

* Example Request:

    ```json
    {
        "name":  "John Doe",
        "email": "john.doe@test.com",
        "phone_number": "0545555555",
        "title": "Test Title",
        "message": "Test Message"
    }
    ```

___

* Response Codes:
    * `200` - Success
    * `400` - Invalid input parameters
    * `500` - Internal server error

___

* Test Coverage:
    * Unit Tests - ✅
    * E2E Tests - TBD
