UPDATE helousers
SET first = $2, 
    last = $3, 
    gender = $4, 
    hair_color = $5, 
    eye_color = $6, 
    hobby =  $7, 
    bday_date = $8, 
    bday_month = $9, 
    bday_year = $10
    
WHERE id = $1