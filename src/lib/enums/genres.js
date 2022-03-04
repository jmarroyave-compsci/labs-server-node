const START_YEAR = 1880;

export const getGenres = ( { all=true } ) => { 
  var data = [
        "all",
        "Action",
        "Adult",
        "Adventure",
        "Animation",
        "Biography",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "Film-Noir",
        "Game-Show",
        "History",
        "Horror",
        "Music",
        "Musical",
        "Mystery",
        "News",
        "Reality-TV",
        "Romance",
        "Sci-Fi",
        "Short",
        "Sport",
        "Talk-Show",
        "Thriller",
        "War",
        "Western"
  ].map( m => m.toLowerCase())

  if( !all ){
    data = data.filter( d => d != "all")    
  }
  
  return data;
}