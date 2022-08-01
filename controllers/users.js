const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');
const ConflictError = require('../errors/conflict-error');
const {
  SALT_ROUNDS,
  MONGO_DUPLICATE_ERROR_CODE,
  SECRET,
  MESSAGE_ERROR_CAST,
  MESSAGE_ERROR_CONFLICT,
  MESSAGE_ERROR_NOTFOUND_USER,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

/** создаёт пользователя */
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  return bcrypt
    .hash(password, SALT_ROUNDS)
    .then((hash) => (
      User
        .create({
          email,
          password: hash,
          name,
        })
    ))
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError(MESSAGE_ERROR_CAST));
      } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError(MESSAGE_ERROR_CONFLICT));
      } else {
        next(err);
      }
    });
};

/** возвращает информацию о пользователе - email, name */
module.exports.getMe = (req, res, next) => {
  const userId = req.user._id;
  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE_ERROR_NOTFOUND_USER);
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
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
      const err = new Error(MESSAGE_ERROR_NOTFOUND_USER);
      err.name = 'NotFoundError';
      throw err;
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError(MESSAGE_ERROR_NOTFOUND_USER));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new CastError(MESSAGE_ERROR_CAST));
      } else if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        next(new ConflictError(MESSAGE_ERROR_CONFLICT));
      } else {
        next(err);
      }
    });
};

/** аутентификация - вход по email & password  */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};
