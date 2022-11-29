const Movie = require('../models/movie');
const ErrorCode = require('../errors/ErrorCode');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorServer = require('../errors/ErrorServer');
const ErrorForbidden = require('../errors/ErrorForbidden');

const getMovies = async (req, res, next) => {
  try {
    const { owner } = req.user._id;
    const movies = await Movie.find({ owner });
    if (!movies) {
      return next(new ErrorNotFound('Фильмы с указанным _id не найдены'));
    }
    return res.send(movies);
  } catch (err) {
    return next(new ErrorServer('Ошибка по умолчанию'));
  }
};

const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return next(new ErrorNotFound('Фильм с указанным _id не найдена'));
    }
    if (req.user._id !== movie.owner.toString()) {
      return next(new ErrorForbidden('Вы не можете удалить чужой фильм'));
    }
    await movie.remove();
    return res.send({ message: 'Фильм удалён' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return next(new ErrorCode('Переданны неккоректные данные для удаления фильма'));
    }
    return next(new ErrorServer('Ошибка по умолчанию'), err);
  }
};

const createMovie = async (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail,
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
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      owner,
    });
    return res.send(movied);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorCode('Переданные данные не валидны'));
    }
    return next(new ErrorServer('Ошибка по умолчанию'));
  }
};

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
