-- Step one: Add user (transaction)
BEGIN TRANSACTION;

WITH admin_constants (email_address, full_name, fid) as (
	SELECT lower('<email here>') as email_address, '<full name here>' as full_name, '<firebase ID here>' as fid
)

INSERT INTO public."user"(
	 "firebaseUid", name, email, "contactPermission", "isSuperAdmin", "isActive")
	VALUES ((SELECT fid FROM admin_constants), (SELECT full_name FROM admin_constants), (SELECT email_address FROM admin_constants), 'false', 'false', 'true');
	
-- COMMIT;

-- Step two: Convert to partner admin (transaction)
BEGIN TRANSACTION;

WITH admin_constants (email_address, full_name, fid, partner) as (
	SELECT lower('email') as email_address, 'name' as full_name, 'id' as fid, 'partner' as partner
)

INSERT INTO public.partner_admin(
	"userId", "partnerId")
	VALUES ((SELECT "userId" FROM public."user" WHERE public."user".email LIKE (SELECT email_address FROM admin_constants)), (SELECT "partnerId" FROM public.partner WHERE "name" LIKE (SELECT partner FROM admin_constants) ));

-- COMMIT;
