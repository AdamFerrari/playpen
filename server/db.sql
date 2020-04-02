CREATE DATABASE playpen ;

-- \c playpen

CREATE TABLE messages (
    did         SERIAL PRIMARY KEY,
    created_at  timestamp,
    user_id     varchar(256),
    content     text
);


-- Example:
-- INSERT INTO messages VALUES 
--     (DEFAULT, CURRENT_TIMESTAMP, 'adam', 'This is a test.') ;
