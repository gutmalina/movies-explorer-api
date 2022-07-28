require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

/** настройка заголовков для защиты приложения */
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** обработка кросс-доменных запросов */
app.use(cors);

/** обработка логгер запросов */
app.use(requestLogger);

/** все роуты */
app.use(routes);

/** логгер ошибок */
app.use(errorLogger);

/** обработчик ошибок celebrate */
app.use(errors());

/** централизованный обработчик ошибок */
app.use(error);

/** подключение к mongo и серверу */
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Connect ${PORT}`);
  });
}

main();
