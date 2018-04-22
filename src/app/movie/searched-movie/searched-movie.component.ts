import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { MovieService } from '../../shared/services/movie.service'

@Component({
  selector: 'app-searched-movie',
  templateUrl: './searched-movie.component.html',
  styleUrls: ['./searched-movie.component.css']
})
export class SearchedMovieComponent implements OnInit {

  constructor(private route:ActivatedRoute, private movieService:MovieService, private spinner:Ng4LoadingSpinnerService) { }
  searchMovie;
  noMovies: boolean = false;
  moviesFound = [];
  similarMovies = [];
  ngOnInit() {
  	this.route.queryParams.subscribe(params=>{
      this.spinner.show();
  		this.searchMovie = params['movie'];
  		this.movieService.searchMovie(this.searchMovie)
  		                 .subscribe(response=>{
                         this.spinner.hide();
  		                 	let res = response.json();
  		                 	if(res.results.length > 0){
  		                 		this.moviesFound = res.results;
                          this.getSimilarMovies(res.results[0].id);
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
  	})
  }

  getSimilarMovies(movieId){
    this.movieService.getSimilarMovies(movieId)
                     .subscribe(response=>{
                       let res = response.json();
                       if(res.results.length > 0) {
                         this.similarMovies = res.results;
                       } else {
                         this.similarMovies = [];
                       }
                     },error=>{
                       this.similarMovies = [];
                     })
  }

}
