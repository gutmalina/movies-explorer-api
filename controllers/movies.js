const Movie = require('../models/movie');
const CastError = require('../errors/cast-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

/** возвращает все сохранённые текущим пользователем фильмы */
module.exports.getMovies = (req, res, next) => {
  Movie
    .find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

/** создаёт фильм */
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;
  const owner = req.user._id;
  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      owner,
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

/** удаляет сохранённый фильм по ID */
module.exports.deleteMovie = (req, res, next) => {
  // const { movieId } = req.params;
  const movieId = '62dfed4220b9d54d5455ae3e';
  // const userId = req.user._id;
  const userId = '62dfb30d54bf62df433cf7fa';
  Movie
    .findById(movieId)
    .orFail(() => {
      throw new NotFoundError('Фильм с указанным id не найден');
    })
    .then((movie) => {
      if (String(userId) !== String(movie.owner)) {
        throw next(new ForbiddenError('Фильм не может быть удален'));
      }
      Movie
        .findByIdAndRemove(movieId)
        .then(() => {
          res.send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

// "country": "страна создания",
// "director": "режисер фильма",
// "duration": "длительность фильма число",
// "year": "год выпуска",
// "description": "описание фильма",
// "image": "ссылка на постер url",
// "trailerLink": "ссылка на трейлер url",
// "nameRU": "название фильма на русском",
// "nameEN": "название фильма на английском",
// "thumbnail": "миниатюрное изображение постера url",
// "movieId": "id фильма",
// "owner": "id пользователя",
