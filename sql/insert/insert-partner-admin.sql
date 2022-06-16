-- This script will convert an existing user into a partner admin. 

-- Add partner admin (transaction)

BEGIN TRANSACTION;
WITH admin_constants (email_address, partner) as (
	SELECT lower('xxx@team.bumble.com') as email_address, 'Bumble' as partner
)

INSERT INTO public.partner_admin(
	"userId", "partnerId")
	VALUES ((SELECT "userId" FROM public."user" WHERE public."user".email LIKE (SELECT email_address FROM admin_constants)), (SELECT "partnerId" FROM public.partner WHERE "name" LIKE (SELECT partner FROM admin_constants) ));

-- Add partner admin (commit)
-- COMMIT;