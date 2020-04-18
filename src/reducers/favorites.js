export const favorites = (state = [], action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return [action.id, ...state];
    case "DELETE_FAVORITE":
      return state.filter((id) => id !== action.id);
    default:
      return state;
  }
};
