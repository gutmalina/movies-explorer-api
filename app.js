const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** все роуты */
app.use(routes);

/** обработчик ошибок celebrate */
app.use(errors());

/** централизованный обработчик ошибок */
app.use(error);

/** подключение к mongo и серверу */
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Connect ${PORT}`);
  });
}

main();
