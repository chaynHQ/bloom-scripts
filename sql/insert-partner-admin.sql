
WITH admin_constants (email_address, full_name, fid) as (
	SELECT lower('email') as email_address, 'name' as full_name, 'id' as fid
)

INSERT INTO public."user"(
	 "firebaseUid", name, email, "contactPermission", "isSuperAdmin", "isActive")
	VALUES ((SELECT fid FROM admin_constants), (SELECT full_name FROM admin_constants), (SELECT email_address FROM admin_constants), 'false', 'false', 'true');
	
WITH admin_constants (email_address, full_name, fid) as (
	SELECT lower('email') as email_address, 'name' as full_name, 'id' as fid
)

INSERT INTO public.partner_admin(
	"userId", "partnerId")
	VALUES ((SELECT "userId" FROM public."user" WHERE public."user".email LIKE (SELECT email_address FROM admin_constants)), (SELECT "partnerId" FROM public.partner WHERE "name" LIKE 'Bumble' ));
