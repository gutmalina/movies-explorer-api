const URL_REGEX = /^https?:\/\/[-a-zA-Z\d]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{1,}#?$/i;
const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;

module.exports = {
  URL_REGEX,
  SALT_ROUNDS,
  MONGO_DUPLICATE_ERROR_CODE,
};
