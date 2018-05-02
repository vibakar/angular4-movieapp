import { Component, OnInit } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { MovieService } from '../../shared/services/movie.service';
import { UserService } from '../../shared/services/user.service';
import { CommonService } from '../../shared/services/common.service';

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
  constructor(private movieService:MovieService, private userService:UserService, private commonService:CommonService, private spinner:Ng4LoadingSpinnerService) { }
  
  ngOnInit() {
    if(this.commonService.isLoggedIn()){
      this.getUserFavMovies();
    } else {
       this.getNowPlayngMovies();
       this.getTopRatedMovies();
       this.getUpcomingMovies();
    }
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
                     if(error.json().code == 403){
                        this.commonService.deleteCookie("U_SESSION_ID");
                        location.reload();
                      }
                   })
 }

 getNowPlayngMovies(){
   this.spinner.show();
   this.movieService.getNowPlayingMovies().subscribe(response=>{
     this.spinner.hide();
     if(response.json().results.length > 0){
       let data = response.json().results;
       this.commonService.checkForfav(this.userFavMovies, data, this.nowPlayingMovies);
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
       this.commonService.checkForfav(this.userFavMovies, data, this.topRatedMovies);
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
       this.commonService.checkForfav(this.userFavMovies, data, this.upcomingMovies);
     } else {
       this.upcomingMovies = [];
     }
   },error=>{
     this.spinner.hide();
     this.upcomingMovies = [];
   })
 }

}
