CREATE DATABASE playpen ;

-- \c playpen

CREATE TABLE messages (
    did         integer PRIMARY KEY,
    created_at  timestamp,
    user_id     varchar(256),
    content     text
);


-- Example:
-- INSERT INTO messages VALUES 
--     (1, CURRENT_TIMESTAMP, 'adam', 'This is the first test message.') ;
