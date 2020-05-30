const { Joi } = require('celebrate');
const BadRequest = require('../errors/bad-request-error');

module.exports.nameSchema = Joi
  .string()
  .required()
  .regex(/^[a-zA-Zа-яёА-ЯЁ0-9\s]{2,30}$/m)
  .error(new BadRequest('Вам необходимо ввести корректное имя. Имя может содержать символы А-Я, A-Z в верхнем или нижнем регистре, цифры и пробел. Количество символов от 2 до 30.'));

module.exports.textSchema = Joi
  .string()
  .required()
  .min(2)
  .error(new BadRequest('Текстовое поле обязательно.'));

module.exports.linkSchema = Joi
  .string()
  .required()
  .regex(/^(?! )http(s)?:\/\/(www\.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z0-9])[.-]?){1,}([a-zA-Z0-9])\.([a-zA-Z]{2,6}))(?::\d{2,5})?(?:[\\/?#]\S*)?/m)
  .error(new BadRequest('Ссылка должна быть корректной.'));

module.exports.emailSchema = Joi
  .string()
  .required()
  .email()
  .error(new BadRequest('Логин и пароль обязательные для заполнения и должны быть корректно заполнены.'));

module.exports.passwordSchema = Joi
  .string()
  .required()
  .regex(/^[a-zA-Z0-9*]{8,30}$/m)
  .error(new BadRequest('Логин и пароль обязательные для заполнения и должны быть корректно заполнены.'));
