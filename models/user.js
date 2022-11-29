const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: [2, 'Минимальная длина поля 2 символа'],
    maxlength: [30, 'Максимальная длина поля 30 символов'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Обязательное поле'],
    validate: {
      validator: validator.isEmail,
      message: 'Неверно заполнен email',
    },
  },
  password: {
    type: String,
    required: [true, 'Обязательное поле'],
    select: false,
  },
}, {
  versionKey: false,
});

userSchema.methods.hidePassword = function hidePassword() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('user', userSchema);
