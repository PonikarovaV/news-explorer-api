const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

const key = process.env.JWT_SECRET || 'some-secret-key';

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, key, { expiresIn: '7d' });

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

  if (!validator.matches(password, /[a-zA-Z0-9*]{8,15}/gi)) {
    next(new BadRequestError('Поле password может содержать символы: *, a-z, A-Z, 0-9.'));
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
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError(`Пользователь с id ${req.params.userId} не найден.`))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const request = {};

  const isFieldValid = (fieldValue) => validator.matches(fieldValue, /[a-zA-Zа-яёА-ЯЁ0-9\s]{2,30}/gi);

  const errorMessage = (fieldName) => `Поле ${fieldName} может содержать символы: A-Z, А-Я (верхнй или нижний регистр), цифры, пробел. Максимальная длина - 30.`;

  if (typeof req.body.name !== 'undefined') {
    if (!isFieldValid(req.body.name)) {
      next(new BadRequestError(errorMessage('name')));
    }
    request.name = req.body.name;
  }

  User.findByIdAndUpdate(req.user._id, request, { new: true, runValidators: true })
    .orFail(() => new NotFoundError(`Пользователь с id ${req.user._id} не найден.`))
    .then((user) => res.send({ user }))
    .catch(next);
};
