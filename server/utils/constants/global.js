const important = {
  CONNECTION_STRING: "mongodb://localhost:27017/cookingbook",
  SECRET: "my-very-secret",
};

const admin = {
  EMAIL: "admin@cookingbook.com",
  ID: "6933ad25118cc4e52f06bf98",
};

const messages = {
  REST_STARTED: "REST service started",
  REST_OPERATED: "REST service operational",
  DATABASE_CONNECTED: "Database connected",
};

const errors = {
  REQUEST: "Request error",
  INVALID_EMAIL: "Невалиден адрес",
  INVALID_IMAGE: "Невалидна картинка",
  NOT_AUTHOR(name, action) {
    return `Само авторът на ${name} може да ${action}`;
  },
  REQUIRED_INPUT: "Задължително поле",
  REQUIRED_MIN_LEN(name, value) {
    return `${name} трябва да е поне ${value} символа`;
  },
  REQUIRED_MAX_LEN(name, value) {
    return `${name} трябва да е до ${value} символа1`;
  },
  PASSWORD(min, max) {
    return `Паролата трябва да е между ${min} и ${max} символа`;
  },
  NAME_TAKEN: "Името вече съществува",
  TITEL_TAKEN: "Заглавието вече съществува",
  EMAIL_TAKEN: "Вече има регистриран потребител с този адрес",
  LOGIN: "Невалидни данни",
  NOT_LOGGED_IN: "Моля, влезте в профила си",
  ALREADY_LOGGED_IN: "Вие вече сте влезли в профила си",
  TOKEN_EXIST: "Token is blacklisted",
  TOKEN_INVALID: "Invalid authorization token",
  DATABASE: "Database error",
  DATABASE_CONNECTION: "Error connecting to database",
  DATABASE_ERROR: "Rollback started",
};

const filePaths = {
  CATEGORIES: "/uploads/categories/",
  RECIPES: "/uploads/recipes/",
};

const pagination = {
  RECIPES_PER_PAGE: 6,
};

module.exports = {
  important,
  admin,
  messages,
  errors,
  filePaths,
  pagination,
};
