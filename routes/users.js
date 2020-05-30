const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser, updateUser } = require('../controllers/users');

const { nameSchema } = require('../validation/joi-validation');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: nameSchema
  })
}), updateUser);

module.exports = router;
