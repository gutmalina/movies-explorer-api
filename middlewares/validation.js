const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

/** создаёт пользователя */
const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
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
    image: Joi.string()
      .required()
      .custom((value, helper) => {
        if (isURL(value)) return value;
        return helper.message('Введены некорректные данные');
      }),
    trailerLink: Joi.string()
      .required()
      .custom((value, helper) => {
        if (isURL(value)) return value;
        return helper.message('Введены некорректные данные');
      }),
    thumbnail: Joi.string()
      .required()
      .custom((value, helper) => {
        if (isURL(value)) return value;
        return helper.message('Введены некорректные данные');
      }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

/** удаляет сохранённый фильм по ID */
const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateUpdateUser,
  validateCreateMovie,
  validateDeleteMovie,
};
