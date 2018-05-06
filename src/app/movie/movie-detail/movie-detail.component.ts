import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute, private movieService:MovieService) { }
  movieId;
  ngOnInit() {
  	this.route.params.subscribe(params=>{
  		this.movieId = params['id'];
  		this.getMovieDetail();
  	})
  }

  getMovieDetail(){
  	this.movieService.getMovieDetail(this.movieId)
  					 .subscribe(response=>{
  					 	console.log("-------------",response.json())
	  				},error=>{
	  					console.log("============", error.json())
	  				})
  }
}
