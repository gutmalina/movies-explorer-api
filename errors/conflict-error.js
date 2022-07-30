const { CODE_ERROR_CONFLICT } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_ERROR_CONFLICT;
  }
}

module.exports = ConflictError;
