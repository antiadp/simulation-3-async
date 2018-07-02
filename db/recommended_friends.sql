SELECT * FROM helousers
WHERE id != ($1) AND id NOT IN (
	SELECT otheruserid 
	from helofriendship 
	WHERE otheruserid != ($1) OR loggeduser != ($1))
