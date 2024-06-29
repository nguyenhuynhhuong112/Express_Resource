use demo_resource
select * from users
SELECT roles.name
FROM   roles INNER JOIN
             userRoles ON roles.id = userRoles.roleId INNER JOIN
             users ON userRoles.userId = users.id
			 where userId = 7
select * from userRoles
select * from users 
delete  from userRoles where userId = 2