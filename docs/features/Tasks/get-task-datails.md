# Get All Task Details

## Description

___
This feature returns the task details.

* URL: `/tasks/TaskDetails/{taskId}`
* Method: `GET`

___

* Example Response:

    ```json
      {
        "data": {
            "subTasks": 
              [
                {
                  "id": "1_1",
                  "title": "Install Python",
                  "status": "NEW",
                  "description": "Install Python on your computer",
                  "created_date": "2021-01-01",
                  "completed_date": null,
                  "in_progress_date": null
                },
                {
                  "id": "1_2",
                  "title": "Learn Python syntax",
                  "status": "NEW",
                  "description": "Learn the basic syntax of Python",
                  "created_date": "2021-01-01",
                  "completed_date": null,
                  "in_progress_date": null
                }
              ]
            }
          }
    ```

* Response Codes:
    * `200` - Success
    * `400` - Bad request
    * `500` - Internal server error
