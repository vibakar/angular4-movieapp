import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';
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
  carouselTile: NgxCarousel;
  noMovies: boolean = false;
  moviesFound = [];
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
  	this.route.queryParams.subscribe(params=>{
      this.spinner.show();
  		this.searchMovie = params['movie'];
  		this.movieService.searchMovie(this.searchMovie)
  		                 .subscribe(response=>{
                         this.spinner.hide();
  		                 	let res = response.json();
  		                 	if(res.results.length > 0){
  		                 		this.moviesFound = res.results;
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

}
