DELETE FROM helofriendship
WHERE loggeduser = $1 AND otheruserid = $2
RETURNING *;