INSERT INTO helofriendship
(loggeduser, otheruserid)
VALUES ($1, $2)
RETURNING *;