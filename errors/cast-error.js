const { CODE_ERROR_CAST } = require('../utils/constants');

class CastError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_ERROR_CAST;
  }
}

module.exports = CastError;
