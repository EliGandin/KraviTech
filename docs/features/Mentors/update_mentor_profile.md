# Update Mentor Profile

## Description

___
This feature allows mentis (and admins) to edit to their profile.
___

* URL: `/mentors/UpdateProfile/{id}`
* Method: `PUT`
* Input Parameters:

  | Key            | Data Type | Required |
                    |----------------|-----------|----------|
  | `name`         | `string`  | `No`     |
  | `email`        | `string`  | `No`     |
  | `phone_number` | `string`  | `No`     |
  | `position`     | `string`  | `No`     |
  | `company`      | `string`  | `No`     |
  | `field`        | `string`  | `No`     |
  | `experience`   | `string`  | `No`     |

**Note:** the parameters are optional, but cannot be an empty string

* Example Request:

    ```json
    {
    "name": "John Doe",
    "email": "john.doe@email.com",
    "password": "password"
    }
    ```

* Example Response:

    ```json
    {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@email.com",
    "phone_number": "1234567890",
    "position": "Software Engineer",
    "company": "Google",
    "field": "Software Development",
    "experience": "High"
  }
    ```

* Return Codes:
    * `200` - Login successful
    * `400` - Invalid input parameters or incorrect credentials
    * `500` - Internal server error

___

* Test Coverage:
    * Integration Tests ✅
    * E2E Tests - TBC
    

