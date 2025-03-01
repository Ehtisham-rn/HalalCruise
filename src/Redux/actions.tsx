export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const addToFavorites = (item) => {
  return {
    type: ADD_TO_FAVORITES,
    payload: item,
  };
};

export const removeFromFavorites = (item) => {
  return {
    type: REMOVE_FROM_FAVORITES,
    payload: item,
  };
};