// Generic validation middleware function
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
};

module.exports = {
    validateRequest
}