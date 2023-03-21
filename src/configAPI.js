export const fetcher = async (...args) => {
  try {
    const response = await fetch(...args);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
const apiKey = "01de1c9a3d41ba94cfaba01e1c6d733f";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieDetail: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
  searchMovie: (queryDebounce, nextPage) =>
    `${tmdbEndpointSearch}?api_key=${apiKey}&query=${queryDebounce}&page=${nextPage}`,
};
