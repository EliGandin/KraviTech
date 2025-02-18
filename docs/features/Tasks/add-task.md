# Add Task

## Description

___
This feature allows adding a subtask to an existing task.

* URL: `/tasks/{mentiId}`
* Method: `POST`
* Input Parameters:

| Key        | Data Type | Required |
|------------|-----------|----------|
| `mentorId` | `number`  | `Yes`    |
| `Task`     | `Task`    | `Yes`    |

Task Object:

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
        "mentor_id": 1,
        "task": {
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