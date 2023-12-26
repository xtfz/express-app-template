const rateLimit = require('express-rate-limit');

const createLimiter = (requests, time) => {
    return rateLimit({
        limit: requests,
        windowMs: time,
        message: {
            success: false,
            message: 'You are being rate-limited.',
            code: 429
        },
        standardHeaders: true,
        legacyHeaders: false,
        skipFailedRequests: false
    });
}

module.exports = createLimiter;