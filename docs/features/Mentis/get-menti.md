# Get Menti

## Description

___
This feature returns all information about the menti, for his profile page.

* URL: `/mentis/:id`
* Method: `GET`

___

* Example Response:

    ```json
      {
    "id": 1,
    "name": "John Doe",
    "email": "john@test.com",
    "phone_number": "0532648574",
    "education": "BSc Computer Science",
    "experience": "LOW",
    "goals": "Learn backend development",
    "comments": "Very motivated to learn",
    "operator_id": 1,
    "operator_name": "Jane Doe",
    "status": "ACTIVE",
    "mentor_id": 1,
    "mentor_name": "Joe Doe",
    "start_date": "2021-01-01T00:00:00.000Z",
    "end_date": null
    }
    ```

* Response Codes:
    * `200` - Success
    * `500` - Internal server error

