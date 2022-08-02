const {
  MONGO_URL = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  MONGO_URL,
  PORT,
  NODE_ENV,
  JWT_SECRET,
};
