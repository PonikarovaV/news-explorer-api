const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

const {
  textSchema,
  linkSchema,
} = require('../validation/joi-validation');

router.get('/', getArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: textSchema,
    title: textSchema,
    text: textSchema,
    date: textSchema,
    source: textSchema,
    link: linkSchema,
    image: linkSchema,
  }),
}), createArticle);
router.delete('/:articleId', deleteArticle);

module.exports = router;
