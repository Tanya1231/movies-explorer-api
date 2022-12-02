const Movie = require('../models/movie');
const ErrorCode = require('../errors/ErrorCode');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorServer = require('../errors/ErrorServer');
const ErrorForbidden = require('../errors/ErrorForbidden');
const {
  SERVER_TEXT, VALID_TEXT, FILM_TEXT, FORBIDDEN_TEXT, DELETE_TEXT,
} = require('../utils/constants');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({});
    return res.send(movies);
  } catch (err) {
    return next(new ErrorServer(SERVER_TEXT));
  }
};

const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return next(new ErrorNotFound(FILM_TEXT));
    }
    if (req.user._id !== movie.owner.toString()) {
      return next(new ErrorForbidden(FORBIDDEN_TEXT));
    }
    await movie.remove();
    return res.send({ message: DELETE_TEXT });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new ErrorCode(VALID_TEXT));
    }
    return next(new ErrorServer(SERVER_TEXT));
  }
};

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  try {
    const movied = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });
    return res.send(movied);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorCode(err));
    }
    return next(new ErrorServer('Ошибка по умолчанию'));
  }
};

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
