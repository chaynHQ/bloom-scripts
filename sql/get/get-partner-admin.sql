-- This script checks if a user with a particular email exists as a partner admin

SELECT users."email", partner."name" as partner, users."userId" as user_id, admins."partnerAdminId" partner_admin_id, 
FROM public."partner_admin" admins

LEFT JOIN public."user" users 
ON admins."userId" = users."userId"

LEFT JOIN public."partner" partner
ON admins."partnerId" = partner."partnerId"

WHERE users."email" LIKE lower('<insert email here>');