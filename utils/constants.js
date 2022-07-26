const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;
const SECRET = 'dev-secret';
const CODE_ERROR_CAST = 400;
const CODE_ERROR_UNAUTHORIZED = 401;
const CODE_ERROR_FORBIDDEN = 403;
const CODE_ERROR_NOTFOUND = 404;
const CODE_ERROR_CONFLICT = 409;
const CODE_ERROR_SERVER = 500;
const MESSAGE_ERROR_CAST = 'Введены некорректные данные';
const MESSAGE_ERROR_UNAUTHORIZED = 'Необходима авторизация';
const MESSAGE_ERROR_UNAUTHORIZED_SIGNUP = 'Некорректная почта или пароль';
const MESSAGE_ERROR_FORBIDDEN = 'Фильм не может быть удален';
const MESSAGE_ERROR_NOTFOUND_MOVIE = 'Фильм с указанным id не найден';
const MESSAGE_ERROR_NOTFOUND_USER = 'Пользователь по указанному id не найден';
const MESSAGE_ERROR_NOTFOUND_PAGE = 'Страница не найдена';
const MESSAGE_ERROR_CONFLICT = 'Пользователь с указанным email уже существует';
const MESSAGE_ERROR_SERVER = 'На сервере произошла ошибка';

module.exports = {
  SALT_ROUNDS,
  MONGO_DUPLICATE_ERROR_CODE,
  SECRET,
  CODE_ERROR_CAST,
  CODE_ERROR_UNAUTHORIZED,
  CODE_ERROR_FORBIDDEN,
  CODE_ERROR_NOTFOUND,
  CODE_ERROR_CONFLICT,
  CODE_ERROR_SERVER,
  MESSAGE_ERROR_CAST,
  MESSAGE_ERROR_UNAUTHORIZED,
  MESSAGE_ERROR_UNAUTHORIZED_SIGNUP,
  MESSAGE_ERROR_FORBIDDEN,
  MESSAGE_ERROR_NOTFOUND_MOVIE,
  MESSAGE_ERROR_NOTFOUND_USER,
  MESSAGE_ERROR_NOTFOUND_PAGE,
  MESSAGE_ERROR_CONFLICT,
  MESSAGE_ERROR_SERVER,
};
