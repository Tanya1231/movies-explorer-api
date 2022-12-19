const router = require('express').Router();
const { movieValidation, movieDeleteValidation } = require('../utils/validation');

const {
  getMovies,
  deleteMovie,
  createMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:movieId', movieDeleteValidation, deleteMovie);

router.post('/', movieValidation, createMovie);

module.exports = router;
