export const global = {
  REQUIRED_INPUT: "Полето е задължително",
  REQUIRED_MAX_LEN(name, max) {
    return `${name} трябва да е до ${max} символа`;
  },
  REQUIRED_MIN_MAX_LEN(name, min, max) {
    return `${name} трябва да е между ${min} и ${max} символа`;
  },
};

export const auth = {
  INVALID_EMAIL: "Невалиден имейл адрес",
  PASSWORDS_NOT_SAME: "Двете пароли не са еднакви",
};

export const recipe = {
  REQUIRED_PORTIONS_POSITIVE_NUMBER: "Порциите трябва да са положително число",
};
