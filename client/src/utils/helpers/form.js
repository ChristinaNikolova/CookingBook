export const formHelpers = {
  prepareData: (values, files) => {
    const trimmedValues = formHelpers.trimValues(values);
    const hasFiles = files && Object.keys(files).some((key) => files[key]);

    if (hasFiles) {
      const formData = new FormData();

      Object.keys(trimmedValues).forEach((key) => {
        formData.append(key, files[key] || trimmedValues[key]);
      });

      return formData;
    }

    return trimmedValues;
  },

  trimValues: (values) => {
    return Object.keys(values).reduce((acc, curr) => {
      acc[curr] = formHelpers.trimValue(values[curr]);
      return acc;
    }, {});
  },

  trimValue: (value) => {
    return typeof value === "string" ? value.trim() : value;
  },
};
