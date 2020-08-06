const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { VALIDATION_ERRORS } = require('../utils/constants');
const {
  isName,
  isEmail,
} = require('../validation/validator');

const Unauthorized = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator(data) {
        return isEmail(data);
      },
      message: () => VALIDATION_ERRORS.signinFieldsError,
    },
    required: [true, VALIDATION_ERRORS.signinFieldsError],
  },
  password: {
    type: String,
    select: false,
    required: [true, VALIDATION_ERRORS.signinFieldsError],
  },
  name: {
    type: String,
    validate: {
      validator(data) {
        return isName(data);
      },
      message: () => VALIDATION_ERRORS.nameSchemaError,
    },
    required: [true, VALIDATION_ERRORS.nameSchemaError],
  },
});

userSchema.statics.findUserByCredentials = function (email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(VALIDATION_ERRORS.signinFieldsError);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized(VALIDATION_ERRORS.signinFieldsError);
          }

          return user;
        });
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);
