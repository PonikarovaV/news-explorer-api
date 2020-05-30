const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const Unauthorized = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator(string) {
        return validator.isEmail(string);
      },
      message: () => 'Поле должно содержать email.'
    },
    required: [true, 'Поле email обязательное.']
  },
  password: {
    type: String,
    select: false,
    validate: {
      validator(string) {
        return validator.matches(string, /[a-zA-Z0-9*]{8,30}/gi);
      },
      message: () => 'Поле password может содержать символы: *, a-z, A-Z, 0-9.'
    },
    required: [true, 'Поле password обязательное.']
  },
  name: {
    type: String,
    validate: {
      validator(string) {
        return validator.matches(string, /[a-zA-Zа-яёА-ЯЁ0-9\s]{2,30}/gi);
      },
      message: () => 'Поле name может содержать символы: A-Z, А-Я (верхний или нижний регистр), цифры, пробел. Максимальная длина - 30.'
    },
    required: [true, 'Поле name обязательное.']
  }
});

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неправильные почта или пароль.');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильные почта или пароль.');
          }

          return user;
        });
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
