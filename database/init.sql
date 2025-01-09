CREATE TYPE experience AS ENUM ('LOW', 'MID', 'HIGH');
CREATE TYPE field AS ENUM ('DATA', 'HARDWARE', 'SOFTWARE');
CREATE TYPE role AS ENUM ('MENTOR', 'MENTI', 'ADMIN');
CREATE TYPE mentor_status AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');
CREATE TYPE menti_status AS ENUM ('PENDING', 'PREPRODUCTION', 'ACTIVE', 'INACTIVE', 'SUCCESS');
CREATE TYPE message_status AS ENUM ('OPEN', 'CLOSED');
CREATE TYPE task_status AS ENUM ('NEW', 'IN PROGRESS', 'COMPLETED');

CREATE TABLE IF NOT EXISTS mentors
(
    id           SERIAL PRIMARY KEY,
    name         VARCHAR        NOT NULL,
    email        VARCHAR UNIQUE NOT NULL,
    phone_number VARCHAR        NOT NULL,
    password     VARCHAR        NOT NULL,
    field        field,
    company      VARCHAR,
    position     VARCHAR,
    experience   experience,
    status       mentor_status DEFAULT 'PENDING',
    start_date   DATE          DEFAULT CURRENT_DATE,
    end_date     DATE          DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS admins
(
    id           SERIAL PRIMARY KEY,
    name         VARCHAR        NOT NULL,
    email        VARCHAR UNIQUE NOT NULL,
    phone_number VARCHAR        NOT NULL,
    password     VARCHAR        NOT NULL,
    mentor_id    INTEGER        REFERENCES mentors (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS mentis
(
    id           SERIAL PRIMARY KEY,
    name         VARCHAR        NOT NULL,
    email        VARCHAR UNIQUE NOT NULL,
    phone_number VARCHAR        NOT NULL,
    password     VARCHAR        NOT NULL,
    education    VARCHAR,
    experience   VARCHAR,
    goals        VARCHAR,
    comments     VARCHAR,
    operator_id  INTEGER        REFERENCES admins (id) ON DELETE SET NULL,
    mentor_id    INTEGER        REFERENCES mentors (id) ON DELETE SET NULL,
    status       menti_status DEFAULT 'PENDING',
    start_date   DATE         DEFAULT CURRENT_DATE,
    end_date     DATE         DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS messages
(
    id           SERIAL PRIMARY KEY,
    name         VARCHAR NOT NULL,
    email        VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    title        VARCHAR,
    message      VARCHAR NOT NULL,
    status       message_status DEFAULT 'OPEN',
    date         DATE           DEFAULT CURRENT_DATE,
    operator_id  INTEGER REFERENCES admins (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS tasks
(
    id               SERIAL PRIMARY KEY,
    title            VARCHAR NOT NULL,
    description      VARCHAR NOT NULL,
    status           task_status DEFAULT 'NEW',
    created_date     DATE        DEFAULT CURRENT_DATE,
    in_progress_date DATE        DEFAULT NULL,
    completed_date   DATE        DEFAULT NULL,
    menti_id         INTEGER REFERENCES mentis (id) ON DELETE SET NULL,
    mentor_id        INTEGER REFERENCES mentors (id) ON DELETE SET NULL,
    sub_tasks        JSONB       DEFAULT '[]'
);

INSERT INTO mentors (name, email, phone_number, password, field, company, position, experience, status, start_date,
                     end_date)
VALUES ('Amit Cohen', 'amit@test.com', '0505050050', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG',
        'SOFTWARE', 'TechCorp', 'Senior Developer', 'MID', 'ACTIVE', '2021-01-01', null),
       ('Alon Levi', 'alon@test.com', '0524854877', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG',
        'HARDWARE', 'Hardware Inc.', 'Lead Engineer', 'HIGH', 'ACTIVE', '2021-01-01', null),
       ('Mor Shavit', 'mor@test.com', '0584864877', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG',
        'SOFTWARE', 'InnovateSoft', 'CTO', 'HIGH', 'ACTIVE', '2021-01-01', null);

INSERT INTO admins (name, email, phone_number, password, mentor_id)
VALUES ('Eli Gandin', 'eli@test.com', '0545544477', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG',
        null),
       ('Fiona Green', 'fiona.green@example.com', '0553334444',
        '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', null),
       ('George Harris', 'george.harris@example.com', '0555556666',
        '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', null);

INSERT INTO mentis (name, email, phone_number, password, education, experience, goals, comments, operator_id, mentor_id,
                    status, start_date, end_date)
VALUES ('Yuval Regev', 'yuval@test.com', '0532648574', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG',
        'BSc Computer Science', 'LOW', 'Learn backend development', 'Very motivated to learn', 1, 1, 'ACTIVE',
        '2021-01-01', null),
       ('Dana Katz', 'dana@test.com', '0524854447', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG',
        'BA Data Science', 'MID', 'Become a Data Analyst', 'I want to contribute to big data', 2, 1, 'ACTIVE',
        '2021-01-01', null),
       ('Diana Evans', 'diana@test.com', '0556543210', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG',
        'Diploma in Hardware Engineering', 'LOW', 'Learn hardware design', 'Excited about hardware', NULL, 2, 'PENDING',
        '2021-01-01', null),
       ('Avi Rosen', 'avi@test.com', '0556543210', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG',
        'Diploma in Hardware Engineering', 'LOW', 'Learn hardware design', 'Excited about hardware', NULL, 2, 'SUCCESS',
        '2021-01-01', '2021-02-01');

INSERT INTO messages (name, email, phone_number, title, message, status, operator_id)
VALUES ('John Doe', 'john@test.com', '0501234567', 'help', 'I have a question', 'OPEN', 1),
       ('Jane Doe', 'jane@test.com', '0501234567', 'question', 'I have a question', 'OPEN', 1);

INSERT INTO tasks (title, description, status, created_date, in_progress_date, completed_date, menti_id, mentor_id,
                   sub_tasks)
VALUES ('Learn Python', 'Learn Python basics', 'NEW', '2021-01-01', null, null, 1, 1, '[
  {
    "id": "1_1",
    "title": "Install Python",
    "description": "Install Python on your computer",
    "status": "NEW",
    "created_date": "2021-01-01",
    "in_progress_date": null,
    "completed_date": null
  },
  {
    "id": "1_2",
    "title": "Learn Python syntax",
    "description": "Learn the basic syntax of Python",
    "status": "NEW",
    "created_date": "2021-01-01",
    "in_progress_date": null,
    "completed_date": null
  }
]'),
       ('Learn SQL', 'Learn SQL basics', 'NEW', '2021-01-01', null, null, 2, 1, '[
         {
           "id": "2_1",
           "title": "Install MySQL",
           "description": "Install MySQL on your computer",
           "status": "NEW",
           "created_date": "2021-01-01",
           "in_progress_date": null,
           "completed_date": null
         },
         {
           "title": "Learn SQL syntax",
           "description": "Learn the basic syntax of SQL",
           "status": "NEW",
           "created_date": "2021-01-01",
           "in_progress_date": null,
           "completed_date": null
         }
       ]')