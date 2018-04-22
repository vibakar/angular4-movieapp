import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { MovieService } from '../../shared/services/movie.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent implements OnInit {
  nowPlayingMovies = [];
  topRatedMovies = [];
  upcomingMovies = [];
  userFavMovies = [];
  constructor(private movieService:MovieService, private userService:UserService, private spinner:Ng4LoadingSpinnerService) { }
  
  ngOnInit() {
    this.getUserFavMovies();
  }

 getUserFavMovies(){
   this.spinner.show()
   this.userService.getFavMovies()
                   .subscribe(response=>{
                     this.spinner.hide();
                     this.userFavMovies = response.json();
                     this.getNowPlayngMovies();
                     this.getTopRatedMovies();
                     this.getUpcomingMovies();
                   },error=>{
                     this.spinner.hide();
                     this.userFavMovies = [];
                     this.getNowPlayngMovies();
                     this.getTopRatedMovies();
                     this.getUpcomingMovies();
                   })
 }

 getNowPlayngMovies(){
   this.spinner.show();
   this.movieService.getNowPlayingMovies().subscribe(response=>{
     this.spinner.hide();
     if(response.json().results.length > 0){
       let data = response.json().results;
       this.checkForfav(data, this.nowPlayingMovies);
     } else {
       this.nowPlayingMovies = [];
     }
   },error=>{
     this.spinner.hide();
     this.nowPlayingMovies = [];
   })
 }

  getTopRatedMovies(){
   this.spinner.show();
   this.movieService.getTopRatedMovies().subscribe(response=>{
     this.spinner.hide();
     if(response.json().results.length > 0){
       let data = response.json().results;
       this.checkForfav(data, this.topRatedMovies);
     } else {
       this.topRatedMovies = [];
     }
   },error=>{
     this.spinner.hide();
     this.topRatedMovies = [];
   })
 }

 getUpcomingMovies(){
   this.spinner.show();
   this.movieService.getUpcomingMovies().subscribe(response=>{
     this.spinner.hide();
     if(response.json().results.length > 0){
       let data = response.json().results;
       this.checkForfav(data, this.upcomingMovies);
     } else {
       this.upcomingMovies = [];
     }
   },error=>{
     this.spinner.hide();
     this.upcomingMovies = [];
   })
 }

 checkForfav(actualData, finalData){
   if(this.userFavMovies.length > 0) {
    actualData.forEach((movie)=>{
       this.userFavMovies.forEach((favMovie)=>{
         if(favMovie.id === movie.id) {
             movie.fav = true;
             let movieExists = finalData.find(m=>m.id == movie.id);
             if (!movieExists) {
               finalData.push(movie);
             }
         } else {
             let movieExists = finalData.find(m=>m.id == movie.id);
             if (!movieExists) {
               finalData.push(movie);
             }
         }
       })
     })
  } else {
    actualData.forEach(movie=>{
      finalData.push(movie)
    })
  }
 }

}
