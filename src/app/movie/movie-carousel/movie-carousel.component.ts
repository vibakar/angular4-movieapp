import { Component, OnInit, Input } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { CommonService } from '../../shared/services/common.service';
import { LoginService }from '../../shared/services/login.service';

@Component({
  selector: 'movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css']
})
export class MovieCarouselComponent implements OnInit {
  carouselTile: NgxCarousel;
  @Input('movies') movies = [];
  @Input('type') type = '';
  userFavMovies = [];

  constructor(private router:Router, private userService:UserService, private loginService:LoginService, private snackbar: MatSnackBar, private commonService:CommonService) { }

  ngOnInit() {
    this.checkSessionStorage();
  	this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 5, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease',
      loop: true
    }
  }

  favAction(movie){
    let data = {
      "id": movie.id,
      "title": movie.title,
      "votes": movie.vote_count,
      "rating": movie.vote_average,
      "poster": movie.poster_path
    }
    if(this.commonService.isLoggedIn()){
        if(movie.fav){
            this.delMovieFromFav(movie);
          } else {
             this.addMovieToFav(movie);
          }
    } else {
        sessionStorage.setItem("movie", JSON.stringify(movie));
        this.loginService.loginForm();
    }
  }

  addMovieToFav(movie){
    let data = {
      "id": movie.id,
      "title": movie.title,
      "votes": movie.vote_count,
      "rating": movie.vote_average,
      "poster": movie.poster_path
    }
    this.userService.addMovie(data)
                    .subscribe(response=>{
                        movie.fav = true;
                        this.snackbar.open(response.json().response, 'OK', {
                          duration: 3000
                        });
                    },error=>{
                      this.snackbar.open(error.json().errMsg, 'OK', {
                          duration: 3000
                        });
                    })      
  }

  delMovieFromFav(movie){
    this.userService.delFavMovie(movie.id)
                    .subscribe(response=>{
                      movie.fav = false;
                      this.snackbar.open(response.json().response, 'OK', {
                          duration: 3000
                        }); 
                    },error=>{
                      if(error.json().code == 403){
                        this.commonService.deleteCookie("U_SESSION_ID");
                        this.router.navigate(['/']);
                        location.reload();
                      } else {
                         this.snackbar.open(error.json().errMsg, 'OK', {
                          duration: 3000
                        }); 
                      }
                    })
  }

  checkSessionStorage(){
    if(this.commonService.isLoggedIn()){
      let movie = sessionStorage.getItem("movie");
      if(movie){
        let data = JSON.parse(movie);
        sessionStorage.removeItem("movie");
        this.userService.getFavMovies().subscribe(response=>{
         let fav = response.json();
         let exists = fav.some(m=>m.id == data.id)
         if(!exists){
            this.addMovieToFav(data);
            this.router.navigate(['/favourites']);
         } else {
           this.router.navigate(['/favourites']);
           this.snackbar.open("Movie already exists in favourites", 'OK', {
                          duration: 3000
                        });
         }
        })
      }
    }
  }

}
