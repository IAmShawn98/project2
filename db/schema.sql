CREATE DATABASE timesheet_db;

USE timesheet_db;

CREATE TABLE employees (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    team_member VARCHAR (100) NOT NULL,
    title VARCHAR (200),
    tier_level VARCHAR (30),
    hours_used INT (10),
    hours_remaining INT (10),
    start_date DATE,
    end_date DATE,
    admin BOOLEAN DEFAULT false
    );
    
CREATE TABLE login (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    team_member VARCHAR (100) NOT NULL,
    login VARCHAR (100) NOT NULL,
    password VARCHAR (100) NOT NULL
    );
    
CREATE TABLE tiers (
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    blue INT (10),
    green INT (10),
    purple INT (10)
    );
       