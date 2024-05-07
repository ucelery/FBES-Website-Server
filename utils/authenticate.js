const authenticate = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    // Check if API key is provided
    if (!apiKey || apiKey !== process.env.FBES_TOKEN) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};

module.exports = { authenticate };