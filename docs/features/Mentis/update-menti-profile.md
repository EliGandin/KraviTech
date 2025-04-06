# Update Menti Profile

## Description

___
This feature allows mentis (and admins) to edit to their profile.
___

* URL: `/mentis/UpdateProfile/{id}`
* Method: `PUT`
* Input Parameters:

  | Key            | Data Type | Required |
                |----------------|-----------|----------|
  | `name`         | `string`  | `No`     |
  | `email`        | `string`  | `No`     |
  | `phone_number` | `string`  | `No`     |
  | `education`    | `string`  | `No`     |
  | `experience`   | `string`  | `No`     |
  | `goals`        | `string`  | `No`     |
  | `comments`     | `string`  | `No`     |

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
    "education": "Bachelors",
    "experience": "2 years",
    "goals": "To become a mentor",
    "comments": "I am a very hardworking person"
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
    

