SELECT * FROM helousers
WHERE id != $1 AND id NOT IN (
	SELECT otheruserid FROM helofriendship
	WHERE loggeduser = $1 
);
