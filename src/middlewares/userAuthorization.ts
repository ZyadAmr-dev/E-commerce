export const checkCustomerRole = (req, res, next) => {
    if (req.user && req.user.role === 'customer') {
        return next();
    }
    
    return res.status(403).json({ message: "Access denied. Admins only." });
};
