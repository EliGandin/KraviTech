# Get All Tasks By Mentor

## Description

___
This feature returns all tasks of mentis, by the mentor assigned to them.

* URL: `/tasks/mentor/{mentorId}`
* Method: `GET`

___

* Example Response:

    ```json
      [
        {
            "menti_id": 1,
            "menti_name": "John Doe",
            "tasks": [
                {
                    "id": 1,
                    "title": "Learn Python",
                    "description": "Learn Python basics",
                    "status": "NEW",
                    "created_date": "2021-01-01",
                    "in_progress_date": null,
                    "completed_date": null,
                    "sub_tasks_count": 2
                }
            ]
        },
        {
            "menti_id": 2,
            "menti_name": "Jane Doe",
            "tasks": [
                {
                    "id": 2,
                    "title": "Learn React",
                    "description": "Learn React basics",
                    "status": "IN_PROGRESS",
                    "created_date": "2021-01-01",
                    "in_progress_date": "2021-01-02",
                    "completed_date": null,
                    "sub_tasks_count": 1
                }
            ] 
        }
      ]
    ```

* Response Codes:
    * `200` - Success
    * `400` - Bad request
    * `500` - Internal server error
