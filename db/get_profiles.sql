SELECT helousers.id, helousers.first, helousers.last, helousers.img, helofriendship.user_id, helofriendship.friend_id
FROM helousers
    FULL JOIN helofriendship 
    ON helousers.id = helofriendship.otheruserid
    WHERE helousers.id != $1