# Get All Tasks By Menti

## Description

___
This feature returns all tasks of a specified menti.

* URL: `/tasks/menti/{id}`
* Method: `GET`

___

* Example Response:

    ```json
      [
        {
            "id": 1,
            "title": "Learn Python",
            "description": "Learn Python basics",
            "status": "NEW",
            "created_date": "2021-01-01T00:00:00.000Z",
            "in_progress_date": null,
            "completed_date": null,
            "sub_tasks_count": 2
        },
        {
            "id": 2,
            "title": "Learn React",
            "description": "Learn React basics",
            "status": "IN_PROGRESS",
            "created_date": "2021-01-01T00:00:00.000Z",
            "in_progress_date": "2021-01-02T00:00:00.000Z",
            "completed_date": null,
            "sub_tasks_count": 0
        }
      ]
    ```

* Response Codes:
    * `200` - Success
    * `400` - Bad request
    * `500` - Internal server error
