const PORT_MONGO = 'mongodb://127.0.0.1:27017/moviesdb';
const CORS_ALLOWED = [
  'http://webdiploma.nomoredomains.xyz',
  'https://webdiploma.nomoredomains.xyz',
  'http://localhost:3000',
  'https://localhost:3000',
];

module.exports = {
  PORT_MONGO,
  CORS_ALLOWED,
};
