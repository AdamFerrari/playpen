CREATE DATABASE playpen ;

-- \c playpen

CREATE TABLE messages (
    did         SERIAL PRIMARY KEY,
    created_at  timestamp,
    user_id     integer,
    content     text
);

CREATE TABLE users (
    did         SERIAL PRIMARY KEY,
    name        varchar(80),
    token       text
);


-- Example:
-- INSERT INTO users VALUES 
--     (DEFAULT, 'adam', NULL);
-- INSERT INTO messages VALUES 
--     (DEFAULT, CURRENT_TIMESTAMP, 1, 'This is a test.') ;
