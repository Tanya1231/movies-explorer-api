require('dotenv').config();
const jwt = require('jsonwebtoken');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const { ERROR_TEXT } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret');
  } catch (err) {
    next(new ErrorUnauthorized(ERROR_TEXT));
  }
  req.user = payload;
  next();
};

module.exports = auth;
