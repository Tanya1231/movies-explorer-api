require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorCode = require('../errors/ErrorCode');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorServer = require('../errors/ErrorServer');
const ErrorUnauthorized = require('../errors/ErrorUnauthorized');
const {
  SERVER_TEXT,
  VALID_TEXT,
  CONFLICT_TEXT,
  UNAUTHORIZED_TEXT,
  USER_TEXT,
  AUTORIZATION_TEXT,
  USERID_TEXT,
  EXIT_TEXT,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hashedPassword,
    });
    return res.send({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorCode(VALID_TEXT));
    }
    if (err.code === 11000) {
      return next(new ErrorConflict(CONFLICT_TEXT));
    }
    console.log(err);
    return next(new ErrorServer(SERVER_TEXT));
  }
};

const updateProfile = async (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      owner,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!user) {
      return next(new ErrorNotFound(USER_TEXT));
    }
    return res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ErrorCode(VALID_TEXT));
    }
    if (err.code === 11000) {
      return next(new ErrorConflict(CONFLICT_TEXT));
    }
    console.log(err);
    return next(new ErrorServer(SERVER_TEXT));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorUnauthorized(UNAUTHORIZED_TEXT));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return next(new ErrorUnauthorized(UNAUTHORIZED_TEXT));
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret',
    );
    res.cookie('jwt', token, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: false,
    });
    return res.status(200).send({ message: AUTORIZATION_TEXT, token });
  } catch (err) {
    return next(new ErrorServer(SERVER_TEXT));
  }
};

const getMyInfo = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new ErrorNotFound(USERID_TEXT));
    }
    return res.send(user);
  } catch (err) {
    console.log(err);
    return next(new ErrorServer(SERVER_TEXT));
  }
};

const logoff = (req, res, next) => {
  res.clearCookie('jwt').send({ message: EXIT_TEXT });
  return next();
};

module.exports = {
  createUser,
  updateProfile,
  login,
  getMyInfo,
  logoff,
};
