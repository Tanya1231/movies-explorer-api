const mongoose = require('mongoose');
const { REG_EX, LINK_TEXT } = require('../utils/constants');

const { Schema } = mongoose;

const movieSchema = new Schema({
  country: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  director: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  duration: {
    type: Number,
    required: [true, 'Обязательное поле'],
  },
  year: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  description: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  image: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator(v) {
        return REG_EX.test(v);
      },
      message: LINK_TEXT,
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator(v) {
        return REG_EX.test(v);
      },
      message: LINK_TEXT,
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator(v) {
        return REG_EX.test(v);
      },
      message: LINK_TEXT,
    },
  },
  owner: {
    required: [true, 'Обязательное поле'],
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    required: [true, 'Обязательное поле'],
    type: Number,
  },
  nameRU: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  nameEN: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
