const { VALIDATION_ERRORS, SERVER_ERRORS, CLIENT_ERRORS } = require('../utils/constants');

module.exports.resource = (res, req, next) => {
  next({ status: 404, message: CLIENT_ERRORS.notFoundError });
};

module.exports.errorMiddleware = (err, req, res, next) => {
  let { status = 500, message } = err;

  if (err.name === 'ValidationError') {
    status = 400;
  }

  if (err.code === 11000) {
    status = 409;
    message = VALIDATION_ERRORS.emailIsNotUniqError;
  }

  res
    .status(status)
    .send({
      message: status === 500
        ? `${SERVER_ERRORS.serverError} Статус ошибки ${status}.`
        : `${message} Статус ошибки ${status}.`,
    });

  return next();
};
