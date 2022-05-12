BEGIN TRANSACTION;
UPDATE
    public."partner_access" partneraccess
SET 
     "therapySessionsRemaining" = 9
FROM public."user" users
WHERE
    users."userId" = partneraccess."userId"
    AND users."email" = 'ellie@chayn.co';

-- COMMIT TRANSACTION;