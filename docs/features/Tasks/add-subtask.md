# Add Subtask

## Description

___
This feature allows adding a subtask to an existing task.

* URL: `/tasks/SubTask/menti/{mentiId}`
* Method: `POST`
* Input Parameters:

| Key       | Data Type | Required |
|-----------|-----------|----------|
| `taskId`  | `number`  | `Yes`    |
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
        "taskId": 1,
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