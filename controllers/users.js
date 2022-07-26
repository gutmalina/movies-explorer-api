const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');

/** ВРЕМЕННЫЙ получить всех пользователей */
module.exports.getUsers = (req, res, next) => {
  User
    .find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

/** возвращает информацию о пользователе - email, name */
module.exports.getMe = (req, res, next) => {
  const userId = req.user._id;
  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Введен некорректный id пользователя'));
      } else {
        next(err);
      }
    });
};

/** обновляет данные пользователя - email, name */
module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const userId = req.user._id;
  User
    .findByIdAndUpdate(
      userId,
      { email, name },
      { new: true, runValidators: true },
    )
    .orFail(() => {
      const err = new Error('Пользователь по указанному id не найден');
      err.name = 'NotFoundError';
      throw err;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError('Введены некорректные данные пользователя'));
      } else {
        next(err);
      }
    });
};
