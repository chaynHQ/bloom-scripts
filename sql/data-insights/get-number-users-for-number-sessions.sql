SELECT
    count(*), 
    numbersessionscompleted,
    bloompartner
FROM
    (
        SELECT
            users."userId",
            partners."name" AS bloompartner,
            count(sessionuser."sessionId") AS numbersessionscompleted
        FROM public."user" users
        LEFT JOIN public."course_user" courseuser
            ON users."userId" = courseuser."userId"
        LEFT JOIN public."session_user" sessionuser
            ON sessionuser."courseUserId" = courseuser."courseUserId"
        LEFT JOIN public."partner_access" partneraccess
            ON partneraccess."userId" = users."userId"
        LEFT JOIN public."partner" partners
            ON partneraccess."partnerId" = partners."partnerId"
        WHERE -- removes chayn users 
        NOT (users."email" LIKE '%chayn.co')
        AND NOT (users."email" LIKE '%team.bumble.com')
        GROUP BY users."userId", partners."name"
    ) AS users_with_sessions_completed
GROUP BY numbersessionscompleted, bloompartner
ORDER BY numbersessionscompleted DESC
