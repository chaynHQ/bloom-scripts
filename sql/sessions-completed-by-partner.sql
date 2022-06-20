-- Use this to find out number of sessions started and completed
SELECT COUNT(*),
	partner."name" as access_code_partner_name

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
-- AND (sessionuser."createdAt" >= '2022-05-09')
-- AND (sessionuser."createdAt" < '2022-05-09')
-- If you want to look at number completed during this period
AND (sessionuser."completedAt" >= '2022-05-09')
AND (sessionuser."completedAt" < '2022-05-09')

GROUP BY partner."name";



