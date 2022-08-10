const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

/** возвращает все сохранённые текущим пользователем фильмы */
router.get('/', getMovies);

/** создаёт фильм */
router.post('/', validateCreateMovie, createMovie);

/** удаляет сохранённый фильм по ID */
router.delete('/:id', validateDeleteMovie, deleteMovie);

module.exports = router;
