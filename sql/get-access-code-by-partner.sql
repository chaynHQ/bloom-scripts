SELECT 
COUNT(*),
partner."name" as access_code_partner_name,
partneraccess."featureTherapy" as featureTherapy,
partneraccess."featureLiveChat" as featureLiveChat,
COUNT(partneraccess."activatedAt") as activated

from public."partner_access" partneraccess

LEFT JOIN public."partner" partner
ON partneraccess."partnerId" = partner."partnerId"
LEFT JOIN public."partner_admin" partneradmin
ON partneraccess."partnerAdminId" = partneradmin."partnerAdminId"
LEFT JOIN public."user" users
ON partneradmin."userId" = users."userId"

WHERE
NOT (users."email" LIKE '%chayn.co')
-- AND (partneraccess."createdAt" >= '2022-05-09')
-- AND  (partneraccess."createdAt" < '2022-05-09')
GROUP BY partner."name", partneraccess."featureTherapy", partneraccess."featureLiveChat";

