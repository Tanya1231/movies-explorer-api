const { SERVER_TEXT } = require('../utils/constants');

const error = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? SERVER_TEXT : message });
  next(err);
});

module.exports = { error };
