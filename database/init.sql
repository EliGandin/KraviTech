CREATE TYPE experience AS ENUM ('LOW', 'MID', 'HIGH');
CREATE TYPE field AS ENUM ('DATA', 'HARDWARE', 'SOFTWARE', 'TEST');
CREATE TYPE role AS ENUM ('MENTOR', 'MENTI', 'ADMIN');

CREATE TABLE IF NOT EXISTS mentors (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    phone_number VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    field field,
    company VARCHAR,
    position VARCHAR,
    experience experience
);

CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    phone_number VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    mentor_id INTEGER REFERENCES mentors(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS mentis (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    phone_number VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    education VARCHAR,
    experience VARCHAR,
    goals VARCHAR,
    comments VARCHAR,
    operator_id INTEGER REFERENCES admins(id) ON DELETE SET NULL,
    mentor_id INTEGER REFERENCES mentors(id) ON DELETE SET NULL
);

-- Inserting data into the mentors table
INSERT INTO mentors (name, email, phone_number, password, field, company, position, experience)
VALUES
('Amit Cohen', 'amit@test.com', '0505050050', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'SOFTWARE', 'TechCorp', 'Senior Developer', 'MID'),
('Alon Levi', 'alon@test.com', '0524854877', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'HARDWARE', 'Hardware Inc.', 'Lead Engineer', 'HIGH'),
('Mor Shavit', 'mor@test.com', '0584864877', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'SOFTWARE', 'InnovateSoft', 'CTO', 'HIGH');

-- Inserting data into the mentis table
INSERT INTO mentis (name, email, phone_number, password, education, experience, goals, comments, operator_id, mentor_id)
VALUES
('Yuval Regev', 'yuval@test.com', '0532648574', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'BSc Computer Science', 'LOW', 'Learn backend development', 'Very motivated to learn', NULL, 1),
('Dana Katz', 'dana@test.com', '0524854447', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'BA Data Science', 'MID', 'Become a Data Analyst', 'I want to contribute to big data', NULL, 1),
('Diana Evans', 'diana@test.com', '0556543210', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'Diploma in Hardware Engineering', 'LOW', 'Learn hardware design', 'Excited about hardware', NULL, 2);

-- Inserting data into the admins table
INSERT INTO admins (name, email, phone_number, password, mentor_id)
VALUES
('Eli Gandin', 'eli@test.com', '0545544477', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG',null),
('Fiona Green', 'fiona.green@example.com', '0553334444', 'securepassword8',null),
('George Harris', 'george.harris@example.com', '0555556666', 'securepassword9',null);