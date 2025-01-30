# Get All Mentors

## Description

___
This feature returns all the mentors and there information. Supports Pagination

* URL: `/Mentors`
* Method: `GET`
* Input Parameters:

  | Key     | Data Type | Required |
        |---------|-----------|----------|
  | `page`  | `int`     | `No`     |
  | `limit` | `int`     | `No`     |

* Example Url:
    * `/Mentors`
    * `/Mentors?page=1&limit=10`

___

* Example Response:

    ```json
      [
        {
            "id": 1,
            "name": "Mentor 1",
            "email": "mentor1@test.com",
            "phone_number": "1234567891",
            "field": "DATA",
            "company": "Company 1",
            "position": "Position 1",
            "experience": "LOW",
            "status": "PENDING",
            "start_date": "2025-01-27T00:00:00.000Z",
            "end_date": null
        }
      ]
    ```

* Response Codes:
    * `200` - Success
    * `400` - Invalid input parameters
    * `500` - Internal server error

