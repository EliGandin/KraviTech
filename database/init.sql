CREATE TYPE experience AS ENUM ('low', 'mid', 'high');
CREATE TYPE field AS ENUM ('data', 'hardware', 'software', 'TEST');
CREATE TYPE role AS ENUM ('mentor', 'menti', 'admin');

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

INSERT INTO users (name, email, phone_number, password, role, experience, field)
VALUES 
('Amit Cohen', 'amit@test.com', '0505050050', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'mentor', 'mid', 'software'),
('Alon Levi', 'alon@test.com', '0524854877', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'mentor', 'high', 'hardware'),
('Yuval Regev', 'yuval@test.com', '0532648574', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'menti', 'low', 'data'),
('Dana Katz', 'dana@test.com', '0524854447', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'menti', 'mid', 'data'),
('Mor Shavit', 'mor@test.com', '0584864877', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'mentor', 'high', 'software'),
('Danit Yarden', 'danit@test.com', '0524851117', '$2a$12$0B.EaJM27vxqP7kZbzdbcukfKbVaPKnfyAvggeVWMB8MT/fFEmQMG', 'menti', 'mid', 'hardware');

INSERT INTO mentors (id, field, company, position, experience)
VALUES 
(1, 'software', 'TechCorp', 'Senior Developer', 'mid'),
(2, 'hardware', 'Hardware Inc.', 'Lead Engineer', 'high'),
(5, 'software', 'InnovateSoft', 'CTO', 'high');

INSERT INTO mentis (id, education, experience, goals, comments, mentor_id)
VALUES 
(3, 'BSc Computer Science', '1 year', 'Learn backend development', 'Very motivated to learn', 1),
(4, 'BA Data Science', '2 years', 'Become a Data Analyst', 'I want to contribute to big data', 1),
(6, 'Diploma in Hardware Engineering', '1.5 years', 'Learn hardware design', 'Excited about hardware', 2);
