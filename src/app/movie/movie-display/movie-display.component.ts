import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MovieService } from '../../shared/services/movie.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent implements OnInit {
  nowPlayingMovies = [];
  topRatedMovies = [];
  upcomingMovies = [];

  constructor(private movieService:MovieService, private spinner:Ng4LoadingSpinnerService) { }
  
  ngOnInit() {
    this.getNowPlayngMovies();
    this.getTopRatedMovies();
    this.getUpcomingMovies();
  }

 getNowPlayngMovies(){
   this.spinner.show();
   this.movieService.getNowPlayingMovies().subscribe(response=>{
     this.spinner.hide();
     if(response.json().results.length > 0){
       this.nowPlayingMovies = response.json().results;
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
       this.topRatedMovies = response.json().results;
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
       this.upcomingMovies = response.json().results;
     } else {
       this.upcomingMovies = [];
     }
   },error=>{
     this.spinner.hide();
     this.upcomingMovies = [];
   })
 }

}
