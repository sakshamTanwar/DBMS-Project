CREATE DATABASE IF NOT EXISTS DBMS_PROJECT;
USE DBMS_PROJECT;

-- Create a new table called 'Institute' in schema 'DBMS_PROJECT'
CREATE TABLE IF NOT EXISTS DBMS_PROJECT.Institute
(
    InstituteId INT NOT NULL PRIMARY KEY, -- primary key column
    Name VARCHAR(255) NOT NULL UNIQUE,
    EstablishedYear INT NOT NULL
);


-- Create a new table called 'Student' in schema 'DBMS_PROJECT'
CREATE TABLE IF NOT EXISTS DBMS_PROJECT.Student
(
    RollNumber INT NOT NULL PRIMARY KEY, -- primary key column
    Name VARCHAR(255) NOT NULL,
    Rank INT NOT NULL UNIQUE,
    Marks DECIMAL(5,2) NOT NULL
);

-- Create a new table called 'Student User' for implementing Student Login/Logout
CREATE TABLE IF NOT EXISTS DBMS_PROJECT.StudentUser
(
    RollNumber INT NOT NULL UNIQUE,
    Email VARCHAR(256) PRIMARY KEY,
    Password VARCHAR(256),
    FOREIGN KEY(RollNumber) REFERENCES DBMS_PROJECT.Student(RollNumber)
);


-- Create a new table called 'Program' in schema 'DBMS_PROJECT'
CREATE TABLE IF NOT EXISTS DBMS_PROJECT.Program
(
    Name VARCHAR(255) NOT NULL,
    TotalSeats INT NOT NULL,
    SeatsLeft INT NOT NULL,
    InstituteId INT NOT NULL,
    FOREIGN KEY (InstituteId) REFERENCES DBMS_PROJECT.Institute(InstituteId),
    PRIMARY KEY (InstituteId, Name)
);


-- Create a new table called 'ProgramChosen' in schema 'DBMS_PROJECT'
CREATE TABLE  IF NOT EXISTS DBMS_PROJECT.ProgramChosen
(
  StudentRollNumber INT NOT NULL,
  FOREIGN KEY (StudentRollNumber) REFERENCES DBMS_PROJECT.Student(RollNumber),
  InstituteId INT NOT NULL,
  ProgramName VARCHAR(255) NOT NULL,
  FOREIGN KEY (InstituteId, ProgramName) REFERENCES DBMS_PROJECT.Program(InstituteId, Name),
  Priority INT NOT NULL,
  PRIMARY KEY (StudentRollNumber, InstituteId, ProgramName, Priority)
);
