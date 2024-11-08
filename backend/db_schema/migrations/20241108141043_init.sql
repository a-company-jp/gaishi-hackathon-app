-- migrate:up
CREATE TABLE "users" (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "follows" (
   follower_id VARCHAR(255) NOT NULL,
   followee_id VARCHAR(255) NOT NULL,
   followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (follower_id, followee_id),
   FOREIGN KEY (follower_id) REFERENCES "users" (id) ON DELETE CASCADE,
   FOREIGN KEY (followee_id) REFERENCES "users" (id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE IF EXISTS "follows";
DROP TABLE IF EXISTS "users";