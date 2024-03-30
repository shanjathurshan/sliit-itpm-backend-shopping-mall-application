const permissions = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.roles || !req.roles.some(role => allowedRoles.includes(role))) {
            return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }
        next();
    };
};

module.exports = permissions;