const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Наличие ключевого слова - обязательно.']
  },
  title: {
    type: String,
    required: [true, 'Наличие заголовка статьи - обязательно.']
  },
  text: {
    type: String,
    required: [true, 'Наличие текста статьи - обязательно.']
  },
  date: {
    type: String,
    required: [true, 'Наличие даты статьи - обязательно.']
  },
  source: {
    type: String,
    required: [true, 'Указание источника статьи - обязательно.']
  },
  link: {
    type: String,
    validate: {
      validator(string) {
        return validator.isURL(string);
      },
      message: () => 'Ссылка на статью должна быть корректной.'
    },
    required: [true, 'Ссылка на статью - обязаельна.']
  },
  image: {
    type: String,
    validate: {
      validator(string) {
        return validator.isURL(string);
      },
      message: () => 'Ссылка на иллюстрацию к статье должна быть корректной.'
    },
    required: [true, 'Иллюстрация к статье - обязаельна.']
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

module.exports = mongoose.model('card', articleSchema);
