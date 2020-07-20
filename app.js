
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { SERVER_ERRORS } = require('./utils/constants');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const {
  nameSchema,
  emailSchema,
  passwordSchema,
  emailAuthSchema,
  passwordAuthSchema,
} = require('./validation/joi-validation');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { resource, errorMiddleware } = require('./middlewares/error-handler');
const { createUser, login } = require('./controllers/users');
const users = require('./routes/users');
const articles = require('./routes/articles');
const auth = require('./middlewares/auth');

const { MONGO_DB, SERV_PORT } = require('./utils/config');

const app = express();

app.use(helmet());

app.use(requestLogger);

app.use(cors());

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: emailAuthSchema,
    password: passwordAuthSchema,
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: emailSchema,
    password: passwordSchema,
    name: nameSchema,
  }),
}), createUser);

app.use(auth);
app.use('/users', users);
app.use('/articles', articles);
app.use(resource);
app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);


async function start() {
  try {
    await mongoose.connect(MONGO_DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    app.listen(SERV_PORT, () => {
      console.log(`Server started on port ${SERV_PORT}`);
    });
  } catch (err) {
    throw new Error(SERVER_ERRORS.serverError);
  }
}

start();
