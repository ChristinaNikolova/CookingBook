import { global, auth } from "./constants/errors";

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

    if (
      (touched.password && values.password && values.password.length < 6) ||
      values.password.length > 50
    ) {
      errors["password"] = auth.PASSWORD_LEN;
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
};
