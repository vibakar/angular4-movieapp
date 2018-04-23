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
  noMovies: boolean = false;
  moviesFound = [];
  similarMovies = [];
  userFavMovies = [];

  ngOnInit() {
    this.getUserFavMovies();
  	this.route.queryParams.subscribe(params=>{
      this.spinner.show();
  		this.search = params['movie'];
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
                       this.searchMovies();
                     })
 }

 searchMovies(){
   this.movieService.searchMovie(this.search)
                    .subscribe(response=>{
                       this.spinner.hide();
                       let res = response.json();
                       if(res.results.length > 0){
                         this.getSimilarMovies(res.results[0].id);
                         this.commonService.checkForfav(this.userFavMovies, res.results, this.moviesFound);
                         this.noMovies = false;
                       } else {
                         this.noMovies = true;
                         this.moviesFound = [];
                       }
                     },error=>{
                       this.spinner.hide();
                       this.noMovies = true;
                       this.moviesFound = [];
                     })
 }

 getSimilarMovies(movieId){
    this.movieService.getSimilarMovies(movieId)
                     .subscribe(response=>{
                       let res = response.json();
                       if(res.results.length > 0) {
                         this.commonService.checkForfav(this.userFavMovies, res.results, this.similarMovies)
                       } else {
                         this.similarMovies = [];
                       }
                     },error=>{
                       this.similarMovies = [];
                     })
  }

}
