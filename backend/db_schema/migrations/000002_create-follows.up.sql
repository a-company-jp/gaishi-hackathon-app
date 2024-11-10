CREATE TABLE "follows" (
   follower_id VARCHAR(255) NOT NULL,
   followee_id VARCHAR(255) NOT NULL,
   followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (follower_id, followee_id),
   FOREIGN KEY (follower_id) REFERENCES "users" (id) ON DELETE CASCADE,
   FOREIGN KEY (followee_id) REFERENCES "users" (id) ON DELETE CASCADE
);
