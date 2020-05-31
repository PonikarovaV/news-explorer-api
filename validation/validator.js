const validator = require('validator');
const { REGEXP_PATTERNS } = require('../utils/constants');

module.exports.isName = (data) => {
  return data && REGEXP_PATTERNS.nameRegexp.test(data.trim());
};

module.exports.isPassword = (data) => {
  return data && REGEXP_PATTERNS.passwordRegexp.test(data.trim());
};

module.exports.isEmail = (data) => {
  return data && validator.isEmail(data);
};

module.exports.isURL = (data) => {
  return data && validator.isURL(data);
};
