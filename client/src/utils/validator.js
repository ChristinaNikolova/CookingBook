import { global, auth, recipe } from "./constants/errors";
import { auth as authModel, recipe as recipeModel } from "./constants/models";

export const validator = {
  register: (values, touched) => {
    const errors = {};

    if (touched.email && !values.email) {
      errors["email"] = global.REQUIRED_INPUT;
    }

    const emailRegex = new RegExp(
      "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
    );

    if (touched.email && values.email && !emailRegex.test(values.email)) {
      errors["email"] = auth.INVALID_EMAIL;
    }

    if (touched.password && !values.password) {
      errors["password"] = global.REQUIRED_INPUT;
    }

    // todo адд реяуиред в дб моделите
    if (
      (touched.password &&
        values.password &&
        values.password.length < authModel.PASSWORD_MIN_LEN) ||
      values.password.length > authModel.PASSWORD_MAX_LEN
    ) {
      errors["password"] = global.REQUIRED_MIN_MAX_LEN(
        "Паролата",
        authModel.PASSWORD_MIN_LEN,
        authModel.PASSWORD_MAX_LEN
      );
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
      (values.title.length < recipeModel.TITLE_MIN_LEN ||
        values.title.length > recipeModel.TITLE_MAX_LEN)
    ) {
      errors["title"] = global.REQUIRED_MIN_MAX_LEN(
        "Заглавието",
        recipeModel.TITLE_MIN_LEN,
        recipeModel.TITLE_MAX_LEN
      );
    }

    if (touched.summary && !values.summary) {
      errors["summary"] = global.REQUIRED_INPUT;
    }

    if (
      touched.summary &&
      values.summary &&
      values.summary.length > recipeModel.SUMMARY_MAX_LEN
    ) {
      errors["title"] = global.REQUIRED_MAX_LEN(
        "Описанието",
        recipeModel.SUMMARY_MAX_LEN
      );
    }

    if (touched.neededTime && !values.neededTime) {
      errors["neededTime"] = global.REQUIRED_INPUT;
    }

    if (touched.portions && !values.portions) {
      errors["portions"] = global.REQUIRED_INPUT;
    }

    if (
      touched.portions &&
      values.portions &&
      Number(values.portions) < recipeModel.PORTIONS_MIN
    ) {
      errors["portions"] = recipe.REQUIRED_PORTIONS_POSITIVE_NUMBER;
    }

    // todo extend this + db
    if (touched.image && !values.image) {
      errors["image"] = global.REQUIRED_INPUT;
    }

    return errors;
  },

  // todo add trim everywhere
  // todo check server + db
  validateInstruction: (value) => {
    if (!value.trim()) {
      return global.REQUIRED_INPUT;
    }

    if (
      value.length < recipeModel.INSTRUCTION_MIN_LEN ||
      value.length > recipeModel.INSTRUCTION_MAX_LEN
    ) {
      return global.REQUIRED_MIN_MAX_LEN(
        "Инструкцията",
        recipeModel.INSTRUCTION_MIN_LEN,
        recipeModel.INSTRUCTION_MAX_LEN
      );
    }

    return "";
  },

  validateIngredient: (value) => {
    if (!value.trim()) {
      return global.REQUIRED_INPUT;
    }

    if (
      value.length < recipeModel.INGREDIENT_MIN_LEN ||
      value.length > recipeModel.INGREDIENT_MAX_LEN
    ) {
      return global.REQUIRED_MIN_MAX_LEN(
        "Продуктът",
        recipeModel.INGREDIENT_MIN_LEN,
        recipeModel.INGREDIENT_MAX_LEN
      );
    }

    return "";
  },
};
