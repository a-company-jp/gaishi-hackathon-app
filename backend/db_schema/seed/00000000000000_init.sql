-- migrate:up
INSERT INTO "users" (id, username, email, password) VALUES
    ('1', 'user1', 'user1@example.com', 'password1'),
    ('2', 'user2', 'user2@example.com', 'password2'),
    ('3', 'user3', 'user3@example.com', 'password3'),
    ('4', 'user4', 'user4@example.com', 'password4');

INSERT INTO "follows" (follower_id, followee_id) VALUES
    ('1', '2'),
    ('1', '3'),
    ('2', '3'),
    ('3', '4');
-- migrate:down
DELETE FROM "follows" WHERE follower_id IN ('1', '2', '3') AND followee_id IN ('2', '3', '4');
DELETE FROM "users" WHERE id IN ('1', '2', '3', '4');