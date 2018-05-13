import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { MovieService } from '../../shared/services/movie.service';
import { CommonService } from '../../shared/services/common.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute, private movieService:MovieService, private spinner:Ng4LoadingSpinnerService, private commonService:CommonService, private userService:UserService) { }
  movieId;
  movieInfo;
  similarMovies = [];
  userFavMovies = [];
  arrMovieInfo = [];
  showMore:boolean = false;

  ngOnInit() {
    this.spinner.show();
  	this.route.params.subscribe(params=>{
  		this.movieId = params['id'];
      this.getUserFavMovies();
  	})
  }

  getUserFavMovies(){
   this.userFavMovies = [];
   this.userService.getFavMovies()
                   .subscribe(response=>{
                     this.userFavMovies = response.json();
                     this.getMovieDetail();
                     this.getSimilarMovies();
                   },error=>{
                     if(error.json().code == 403){
                        this.commonService.deleteCookie("U_SESSION_ID");
                        location.reload();
                      } else {
                        this.userFavMovies = [];
                        this.getMovieDetail();
                        this.getSimilarMovies();
                      }
                   })
 }

 getMovieDetail(){
    this.spinner.show();
    this.arrMovieInfo = [];
    this.movieService.getMovieDetail(this.movieId)
             .subscribe(response=>{
               this.spinner.hide();
               this.movieInfo = response.json();
               let data = [];
               data.push(this.movieInfo);
               this.commonService.checkForfav(this.userFavMovies, data, this.arrMovieInfo);
            },error=>{
              this.spinner.hide();
            })
  }

  getSimilarMovies(){
   this.spinner.show();
   this.similarMovies = [];
   this.movieService.getSimilarMovies(this.movieId).subscribe(response=>{
     this.spinner.hide();
     if(response.json().results.length > 0){
       let data = response.json().results;
       this.commonService.checkForfav(this.userFavMovies, data, this.similarMovies);
     } else {
       this.similarMovies = [];
     }
   },error=>{
     this.spinner.hide();
     this.similarMovies = [];
   })
 }

 toggleMoreInfo(){
   if(!this.showMore) {
     document.getElementById("detail").style.height = 'auto';
     this.showMore = true;
   } else {
     document.getElementById("detail").style.height = '280px';
     this.showMore = false;
   }
 }

}
