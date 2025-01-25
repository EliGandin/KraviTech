# Signup

## Description

___
This feature allows users to sign up for an account on the website. Users are assigned to one of two groups, Menti or
Mentor.

## Menti Signup

___

* URL: `/signup/menti`
* Method: `POST`
* Input Parameters:

| Key            | Data Type | Constraints  | Default Value | Required |
|----------------|-----------|--------------|---------------|----------|
| `name`         | `string`  |              |               | `Yes`    |
| `email`        | `string`  | `UNIQUE`     |               | `Yes`    |
| `phone_number` | `string`  |              |               | `Yes`    |
| `password`     | `string`  |              |               | `Yes`    |
| `field`        | `field`   | `Field Enum` |               | `Yes`    |
| `education`    | `string`  |              |               | `No`     |
| `experience`   | `string`  |              |               | `No`     |
| `goals`        | `string`  |              |               | `Yes`    |
| `comments`     | `string`  |              |               | `No`     |

* Example Request:

```json
{
  "name": "John Doe",
  "email": "john.doe@email.com",
  "phone_number": "0512345678",
  "password": "password",
  "field": "DATA",
  "education": "BSc Computer Science",
  "experience": "2 years",
  "goals": "To learn more about data science",
  "comments": "I am excited to join the program"
}
```

* Return Codes:
    * `201` - Menti account created successfully
    * `400` - Invalid input parameters or existing email
    * `500` - Internal server error

## Mentor Signup

___

* URL: `/signup/mentor`
* Method: `POST`
* Input Parameters:

  | Key            | Data Type | Constraints  | Default Value | Required |
        |----------------|-----------|--------------|---------------|----------|
  | `name`         | `string`  |              |               | `Yes`    |
  | `email`        | `string`  | `UNIQUE`     |               | `Yes`    |
  | `phone_number` | `string`  |              |               | `Yes`    |
  | `password`     | `string`  |              |               | `Yes`    |
  | `field`        | `field`   | `Field Enum` |               | `Yes`    |
  | `company`      | `string`  |              |               | `No`     |
  | `position`     | `string`  |              |               | `No`     |
  | `experience`   | `string`  |              |               | `No`     |

* Example Request:

    ```json
    {
    "name": "Jane Doe",
    "email": "jane.doe@email.com",
    "phone_number": "0512345678",
    "password": "password",
    "field": "DATA",
    "company": "XYZ",
    "position": "Data Analyst",
    "experience": "5 years"
    }
    ```

* Return Codes:
    * `201` - Mentor account created successfully
    * `400` - Invalid input parameters or existing email
    * `500` - Internal server error

___

## Testing Coverage

___

* Integration tests for Menti and Mentor sign up
* End-to-end tests for Menti and Mentor sign up