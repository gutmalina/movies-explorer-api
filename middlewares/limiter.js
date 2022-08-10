const rateLimit = require('express-rate-limit');

/** установка лимита на количестко запросов с одного IP, 15мин 100 запросов */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = limiter;
