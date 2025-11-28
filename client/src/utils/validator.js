export const validator = {
  register: (values, touched) => {
    const errors = {};

    if (touched.email && !values.email) {
      errors["email"] = "Полето е задължително";
    }

    const emailRegex = new RegExp(
      "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$"
    );

    if (touched.email && values.email && !emailRegex.test(values.email)) {
      errors["email"] = "Невалиден имейл адрес";
    }

    if (touched.password && !values.password) {
      errors["password"] = "Полето е задължително";
    }

    if (
      (touched.password && values.password && values.password.length < 6) ||
      values.password.length > 50
    ) {
      errors["password"] = "Паролата трябва да е между 6 и 50 символа";
    }

    if (
      touched.password &&
      touched.rePass &&
      values.password !== values.rePass
    ) {
      errors["password"] = "Двете пароли не са еднакви";
      errors["rePass"] = "Двете пароли не са еднакви";
    }

    return errors;
  },
};
