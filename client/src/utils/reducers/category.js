export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "DELETE":
      return state.filter((x) => x.id !== action.payload);
    default:
      return state;
  }
};
