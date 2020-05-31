const mongoose = require('mongoose');
const { VALIDATION_ERRORS } = require('../utils/constants');
const { isURL } = require('../validation/validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, VALIDATION_ERRORS.textSchemaError]
  },
  title: {
    type: String,
    required: [true, VALIDATION_ERRORS.textSchemaError]
  },
  text: {
    type: String,
    required: [true, VALIDATION_ERRORS.textSchemaError]
  },
  date: {
    type: String,
    required: [true, VALIDATION_ERRORS.textSchemaError]
  },
  source: {
    type: String,
    required: [true, VALIDATION_ERRORS.textSchemaError]
  },
  link: {
    type: String,
    validate: {
      validator(data) {
        return isURL(data);
      },
      message: () => VALIDATION_ERRORS.linkSchemaError
    },
    required: [true, VALIDATION_ERRORS.linkSchemaError]
  },
  image: {
    type: String,
    validate: {
      validator(data) {
        return isURL(data);
      },
      message: () => VALIDATION_ERRORS.linkSchemaError
    },
    required: [true, VALIDATION_ERRORS.linkSchemaError]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('article', articleSchema);
