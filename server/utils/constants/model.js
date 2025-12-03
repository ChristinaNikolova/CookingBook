const category = {
  NAME_MIN_LEN: 3,
  NAME_MAX_LEN: 30,
  DESC_MAX_LEN: 300,
};

const ingredient = {
  DESC_MIN_LEN: 3,
  DESC_MAX_LEN: 30,
};

const instruction = {
  DESC_MIN_LEN: 3,
  DESC_MAX_LEN: 3000,
};

const note = {
  DESC_MAX_LEN: 500,
};

const recipe = {
  TITLE_MIN_LEN: 3,
  TITLE_MAX_LEN: 50,
  SUMMARY_MAX_LEN: 300,
  NEEDED_TIME_MAX_LEN: 20,
  PORTIONS_MIN: 1,
};

const user = {
  PASSWORD_MIN_LEN: 6,
  PASSWORD_MAX_LEN: 50,
};

module.exports = {
  category,
  ingredient,
  instruction,
  recipe,
  user,
};
