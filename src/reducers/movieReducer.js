import constants from '../constants/actionTypes';

const initialState = {
  movies: [],
  selectedMovie: null
};

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FETCH_MOVIES:
      return {
        ...state,
        movies: action.movies,
        selectedMovie: action.movies[0] || null
      };

    case constants.SET_MOVIE:
      return {
        ...state,
        selectedMovie: action.selectedMovie
      };

    case constants.FETCH_MOVIE:
      return {
        ...state,
        selectedMovie: action.selectedMovie
      };

    case constants.ADD_REVIEW:
      // Append the new review into the selectedMovie.reviews array
      if (!state.selectedMovie) return state;
      return {
        ...state,
        selectedMovie: {
          ...state.selectedMovie,
          reviews: [
            ...(state.selectedMovie.reviews || []),
            action.review
          ]
        }
      };

    default:
      return state;
  }
}
