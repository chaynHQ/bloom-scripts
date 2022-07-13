SELECT users."userId", email, partneraccess."accessCode" as is_partner_user, admins."userId" as is_admin from public."user" users

LEFT JOIN public."partner_access" partneraccess
ON users."userId" = partneraccess."userId"

LEFT JOIN public."partner_admin" admins
ON users."userId" = admins."userId"

-- removes all partner affiliated users 
WHERE "accessCode" IS NULL 

-- removes all admins 
AND admins."userId" IS NULL

-- where clause to isolate when the user was made
AND users."createdAt" >= '2022-06-13'
AND users."createdAt" < '2022-06-20'


-- removes chayn users 
AND NOT (email LIKE '%@chayn.co')