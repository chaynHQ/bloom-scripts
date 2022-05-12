SELECT COUNT(*),
	partner."name" as access_code_partner_name,
	sessionuser."completed" as session_completed

from public."session_user" sessionuser
	LEFT JOIN public."course_user" courseuser
		ON sessionuser."courseUserId" = courseuser."courseUserId"
	LEFT JOIN public."partner_access" partneraccess
		ON courseuser."userId" = partneraccess."userId"
	LEFT JOIN public."user" users
		ON users."userId" = courseuser."userId"
	LEFT JOIN public."partner" partner
		ON partneraccess."partnerId" = partner."partnerId"
WHERE -- removes chayn users 
NOT (users."email" LIKE '%chayn.co')
AND NOT (users."email" LIKE '%team.bumble.com')
-- AND (courseuser."createdAt" >= '2022-05-09')
-- AND (courseuser."createdAt" < '2022-05-09')
GROUP BY partner."name", sessionuser."completed";



