
const API_KEY = "7fe9afe2576186427d619bec08f6fd7c"

const requests = {   
    fetchTrending : `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchTopRated : `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals : `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTvShows : `/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1  `
    
    // // fetchActionMovies : `/discovery/movie?api_key=${API_KEY}&with_genres=28`,
    // fetchComedyMovies : `/discovery/movie?api_key=${API_KEY}&with_genres=35`,
    // fetchHorrorMovies : `/discovery/movie?api_key=${API_KEY}&with_genres=27`,
    // fetchRomanceMovies : `/discovery/movie?api_key=${API_KEY}&with_genres=10749`,
    // fetchDocumentaries : `/discovery/movie?api_key=${API_KEY}&with_genres=99`,
}

export default requests;