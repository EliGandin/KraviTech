# Get Mentor

## Description

___
This feature returns all information about the mentor, for his profile page.

* URL: `/mentors/:id`
* Method: `GET`

___

* Example Response:

    ```json
    {
    "id": 1,
    "name": "Jane Doe",
    "email": "Jane@test.com",
    "phone_number": "0505050050",
    "field": "SOFTWARE",
    "company": "TechCorp",
    "position": "Senior Developer",
    "experience": "MID",
    "status": "ACTIVE",
    "start_date": "2021-01-01T00:00:00.000Z",
    "end_date": null,
    "menti_count": "2"
    }
    ```

* Response Codes:
    * `200` - Success
    * `500` - Internal server error

