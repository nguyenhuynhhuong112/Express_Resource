
SELECT users.*, roles.name
FROM   roles INNER JOIN
             userRoles ON roles.id = userRoles.roleId INNER JOIN
             users ON userRoles.userId = users.id
			 where userId = 7