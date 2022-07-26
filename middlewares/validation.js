const { celebrate, Joi } = require('celebrate');

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
    image: Joi.string().required(),
    trailerLink: Joi.string().required(),
    thumbnail: Joi.string().required(),
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
  validateUpdateUser,
  validateCreateMovie,
  validateDeleteMovie,
};
