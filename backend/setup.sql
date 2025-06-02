-- ./backend/setup.sql
-- A simple setup to create the database used in the ciberistas app

-- Creates the db 'ciberistas'
CREATE DATABASE IF NOT EXISTS ciberistas
    CHARACTER SET utf8mb4;

-- Changes the view to use the new database
USE ciberistas;

-- Creates tables
CREATE TABLE IF NOT EXISTS dates (
    -- A table to store all dates, used by workshop
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE
);

CREATE TABLE IF NOT EXISTS workshops (
    -- Defines the main values for the workshop table
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT,
    name VARCHAR(255),
    format VARCHAR(255),
    date_id INT,
    start_time TIME,
    end_time TIME,
    capacity INT,
    current INT,
    teached_by VARCHAR(255),
    description TEXT,
    ages VARCHAR(255),
    requisites TEXT,
    objective TEXT,
    gender VARCHAR(255),
    location VARCHAR(255),
    available BOOLEAN,

    -- Defines the foreign keys used in the previous values
    FOREIGN KEY (date_id) REFERENCES dates(id)
);
