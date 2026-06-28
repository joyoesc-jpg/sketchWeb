DROP DATABASE IF EXISTS sketchWeb_db;

CREATE DATABASE sketchWeb_db;

USE sketchWeb_db;

CREATE TABLE IF NOT EXISTS user(
    ID INTEGER AUTO_INCREMENT, 
    userName VARCHAR(15), 
    email VARCHAR(30), 
    password VARCHAR(20), 
    PRIMARY KEY(ID)
);

CREATE TABLE IF NOT EXISTS project(
    ID INTEGER AUTO_INCREMENT, 
    projectName VARCHAR(15), 
    fileName VARCHAR(30), 
    user_ID INTEGER,
    PRIMARY KEY(ID),
    FOREIGN KEY(user_ID) REFERENCES user(ID)
);

INSERT INTO user (userName, email, password) VALUES
('admin','admin@example','1234');

INSERT INTO project (id, projectname, filename, user_ID) VALUES
(20, "test", "/00021-2026-5-26", 1),
(23, "test2", "/00023-2026-5-26", 1),
(25, "test3", "/00025-2026-5-27", 1);