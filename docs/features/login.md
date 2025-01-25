# Login

## Description

___
This feature allows users to login to their account on the website.

## Design

___
When the request is sent, we search for the existing email in the following order:

1. Mentors database
2. Mentis database
3. Admins database

If the email is found in any of the databases, we check if the password matches the stored password. If the password
matches, we return the user's information and a token. If the password does not match, we return an error message.
___

* URL: `/login`
* Method: `POST`
* Input Parameters:

  | Key        | Data Type | Required |
        |------------|-----------|----------|
  | `email`    | `string`  | `Yes`    |
  | `password` | `string`  | `Yes`    |

* Example Request:

    ```json
    {
    "email": "john.doe@email.com",
    "password": "password"
    }
    ```

* Example Response:

    ```json
    {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@email.com"
  }
    ```

* Return Codes:
    * `200` - Login successful
    * `400` - Invalid input parameters or incorrect credentials
    * `500` - Internal server error