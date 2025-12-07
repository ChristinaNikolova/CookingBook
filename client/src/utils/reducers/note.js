export const noteReducer = (state, action) => {
  switch (action.type) {
    case "ALL":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    case "DELETE":
      return state.filter((x) => x.id !== action.payload);
    default:
      return state;
  }
};
