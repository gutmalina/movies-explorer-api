const { CODE_ERROR_UNAUTHORIZED } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_ERROR_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
