const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { REG_EX } = require('../utils/validation');

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).required().hex(),
  }),
}), deleteMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required().regex(REG_EX),
    image: Joi.string().required().regex(REG_EX),
    trailer: Joi.string().required().regex(REG_EX),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(REG_EX),
    movieId: Joi.number().required(),
  }),
}), createMovie);

module.exports = router;
