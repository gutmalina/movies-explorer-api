const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const { validateCreateUser, validateLogin } = require('../middlewares/validation');
const NotFoundError = require('../errors/not-found-error');
const auth = require('../middlewares/auth');
const { MESSAGE_ERROR_NOTFOUND_PAGE } = require('../utils/constants');

/** роуты авторизации и аутентификации */
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

/** роуты, защищенные аутентификацией */
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use((req, res, next) => {
  next(new NotFoundError(MESSAGE_ERROR_NOTFOUND_PAGE));
});

module.exports = router;
