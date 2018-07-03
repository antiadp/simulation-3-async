SELECT * 
FROM helousers 
WHERE lower(LAST) LIKE lower($2);