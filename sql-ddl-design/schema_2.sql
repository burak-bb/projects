DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist;

CREATE TABLE regions (
    id SERIAL PRIMARY KEY,
    region_name TEXT UNIQUE,
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name TEXT VARCHAR(25) UNIQUE,
    preferred_region_id INT REFERENCES regions(id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category TEXT UNIQUE
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    post_text TEXT,
    post_user_id INT REFERENCES users(id),
    post_region_id INT REFERENCES regions(id),
    post_category_id INT REFERENCES categories(id)
);



INSERT INTO regions (region_name) VALUES
    ('New York'),
    ('Los Angeles'),
    ('Chicago'),
    ('Houston'),
    ('Phoenix'),
    ('Philadelphia'),
    ('San Antonio');

INSERT INTO users (user_name, preferred_region_id) VALUES
    ('JohnDoe', 1),
    ('AliceSmith', 2),
    ('BobJohnson', 3),
    ('EvaWilliams', 4),
    ('MichaelBrown', 5),
    ('SophiaLee', 6),
    ('DavidMiller', 7);

-- Categories table
INSERT INTO categories (category) VALUES
    ('Technology'),
    ('Science'),
    ('Travel'),
    ('Food'),
    ('Sports'),
    ('Music'),
    ('Fashion');

-- Posts table
INSERT INTO posts (title, post_text, post_user_id, post_region_id, post_category_id) VALUES
    ('First Post', 'This is the first post.', 1, 1, 1),
    ('Travel Adventure', 'Exploring new places is always exciting!', 3, 3, 3),
    ('Tech News', 'Latest developments in technology.', 5, 5, 1),
    ('Delicious Recipes', 'Sharing my favorite recipes with you.', 2, 2, 4),
    ('Science Discoveries', 'Fascinating scientific breakthroughs.', 4, 4, 2),
    ('Sports Update', 'Recap of recent sports events.', 6, 6, 5),
    ('Fashion Trends', 'Stay stylish with the latest fashion trends.', 7, 7, 7);
