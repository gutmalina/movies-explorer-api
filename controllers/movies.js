const Movie = require('../models/movie');
const CastError = require('../errors/cast-error');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const {
  MESSAGE_ERROR_CAST,
  MESSAGE_ERROR_NOTFOUND_MOVIE,
  MESSAGE_ERROR_FORBIDDEN,
} = require('../utils/constants');

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
    movieId,
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
      movieId,
      owner,
    })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError(MESSAGE_ERROR_CAST));
      } else {
        next(err);
      }
    });
};

/** удаляет сохранённый фильм по ID */
module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  Movie
    .findById(id)
    .orFail(() => {
      throw new NotFoundError(MESSAGE_ERROR_NOTFOUND_MOVIE);
    })
    .then((movie) => {
      if (String(userId) !== String(movie.owner)) {
        throw next(new ForbiddenError(MESSAGE_ERROR_FORBIDDEN));
      }
      Movie
        .findByIdAndRemove(id)
        .then(() => {
          res.send(movie);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError(MESSAGE_ERROR_CAST));
      } else {
        next(err);
      }
    });
};
