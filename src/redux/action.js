import axios from "axios";

export function fetchMovies(name) {
  return (dispatch) => {
    return axios
      .get(`http://www.omdbapi.com/?s=${name}&apikey=a91ebceb`)
      .then((res) => {
        dispatch(searchMovies(res.data.Search));
      });
  };
}

export function searchMovies(movies) {
  return {
    type: "SEARCH_MOVIE",
    payload: {movies
      : movies,
    },
  };
}

export function selectMovies(payload) {
  return {
    type: "ADD_MOVIES",
    payload
  };
}

export function deleteMovies(id) {
  return {
    type: "DELETE_MOVIES",
    id,
  };
}

export function isSaved(){
  return{
    type:"IS_SAVED",
  }
}

export const setLinkActive = (payload) => ({
  type: "SET_LINKACTIVE",
  payload,
});

