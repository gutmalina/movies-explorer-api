require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');
const { PORT_MONGO } = require('./utils/config');

const { PORT = 3000 } = process.env;

const app = express();

/** установка лимита на количестко запросов с одного IP, 15мин 100 запросов */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

/** подключение лимита запросов */
app.use(limiter);

/** настройка заголовков для защиты приложения */
app.use(helmet());

/** преобразование тела запроса в json */
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
  await mongoose.connect(PORT_MONGO);
  app.listen(PORT);
}

main();
