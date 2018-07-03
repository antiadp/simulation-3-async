SELECT * 
FROM helousers 
WHERE lower(first) LIKE lower($2);