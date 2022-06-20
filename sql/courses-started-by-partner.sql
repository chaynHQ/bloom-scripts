SELECT 
	COUNT(*),
	partner."name" as access_code_partner_name,
	course."name" as course_name

from public."course_user" courseuser
	LEFT JOIN public."course" course
		ON courseuser."courseId" = course."courseId"
	LEFT JOIN public."partner_access" partneraccess
		ON courseuser."userId" = partneraccess."userId"
	LEFT JOIN public."user" users
		ON users."userId" = courseuser."userId"
	LEFT JOIN public."partner" partner
		ON partneraccess."partnerId" = partner."partnerId"

WHERE
-- removes chayn users 
NOT (users."email" LIKE '%chayn.co')
AND NOT (users."email" LIKE '%team.bumble.com')
-- where clause to isolate when the course user was made
AND (courseuser."createdAt" >= '2022-05-02')
AND (courseuser."createdAt" < '2022-05-09')


GROUP BY partner."name", course."name";