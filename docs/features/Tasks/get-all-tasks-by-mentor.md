# Get All Tasks By Mentor

## Description

___
This feature returns all tasks of mentis, by the mentor assigned to them.

**This data is stored on DynamoDB**

* URL: `/tasks/mentor/{mentorId}`
* Method: `GET`

___

* Example Response:

    ```json
  {
      "data": [
          {
              "menti_id": "1",
              "mentor_id": "1",
              "in_progress_date": null,
              "description": "Learn Python basics",
              "task_id": "a6cb4f80-e3e3-45eb-9e8b-70d7eb7b53ac",
              "created_date": "2021-01-01",
              "title": "Learn Python",
              "status": "NEW",
              "completed_date": null,
              "subtasks": [
                  {
                      "in_progress_date": null,
                      "description": "Install Python on your computer",
                      "id": "a6cb4f80-e3e3-45eb-9e8b-70d7eb7b53ac_1",
                      "created_date": "2021-01-01",
                      "title": "Install Python",
                      "status": "NEW",
                      "completed_date": null
                  },
                  {
                      "in_progress_date": null,
                      "description": "Learn the basic syntax of Python",
                      "id": "a6cb4f80-e3e3-45eb-9e8b-70d7eb7b53ac_2",
                      "created_date": "2021-01-01",
                      "title": "Learn Python syntax",
                      "status": "NEW",
                      "completed_date": null
                  }
              ]
          }
        ]
    }
    ```

* Response Codes:
    * `200` - Success
    * `400` - Bad request
    * `500` - Internal server error

