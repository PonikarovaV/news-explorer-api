const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

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
    image
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
    owner: _id
  })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.cardId)
    .orFail(() => new NotFoundError(`Карточка с id ${req.params.cardId} не найдена.`))
    .then((card) => {
      if (String(card.owner) !== String(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить карточку.');
      } else {
        Article.deleteOne(card)
          .then(() => {
            res.send({ message: `Карточка с id ${req.params.cardId} успешно и безвозвратно удалена.` });
          });
      }
    })
    .catch(next);
};
