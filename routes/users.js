const router = require('express').Router();
const {
  getMe,
  updateUser,
} = require('../controllers/users');

/** возвращает информацию о пользователе */
router.get('/me', getMe);

/** обновляет данные пользователя */
router.patch('/me', updateUser);

module.exports = router;
