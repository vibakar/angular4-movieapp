import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  signup(data){
    return this.http.post("/v1/user/signup", data);
  }

  login(data){
    return this.http.post("/v1/user/login", data);
  }

  addMovie(movie){
  	return this.http.post("/v1/user/addmovie", movie);
  }

  getFavMovies(){
  	return this.http.get("/v1/user/favmovies");
  }

  delFavMovie(movieId){
  	return this.http.delete("/v1/user/delmovie/"+movieId)
  }
}
