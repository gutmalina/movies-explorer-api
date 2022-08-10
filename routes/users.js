const router = require('express').Router();
const { validateUpdateUser } = require('../middlewares/validation');

const {
  getMe,
  updateUser,
} = require('../controllers/users');

/** возвращает информацию о пользователе */
router.get('/me', getMe);

/** обновляет данные пользователя */
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
