DROP DATABASE IF EXISTS soccer_leage

CREATE DATABASE soccer_leage

\c soccer_leage

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    team TEXT UNIQUE
    wins INT,
    losses INT
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    player_name TEXT,
    player_team_id INT REFERENCES teams(id)
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    referee_name TEXT
);

CREATE TABLE leages_date (
    id SERIAL PRIMARY KEY,
    leage_date DATE
);

CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    home_team INT REFERENCES teams(id),
    away_team INT REFERENCES teams(id),
    leage_date INT REFERENCES leages_date(id)
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    match_id INT REFERENCES matches(id),
    player_id INT REFERENCES players(id)
);

CREATE TABLE referee_matches ( 
    id SERIAL PRIMARY KEY,
    referee_id INT REFERENCES referees(id),
    match_id INT REFERENCES matches(id)
);



INSERT INTO teams (team, wins, losses) VALUES
    ('Real Madrid', 25, 5),
    ('FC Barcelona', 20, 8),
    ('Manchester United', 18, 10),
    ('Bayern Munich', 22, 6);

INSERT INTO players (player_name, player_team_id) VALUES
    ('Karim Benzema', 1),
    ('Luka Modric', 1),
    ('Sergio Ramos', 1),
    ('Vinicius Junior', 1),
    ('Casemiro', 1),
    ('Ferland Mendy', 1),
    
    ('Lionel Messi', 2),
    ('Antoine Griezmann', 2),
    ('Gerard Piqué', 2),
    ('Frenkie de Jong', 2),
    ('Sergi Roberto', 2),
    ('Ansu Fati', 2),
    
    ('Bruno Fernandes', 3),
    ('Harry Maguire', 3),
    ('Marcus Rashford', 3),
    ('Paul Pogba', 3),
    ('Mason Greenwood', 3),
    ('Edinson Cavani', 3),
    
    ('Robert Lewandowski', 4),
    ('Thomas Müller', 4),
    ('Joshua Kimmich', 4),
    ('Manuel Neuer', 4),
    ('Leroy Sané', 4),
    ('Alphonso Davies', 4);

INSERT INTO referees (referee_name) VALUES
    ('Felix Zwayer'),
    ('Sergei Karasev'),
    
    ('Artur Soares Dias'),
    ('William Collum'),
    
    ('Clement Turpin'),
    ('Istvan Kovacs'),
    
    ('Carlos Del Cerro Grande'),
    ('Pavel Kralovec');

INSERT INTO leages_date (leage_date) VALUES
    ('2022-01-01'),
    ('2021-01-01'),
    ('2020-01-01'),
    ('2019-01-01');

INSERT INTO matches (home_team, away_team, leage_date) VALUES
    (1, 2, 1),
    (3, 4, 1),
    (2, 1, 2),
    (4, 3, 2),
    (1, 3, 3),
    (2, 4, 3),
    (3, 1, 4),
    (4, 2, 4),
    (1, 4, 1),
    (2, 3, 1),
    (3, 2, 2),
    (4, 1, 2);

INSERT INTO goals (match_id, player_id)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (2, 4),
    (3, 5),
    (3, 6),
    (4, 7),
    (4, 8),
    (5, 9),
    (5, 10),
    (6, 11),
    (6, 12),
    (7, 13),
    (7, 14),
    (8, 15),
    (8, 16),
    (9, 17),
    (9, 18),
    (10, 19),
    (10, 20),
    (11, 21),
    (11, 22),
    (12, 23),
    (12, 24);