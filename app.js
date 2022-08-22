require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');
const limiter = require('./middlewares/limiter');
const routes = require('./routes/index');
const { PORT, MONGO_URL } = require('./utils/config');

const app = express();

/** преобразование тела запроса в json */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** обработка кросс-доменных запросов */
app.use(cors);

/** обработка логгер запросов */
app.use(requestLogger);

/** подключение лимита запросов */
app.use(limiter);

/** настройка заголовков для защиты приложения */
app.use(helmet());

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
  await mongoose.connect(MONGO_URL);
  app.listen(PORT);
}

main();
