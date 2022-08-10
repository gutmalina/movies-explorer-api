const { CODE_ERROR_SERVER, MESSAGE_ERROR_SERVER } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = CODE_ERROR_SERVER, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === CODE_ERROR_SERVER ? MESSAGE_ERROR_SERVER : message,
    });
  next();
};
