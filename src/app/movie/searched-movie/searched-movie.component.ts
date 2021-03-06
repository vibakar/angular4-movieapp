import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { MovieService } from '../../shared/services/movie.service'
import { UserService } from '../../shared/services/user.service'
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-searched-movie',
  templateUrl: './searched-movie.component.html',
  styleUrls: ['./searched-movie.component.css']
})
export class SearchedMovieComponent implements OnInit {

  constructor(private route:ActivatedRoute, private movieService:MovieService, private userService: UserService, private commonService:CommonService, private spinner:Ng4LoadingSpinnerService) { }
  search;
  moviesFound = [];
  userFavMovies = [];

  ngOnInit() {
  	this.route.queryParams.subscribe(params=>{
      this.spinner.show();
  		this.search = params['movie'];
      if(this.commonService.isLoggedIn()){
        this.getUserFavMovies();
      } else {
        this.searchMovies();
      }
  	})
  }

  getUserFavMovies(){
     this.spinner.show()
     this.userService.getFavMovies()
                     .subscribe(response=>{
                       this.userFavMovies = response.json();
                       this.searchMovies();
                     },error=>{
                       this.userFavMovies = [];
                     })
 }

 searchMovies(){
   this.moviesFound = [];
   this.movieService.searchMovie(this.search)
                    .subscribe(response=>{
                       this.spinner.hide();
                       let res = response.json();
                       if(res.results.length > 0){
                         this.commonService.checkForfav(this.userFavMovies, res.results, this.moviesFound);
                       } else {
                         this.moviesFound = [];
                       }
                     },error=>{
                       this.spinner.hide();
                       this.moviesFound = [];
                     })
 }

}
