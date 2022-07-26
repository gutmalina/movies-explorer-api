const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validation');

const {
  getUsers, // ВРЕМЕННЫЙ
  getMe,
  updateUser,
} = require('../controllers/users');

/** ВРЕМЕННЫЙ, получить всех пользователей */
router.get('/', getUsers);

/** возвращает информацию о пользователе */
router.get('/me', getMe);

/** обновляет данные пользователя */
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
