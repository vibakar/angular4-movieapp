import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

import { MovieService } from '../../shared/services/movie.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent implements OnInit {
  carouselTileItems: Array<any>;
  carouselTile: NgxCarousel;
  carouselBanner: NgxCarousel;
  nowPlayingMovies = [];
  topRatedMovies = [];
  constructor(private movieService:MovieService) { }
  
  ngOnInit() {
    this.getNowPlayngMovies();
    this.getTopRatedMovies();
    this.carouselBanner = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true,
         pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: white;
              width: 10px;
          }
        `
      },
      load: 2,
      loop: true,
      touch: true
    }

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

 getNowPlayngMovies(){
   this.movieService.getNowPlayingMovies().subscribe(response=>{
     if(response.json().results.length > 0){
       this.nowPlayingMovies = response.json().results;
     } else {
       this.nowPlayingMovies = [];
     }
   },error=>{
     this.nowPlayingMovies = [];
   })
 }

  getTopRatedMovies(){
   this.movieService.getTopRatedMovies().subscribe(response=>{
     if(response.json().results.length > 0){
       this.topRatedMovies = response.json().results;
     } else {
       this.topRatedMovies = [];
     }
   },error=>{
     this.topRatedMovies = [];
   })
 }

}