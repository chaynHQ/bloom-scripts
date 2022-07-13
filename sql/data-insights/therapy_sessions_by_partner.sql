SELECT
	COUNT(*),
	partner."name" as partner_name
FROM public."therapy_session" therapy
LEFT JOIN public."partner_access" partneraccess
ON therapy."partnerAccessId" = partneraccess."partnerAccessId"
LEFT JOIN public."partner" partner
ON partneraccess."partnerId" = partner."partnerId"
WHERE
NOT(therapy."action" = 'CANCELLED_BOOKING')
AND (therapy."createdAt" >= '2022-05-09')
-- AND (therapy."createdAt" < '2022-05-09')

GROUP BY partner."name"; 
