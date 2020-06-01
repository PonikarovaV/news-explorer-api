module.exports.VALIDATION_ERRORS = {
  nameSchemaError: 'Поле name обязательно для заполнения. Имя может содержать символы А-Я, A-Z в верхнем или нижнем регистре. Количество символов от 2 до 30.',
  textSchemaError: 'Текстовые поля keyword, title, text, date, source обязательны для заполнения и должны содержать корректные данные. Текст не может быть менее 2-х символов.',
  linkSchemaError: 'Поля link и image обязательны для заполнения и должны содержать корректную ссылку.',
  signupFieldsError: 'Почта и пароль обязательны для заполнения и должны быть корректно заполнены. Пароль может содержать символы A-Z в верхнем или нижнем регистре, цифры и спецсиволы: !@#$%&*_+=` . Количество символов в пароле от 8 до 50 символов.',
  signinFieldsError: 'Неправильные почта или пароль.',
  emailIsNotUniqError: 'Пользователь с таким email уже существует.',
};

module.exports.CLIENT_ERRORS = {
  notFoundError: 'Ресурс не найден.',
  notFoundUserError: 'Пользователь не найден.',
  notFoundArticleError: 'Статья не найдена.',
  unauthorizedError: 'Пожалуйста, пройдите авторизацию.',
  forbiddenToDeleteCardError: 'Вы не можете удалить карточку другого пользователя.',
};

module.exports.SERVER_ERRORS = {
  serverError: 'На сервере произошла ошибка.',
};

module.exports.REGEXP_PATTERNS = {
  nameRegexp: /^[a-zA-Zа-яёА-ЯЁ]{2,30}$/m,
  passwordRegexp: /^[a-zA-Z0-9!@#$%&*_+=`]{8,50}$/m,
};
