const { CODE_ERROR_FORBIDDEN } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_ERROR_FORBIDDEN;
  }
}

module.exports = ForbiddenError;
