const important = {
  CONNECTION_STRING: "mongodb://localhost:27017/cookingbook",
  SECRET: "my-very-secret",
};

const emails = {
  ADMIN: "admin@cookingbook.com",
};

const messages = {
  REST_STARTED: "REST service started",
  REST_OPERATED: "REST service operational",
  DATABASE_CONNECTED: "Database connected",
};

const errors = {
  REQUEST: "Request error",
  INVALID_URL: "Невалиден URL",
  INVALID_EMAIL: "Невалиден адрес",
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
};

module.exports = {
  important,
  emails,
  messages,
  errors,
};
