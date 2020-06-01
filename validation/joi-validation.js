const { Joi } = require('celebrate');
const { isURL } = require('./validator');

const BadRequest = require('../errors/bad-request-error');

const { VALIDATION_ERRORS, REGEXP_PATTERNS } = require('../utils/constants');


module.exports.nameSchema = Joi
  .string()
  .required()
  .regex(REGEXP_PATTERNS.nameRegexp)
  .error(new BadRequest(VALIDATION_ERRORS.nameSchemaError));

module.exports.textSchema = Joi
  .string()
  .required()
  .min(2)
  .error(new BadRequest(VALIDATION_ERRORS.textSchemaError));

module.exports.linkSchema = Joi
  .string()
  .required()
  .custom((data) => {
    if (!isURL(data)) {
      throw new BadRequest(VALIDATION_ERRORS.linkSchemaError);
    }

    return data;
  })
  .error(new BadRequest(VALIDATION_ERRORS.linkSchemaError));

module.exports.emailSchema = Joi
  .string()
  .required()
  .email()
  .error(new BadRequest(VALIDATION_ERRORS.signupFieldsError));

module.exports.passwordSchema = Joi
  .string()
  .required()
  .regex(REGEXP_PATTERNS.passwordRegexp)
  .error(new BadRequest(VALIDATION_ERRORS.signupFieldsError));

// валидация при авторизации, выдает общую ошибку без уточнений
module.exports.emailAuthSchema = Joi
  .string()
  .required()
  .email()
  .error(new BadRequest(VALIDATION_ERRORS.signinFieldsError));

// валидация при авторизации, выдает общую ошибку без уточнений
module.exports.passwordAuthSchema = Joi
  .string()
  .required()
  .regex(REGEXP_PATTERNS.passwordRegexp)
  .error(new BadRequest(VALIDATION_ERRORS.signinFieldsError));
