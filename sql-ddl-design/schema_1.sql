DROP DATEBASE IF EXISTs medical_center;

CREATE DATABASE medical_center;

\c medical_center;

CREATE TABLE doctors (
    id SERIAL PRIMARY KEY, 
    first_name TEXT, 
    last_name TEXT
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE diagnoses (
    id SERIAL PRIMARY KEY, 
    patient_id INT REFERENCES patients(id), 
    diagnose TEXT
);

CREATE TABLE visits (
    id SERIAL PRIMARY KEY, 
    doctor_id INT REFERENCES doctors(id), 
    patient_id INT REFERENCES patients(id))





INSERT INTO doctors (first_name, last_name) VALUES
('John', 'Doe'),
('Alice', 'Smith'),
('Bob', 'Johnson'),
('Eva', 'White'),
('Tom', 'Brown'),
('Grace', 'Taylor'),
('Daniel', 'Clark'),
('Olivia', 'Jones'),
('Michael', 'Williams'),
('Sophia', 'Martin');

INSERT INTO patients (first_name, last_name) VALUES
('Emily', 'Williams'),
('Michael', 'Jones'),
('Sophia', 'Miller'),
('James', 'Anderson'),
('Emma', 'Moore'),
('Caleb', 'Walker'),
('Mia', 'Scott'),
('Logan', 'Hill'),
('Lily', 'Ward'),
('Noah', 'Barnes');

INSERT INTO diagnoses (patient_id, diagnose) VALUES
(1, 'Common Cold'),
(1, 'Allergies'),
(2, 'Flu'),
(2, 'Sinus Infection'),
(3, 'Bronchitis'),
(3, 'Migraine'),
(4, 'Hypertension'),
(4, 'Gastritis'),
(5, 'Stomach Flu'),
(5, 'Pneumonia'),
(6, 'Allergies'),
(6, 'Sinus Infection'),
(7, 'Common Cold'),
(7, 'Bronchitis'),
(8, 'Migraine'),
(8, 'Hypertension'),
(9, 'Gastritis'),
(9, 'Stomach Flu'),
(10, 'Pneumonia'),
(10, 'Flu');

INSERT INTO visits (doctor_id, patient_id) VALUES
(1, 2),
(1, 4),
(2, 6),
(2, 8),
(3, 10),
(3, 1),
(4, 3),
(4, 5),
(5, 7),
(5, 9),
(6, 1),
(6, 3),
(7, 5),
(7, 7),
(8, 9),
(8, 2),
(9, 4),
(9, 6),
(10, 8),
(10, 10);