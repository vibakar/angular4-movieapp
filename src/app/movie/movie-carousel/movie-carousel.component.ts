import { Component, OnInit, Input } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { MatSnackBar } from '@angular/material';

import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css']
})
export class MovieCarouselComponent implements OnInit {
  carouselTile: NgxCarousel;
  @Input('movies') movies = [];
  @Input('type') type = '';

  constructor(private userService:UserService, private snackbar: MatSnackBar) { }

  ngOnInit() {
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

  addMovieToFav(movie){
    let data = {
      "id": movie.id,
      "title": movie.original_title,
      "votes": movie.vote_count,
      "rating": movie.vote_average,
      "poster": movie.poster_path
    }
    if(movie.fav){
      this.userService.delFavMovie(movie.id)
                      .subscribe(response=>{
                        movie.fav = false;
                        this.snackbar.open(response.json().response, 'OK', {
                            duration: 3000
                          }); 
                      },error=>{
                        this.snackbar.open(error.json().errMsg, 'OK', {
                            duration: 3000
                          }); 
                      })
    } else {
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

  }

}
