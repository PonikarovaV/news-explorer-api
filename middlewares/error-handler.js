module.exports.resource = (res, req, next) => {
  next({ status: 404, message: 'Запрашиваемый ресурс не найден.' });
};

module.exports.errorMiddleware = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  console.log(err)

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? `На сервере произошла ошибка. Статус ошибки ${statusCode}.`
        : `${message} Статус ошибки ${statusCode}.`
    });

  return next;
};
