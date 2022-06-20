-- Use this query to get the most started session
SELECT COUNT(*),
	partner."name" as access_code_partner_name,
	sessions."name" as session_name

from public."session_user" sessionuser
	LEFT JOIN public."session" sessions
		ON sessions."sessionId" = sessionuser."sessionId"
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
-- where clause to isolate when the session was created 
AND (sessionuser."createdAt" >= '2022-06-13')
AND (sessionuser."createdAt" < '2022-06-20')
GROUP BY partner."name", sessions."name"
ORDER BY count;

