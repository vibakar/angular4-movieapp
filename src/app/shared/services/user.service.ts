import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  signup(data){
    return this.http.post("/v1/user/signUp", data);
  }

  login(data){
    return this.http.post("/v1/user/login", data);
  }

  logout(){
    return this.http.get("/v1/user/logout");
  }

  addMovie(movie){
  	return this.http.post("/v1/user/addMovie", movie);
  }

  getFavMovies(){
  	return this.http.get("/v1/user/favMovies");
  }

  delFavMovie(movieId){
  	return this.http.delete("/v1/user/delMovie/"+movieId)
  }

  getUsername(){
    return this.http.get("/v1/user/username")
  }

  verifyEmail(data){
    return this.http.post("/v1/user/verifyEmail", data)
  }

  resendVerificationCode(){
    return this.http.get("/v1/user/resendCode");
  }
}
