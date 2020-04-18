export const getTrails = (trails) => ({
  type: "GET_TRAILS",
  trails,
});

export const addFavorite = (id) => ({
  type: "ADD_FAVORITE",
  id,
});

export const deleteFavorite = (id) => ({
  type: "DELETE_FAVORITE",
  id,
});
