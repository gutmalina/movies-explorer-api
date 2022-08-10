const { CODE_ERROR_NOTFOUND } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_ERROR_NOTFOUND;
  }
}

module.exports = NotFoundError;
