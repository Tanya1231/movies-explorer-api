const REG_EX = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;

const MONGODB = 'mongodb://localhost:27017/moviesdb';

const SERVER_TEXT = 'Ошибка по умолчанию';
const VALID_TEXT = 'Переданные данные не валидны';
const CONFLICT_TEXT = 'При регистрации указан email, который уже существует на сервере';
const UNAUTHORIZED_TEXT = 'Неправильный email или пароль';
const FILM_TEXT = 'Фильм с указанным _id не найден';
const FORBIDDEN_TEXT = 'Вы не можете удалить чужой фильм';
const DELETE_TEXT = 'Фильм удалён';
const USER_TEXT = 'User с указанным _id не найден';
const AUTORIZATION_TEXT = 'Авторизация прошла успешно';
const USERID_TEXT = 'Указанный пользователь не найден';
const EXIT_TEXT = 'Вы вышли из акаунта';
const ERROR_TEXT = 'Нужна авторизация';
const LINK_TEXT = 'Ошибка ссылка невалидна';
const EMAIL_TEXT = 'Неверно заполнен email';
const CRASH_TEXT = 'Сервер сейчас упадёт';

module.exports = {
  REG_EX,
  SERVER_TEXT,
  VALID_TEXT,
  CONFLICT_TEXT,
  UNAUTHORIZED_TEXT,
  FILM_TEXT,
  FORBIDDEN_TEXT,
  DELETE_TEXT,
  USER_TEXT,
  AUTORIZATION_TEXT,
  USERID_TEXT,
  EXIT_TEXT,
  ERROR_TEXT,
  LINK_TEXT,
  EMAIL_TEXT,
  MONGODB,
  CRASH_TEXT,
};
