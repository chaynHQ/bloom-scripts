SELECT users."userId", email, partneraccess."accessCode" as is_partner_user, admins."userId" as is_admin from public."user" users

LEFT JOIN public."partner_access" partneraccess
ON users."userId" = partneraccess."userId"

LEFT JOIN public."partner_admin" admins
ON users."userId" = admins."userId"

-- removes all partner affiliated users 
WHERE "accessCode" IS NULL 

-- removes all admins 
AND admins."userId" IS NULL

-- removes chayn users 
AND NOT (email LIKE '%@chayn.co')