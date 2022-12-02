require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const path = require('path');
const corsHandler = require('./middlewares/corsHandler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { error } = require('./errors/error');
const { limiter } = require('./utils/ratelimit');

const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;

const app = express();
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? JWT_SECRET : 'mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);

app.use(corsHandler);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
