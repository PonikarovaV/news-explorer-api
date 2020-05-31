const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { KEY } = require('../utils/config');

const NotFoundError = require('../errors/not-found-error');
const BadRequest = require('../errors/bad-request-error');

const {
  isName,
  isEmail,
  isPassword
} = require('../validation/validator');

const { VALIDATION_ERRORS, CLIENT_ERRORS } = require('../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, KEY, { expiresIn: '7d' });

      return res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name
  } = req.body;

  const isValid = [
    isName(name) || { error: VALIDATION_ERRORS.nameSchemaError },
    isEmail(email) || { error: VALIDATION_ERRORS.signupFieldsError },
    isPassword(password) || { error: VALIDATION_ERRORS.signupFieldsError }
  ];

  const isValidationError = isValid.find(field => field.error);

  if (isValidationError) {
    throw new BadRequest(isValidationError.error);
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name
    }))
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(CLIENT_ERRORS.notFoundError))
    .then((user) => res.send({ data: user }))
    .catch(next);
};
