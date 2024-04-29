const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (req?.permission_level === null || req?.permission_level === undefined) 
            return res.sendStatus(401);
        let result
        if( allowedRoles.length > 1 )
            result = allowedRoles.includes(req.permission_level)
        else if (allowedRoles.length === 1)
            result = allowedRoles[0] <= req.permission_level

        if (!result) return  res.status(400).json({ message: 'Can\'t access the database table.' });
        next();
    }
}

module.exports = verifyRoles