import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  addMovie(movie){
  	return this.http.post("/v1/users/addmovie", movie);
  }

  getFavMovies(){
  	return this.http.get("/v1/users/favmovies");
  }

  delFavMovie(movieId){
  	return this.http.delete("/v1/users/delmovie/"+movieId)
  }
}
