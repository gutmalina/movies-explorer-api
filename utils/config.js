const {
  MONGO_URL = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : 'mongodb://127.0.0.1:27017/mestodb',
  PORT = 3001,
  NODE_ENV,
  JWT_SECRET,
} = process.env;
const CORS_ALLOWED = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://webdiploma.nomoredomains.xyz',
  'https://webdiploma.nomoredomains.xyz',
];

module.exports = {
  MONGO_URL,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  CORS_ALLOWED,
};
