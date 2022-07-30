const {
  PORT_MONGO,
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT_MONGO,
  PORT,
  NODE_ENV,
  JWT_SECRET,
};
