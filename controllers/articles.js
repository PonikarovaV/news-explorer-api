const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const { CLIENT_ERRORS } = require('../utils/constants');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .populate('user')
    .then((article) => res.send({ articles: article }))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  const { _id } = req.user;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: _id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => new NotFoundError(CLIENT_ERRORS.notFoundArticleError))
    .then((article) => {
      if (String(article.owner) !== String(req.user._id)) {
        throw new ForbiddenError(CLIENT_ERRORS.forbiddenToDeleteCardError);
      } else {
        Article.deleteOne(article)
          .then(() => {
            res.send({ article });
          });
      }
    })
    .catch(next);
};
