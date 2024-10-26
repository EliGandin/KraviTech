CREATE TYPE experience AS ENUM ('LOW', 'MID', 'HIGH');
CREATE TYPE field AS ENUM ('DATA', 'HARDWARE', 'SOFTWARE', 'TEST');
CREATE TYPE role AS ENUM ('MENTOR', 'MENTI', 'ADMIN');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    phone_number VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    role role,
    experience experience,
    field field
);

CREATE TABLE mentors (
    id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    field field,
    company VARCHAR,
    position VARCHAR,
    experience experience
);

CREATE TABLE IF NOT EXISTS  mentis (
    id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    education VARCHAR,
    experience VARCHAR,
    goals VARCHAR,
    comments VARCHAR,
    mentor_id INTEGER REFERENCES mentors(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE
);

-- Inserting data
INSERT INTO users (name, email, phone_number, password, role, experience, field)
VALUES
('Amit Cohen', 'amit@test.com', '0505050050', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'MENTOR', 'MID', 'SOFTWARE'),
('Alon Levi', 'alon@test.com', '0524854877', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'MENTOR', 'HIGH', 'HARDWARE'),
('Yuval Regev', 'yuval@test.com', '0532648574', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'MENTI', 'LOW', 'DATA'),
('Dana Katz', 'dana@test.com', '0524854447', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'MENTI', 'MID', 'DATA'),
('Mor Shavit', 'mor@test.com', '0584864877', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'MENTOR', 'HIGH', 'SOFTWARE'),
('Danit Yarden', 'danit@test.com', '0524851117', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'MENTI', 'MID', 'HARDWARE'),
('Eli Gandin', 'eli@test.com', '0545544477', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'ADMIN', null, null);

INSERT INTO mentors (id, field, company, position, experience)
VALUES 
(1, 'SOFTWARE', 'TechCorp', 'Senior Developer', 'MID'),
(2, 'HARDWARE', 'Hardware Inc.', 'Lead Engineer', 'HIGH'),
(5, 'SOFTWARE', 'InnovateSoft', 'CTO', 'HIGH');

INSERT INTO mentis (id, education, experience, goals, comments, mentor_id)
VALUES 
(3, 'BSc Computer Science', '1 year', 'Learn backend development', 'Very motivated to learn', 1),
(4, 'BA Data Science', '2 years', 'Become a Data Analyst', 'I want to contribute to big data', 1),
(6, 'Diploma in Hardware Engineering', '1.5 years', 'Learn hardware design', 'Excited about hardware', 2);

INSERT INTO admins (id)
VALUES (7);