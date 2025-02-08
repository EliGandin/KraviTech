# Get All Mentors

## Description

___
This feature returns all the mentors and their information.
___

* URL: `/Mentors`
* Method: `GET`

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
    * `500` - Internal server error

