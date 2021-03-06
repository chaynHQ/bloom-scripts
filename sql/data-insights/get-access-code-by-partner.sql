-- Use this to find the number of access codes given 
-- and the number that have been activated
SELECT 
COUNT(*),
partner."name" as access_code_partner_name,
partneraccess."featureTherapy" as featureTherapy,
partneraccess."featureLiveChat" as featureLiveChat

from public."partner_access" partneraccess

LEFT JOIN public."partner" partner
ON partneraccess."partnerId" = partner."partnerId"
LEFT JOIN public."partner_admin" partneradmin
ON partneraccess."partnerAdminId" = partneradmin."partnerAdminId"
LEFT JOIN public."user" users
ON partneradmin."userId" = users."userId"

WHERE
NOT (users."email" LIKE '%chayn.co')
-- Use if you want to see when the code was created 
-- AND (partneraccess."createdAt" >= '2022-06-13')
-- AND  (partneraccess."createdAt" < '2022-06-20')
-- If you want to get  the code  activated during a period
AND (partneraccess."activatedAt" >= '2022-06-13')
AND  (partneraccess."activatedAt" < '2022-06-20')
GROUP BY partner."name", partneraccess."featureTherapy", partneraccess."featureLiveChat";
