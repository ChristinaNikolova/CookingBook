import { global, auth, recipe } from "./constants/errors";

export const validator = {
  register: (values, touched) => {
    const errors = {};

    if (touched.email && !values.email) {
      errors["email"] = global.REQUIRED_INPUT;
    }

    // todo add constants
    const emailRegex = new RegExp(
      "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
    );

    if (touched.email && values.email && !emailRegex.test(values.email)) {
      errors["email"] = auth.INVALID_EMAIL;
    }

    if (touched.password && !values.password) {
      errors["password"] = global.REQUIRED_INPUT;
    }

    // todo add constants
    // тодо адд реяуиред в дб моделите
    if (
      (touched.password && values.password && values.password.length < 6) ||
      values.password.length > 50
    ) {
      // todo add constants
      errors["password"] = global.REQUIRED_MIN_MAX_LEN("Паролата", "6", "50");
    }

    if (
      touched.password &&
      touched.rePass &&
      values.password !== values.rePass
    ) {
      errors["password"] = auth.PASSWORDS_NOT_SAME;
      errors["rePass"] = auth.PASSWORDS_NOT_SAME;
    }

    return errors;
  },

  login: (values, touched) => {
    const errors = {};

    if (touched.email && !values.email) {
      errors["email"] = global.REQUIRED_INPUT;
    }

    if (touched.password && !values.password) {
      errors["password"] = global.REQUIRED_INPUT;
    }

    return errors;
  },

  recipe: (values, touched) => {
    const errors = {};

    if (touched.title && !values.title) {
      errors["title"] = global.REQUIRED_INPUT;
    }

    if (
      touched.title &&
      values.title &&
      (values.title.length < 3 || values.title.length > 50)
    ) {
      errors["title"] = global.REQUIRED_MIN_MAX_LEN("Заглавието", 3, 50);
    }

    if (touched.summary && !values.summary) {
      errors["summary"] = global.REQUIRED_INPUT;
    }

    if (touched.summary && values.summary && values.summary.length > 300) {
      errors["title"] = global.REQUIRED_MAX_LEN("Описанието", 300);
    }

    if (touched.neededTime && !values.neededTime) {
      errors["neededTime"] = global.REQUIRED_INPUT;
    }

    if (touched.portions && !values.portions) {
      errors["portions"] = global.REQUIRED_INPUT;
    }

    if (touched.portions && values.portions && Number(values.portions) <= 0) {
      errors["portions"] = recipe.REQUIRED_PORTIONS_POSITIVE_NUMBER;
    }

    // todo extend this
    if (touched.instruction && !values.instruction) {
      errors["instruction"] = global.REQUIRED_INPUT;
    }

    // todo extend this
    if (touched.ingredient && !values.ingredient) {
      errors["ingredient"] = global.REQUIRED_INPUT;
    }

    // todo extend this
    if (touched.image && !values.image) {
      errors["image"] = global.REQUIRED_INPUT;
    }

    return errors;
  },
};
