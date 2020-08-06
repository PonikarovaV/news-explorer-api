const jwt = require('jsonwebtoken');
const { KEY } = require('../utils/config');

const { CLIENT_ERRORS } = require('../utils/constants');

const Unauthorized = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new Unauthorized(CLIENT_ERRORS.unauthorizedError));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, KEY);
  } catch (err) {
    next(new Unauthorized(CLIENT_ERRORS.unauthorizedError));
  }

  req.user = payload;

  return next();
};
