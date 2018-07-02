INSERT INTO helousers (first, last, google_id, img)
VALUES ($1, $2, $3, $4)
returning *;