const router = require('express').Router();
const userRouter = require('./users');
const NotFoundError = require('../errors/not-found-error');

/** роуты users */
router.use('/users', userRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;

// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /moroutes/users.jsvies/_id