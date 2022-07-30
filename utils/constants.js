const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const CODE_ERROR_CAST = 400;
const CODE_ERROR_UNAUTHORIZED = 401;
const CODE_ERROR_FORBIDDEN = 403;
const CODE_ERROR_NOTFOUND = 404;
const CODE_ERROR_CONFLICT = 409;
const CODE_ERROR_SERVER = 500;

module.exports = {
  SALT_ROUNDS,
  MONGO_DUPLICATE_ERROR_CODE,
  CODE_ERROR_CAST,
  CODE_ERROR_UNAUTHORIZED,
  CODE_ERROR_FORBIDDEN,
  CODE_ERROR_NOTFOUND,
  CODE_ERROR_CONFLICT,
  CODE_ERROR_SERVER,
};
