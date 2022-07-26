const { celebrate, Joi } = require('celebrate');
const URL_REGEX = require('../utils/constants');

/** создаёт пользователя */
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

/** аутентификация - вход по email и паролю  */
const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

/** обновляет данные пользователя */
const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

/** создаёт фильм */
const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(RegExp(URL_REGEX)),
    trailerLink: Joi.string().required().regex(RegExp(URL_REGEX)),
    thumbnail: Joi.string().required().regex(RegExp(URL_REGEX)),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

/** удаляет сохранённый фильм по ID */
const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateUser,
  validateCreateMovie,
  validateDeleteMovie,
};
