const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const { SECRET, MESSAGE_ERROR_UNAUTHORIZED } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

/** авторизация */
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(MESSAGE_ERROR_UNAUTHORIZED));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : SECRET,
      { expiresIn: '7d' },
    );
  } catch (err) {
    next(new UnauthorizedError(MESSAGE_ERROR_UNAUTHORIZED));
  }
  req.user = payload;
  next();
  return true;
};
