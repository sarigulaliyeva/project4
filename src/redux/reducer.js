const initialState = {
  movies: [],
  addMovies: [],
  linkActive: false,
  savedBolen:false,
};

export function reducer(state = initialState, { type, payload,id }) {
  switch (type) {
    case "SEARCH_MOVIE":
      return {
        ...state,
        movies: payload.movies,
      };

    case "ADD_MOVIES":
      let bol = true;
      const movie = state.movies.find((item) => item.imdbID === payload);
      state.addMovies.forEach((item) => {
        if (payload === item.imdbID) {
          bol = false;
        }
      });
      if (bol) {
        const addMovie = [...state.addMovies, { ...movie }];
        return {
          ...state,
          addMovies: addMovie,
        };
      } else {
        return state;
      }

    case "DELETE_MOVIES":
      let delMovie
      state.addMovies.forEach((item)=>{
        if(item.imdbID===id){
          delMovie=state.addMovies.filter(m=>m!==item)
        }
      })   
      return { ...state,
        addMovies: delMovie,
      };
      case "SET_LINKACTIVE":
        return { ...state, linkActive: payload };
      case "IS_SAVED":
        return {...state,savedBolen:true}
    default:
      return state;
  }
}
export default reducer;
