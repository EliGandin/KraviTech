# DB Tables
### Enums
`feild : Data | Hardware | Software`  
`role : Mentor | Menti | Admin`  
`status : Pending | Pre Production | Active | Inactive | Success`
## Mentors
| Column Name   | Data Type    | Constraints                   | Default Value   |
|---------------|--------------|-------------------------------|-----------------|
| `id`          | `SERIAL`     | `PRIMARY KEY`                |                 |
| `name`        | `VARCHAR`    | `NOT NULL`                   |                 |
| `email`       | `VARCHAR`    | `UNIQUE`, `NOT NULL`         |                 |
| `phone_number`| `VARCHAR`    | `NOT NULL`                   |                 |
| `password`    | `VARCHAR`    | `NOT NULL`                   |                 |
| `field`       | `field`      |                               |                 |
| `company`     | `VARCHAR`    |                               |                 |
| `position`    | `VARCHAR`    |                               |                 |
| `experience`  | `experience` |                               |                 |
| `status`      | `status`     |                               | `'PENDING'`     |
| `start_date`  | `DATE`       |                               | `CURRENT_DATE`  |
| `end_date`    | `DATE`       |                               | `NULL`          |  

## Mentis
| Column Name    | Data Type    | Constraints                               | Default Value   |
|----------------|--------------|-------------------------------------------|-----------------|
| `id`           | `SERIAL`     | `PRIMARY KEY`                            |                 |
| `name`         | `VARCHAR`    | `NOT NULL`                               |                 |
| `email`        | `VARCHAR`    | `UNIQUE`, `NOT NULL`                     |                 |
| `phone_number` | `VARCHAR`    | `NOT NULL`                               |                 |
| `password`     | `VARCHAR`    | `NOT NULL`                               |                 |
| `education`    | `VARCHAR`    |                                           |                 |
| `experience`   | `VARCHAR`    |                                           |                 |
| `goals`        | `VARCHAR`    |                                           |                 |
| `comments`     | `VARCHAR`    |                                           |                 |
| `operator_id`  | `INTEGER`    | `REFERENCES admins (id) ON DELETE SET NULL` |                 |
| `mentor_id`    | `INTEGER`    | `REFERENCES mentors (id) ON DELETE SET NULL` |                 |
| `status`       | `status`     |                                           | `'PENDING'`     |
| `start_date`   | `DATE`       |                                           | `CURRENT_DATE`  |
| `end_date`     | `DATE`       |                                           | `NULL`          |  

## Admins
| Column Name    | Data Type    | Constraints                               | Default Value   |
|----------------|--------------|-------------------------------------------|-----------------|
| `id`           | `SERIAL`     | `PRIMARY KEY`                            |                 |
| `name`         | `VARCHAR`    | `NOT NULL`                               |                 |
| `email`        | `VARCHAR`    | `UNIQUE`, `NOT NULL`                     |                 |
| `phone_number` | `VARCHAR`    | `NOT NULL`                               |                 |
| `password`     | `VARCHAR`    | `NOT NULL`                               |                 |
| `mentor_id`    | `INTEGER`    | `REFERENCES mentors (id) ON DELETE SET NULL` |                 |

