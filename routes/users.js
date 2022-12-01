const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { updateProfile, getMyInfo } = require('../controllers/users');

router.get('/me', getMyInfo);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

module.exports = router;