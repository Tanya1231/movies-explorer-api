const router = require('express').Router();
const ErrorNotFound = require('../errors/ErrorNotFound');
const { login, createUser } = require('../controllers/users');
const routerUsers = require('./users');
const routerMovies = require('./movies');
const auth = require('../middlewares/auth');
const { logoff } = require('../controllers/users');
const { signinValidation, signupValidation } = require('../utils/validation');

router.post('/signin', signinValidation, login);

router.post('/signup', signupValidation, createUser);

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);

router.post('/signout', auth, logoff);

router.use('*', (req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
});

module.exports = router;
