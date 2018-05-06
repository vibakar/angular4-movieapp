import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MovieService {

  constructor(private http:Http) { }

  getNowPlayingMovies() {
  	return this.http.get('/v1/movie/nowPlaying')
  }

  getTopRatedMovies() {
  	return this.http.get('/v1/movie/topRated')
  }

  getUpcomingMovies() {
  	return this.http.get('/v1/movie/upcoming')
  }

  searchMovie(movie) {
    return this.http.get('/v1/movie/search?movie='+movie)
  }

  getMovieDetail(movieId){
    return this.http.get('/v1/movie/detail/'+movieId)
  }

  getSimilarMovies(movieId) {
    return this.http.get('/v1/movie/similar/'+movieId)
  }

}
