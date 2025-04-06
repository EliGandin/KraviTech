# Add Subtask

## Description

___
This feature allows adding a subtask to an existing task. Tasks have a list of subtasks. The new subtask id will be
"father" task UUID + the current date.

* URL: `/tasks/SubTask/{taskId}`
* Method: `POST`
* Input Parameters:

| Key       | Data Type | Required |
|-----------|-----------|----------|
| `subtask` | `Subtask` | `Yes`    |

Subtask Object:

```json
{
  "title": "Learn Python",
  "description": "Learn Python basics"
}
```

___

* Example Request:

    ```json
    {
        "subtask": {
            "title": "Learn Python",
            "description": "Learn Python basics"
        }
    }
    ```

___

* Response Codes:
    * `200` - Success
    * `400` - Invalid input parameters
    * `500` - Internal server error

___

* Test Coverage:
    * Unit Tests - ✅
    * E2E Tests - ✅