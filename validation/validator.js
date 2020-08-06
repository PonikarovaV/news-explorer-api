const validator = require('validator');
const { REGEXP_PATTERNS } = require('../utils/constants');

module.exports.isName = (data) => !!data && REGEXP_PATTERNS.nameRegexp.test(data.trim());

module.exports.isPassword = (data) => !!data && REGEXP_PATTERNS.passwordRegexp.test(data.trim());

module.exports.isEmail = (data) => !!data && validator.isEmail(data);

module.exports.isURL = (data) => !!data && validator.isURL(data);
