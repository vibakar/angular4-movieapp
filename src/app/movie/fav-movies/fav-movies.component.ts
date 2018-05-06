import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { MatSnackBar } from '@angular/material';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-fav-movies',
  templateUrl: './fav-movies.component.html',
  styleUrls: ['./fav-movies.component.css']
})
export class FavMoviesComponent implements OnInit {
  favMovies = [];
  carouselTile: NgxCarousel;
  constructor(private router:Router, private userService:UserService, private commonService:CommonService, private snackbar: MatSnackBar, private spinner:Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getFavMovies();
  }

  getFavMovies(){
    this.spinner.show();
    this.userService.getFavMovies()
        .subscribe(response=>{
          this.spinner.hide();
          response.json().forEach(movie=>{
            this.favMovies.push({
              "id": movie.id,
              "title": movie.title,
              "vote_count": movie.votes,
              "vote_average": movie.rating,
              "backdrop_path": movie.poster,
              "fav": true,
              "fromFav": true
            });
          });
        },error=>{
          this.spinner.hide();
          if(error.json().code == 403){
            this.commonService.deleteCookie("U_SESSION_ID");
            this.router.navigate(['/']);
            location.reload();
          } else {
             this.snackbar.open(error.json().errMsg, 'OK', {
              duration: 3000
            }); 
          }
          this.favMovies = [];
        })
  }

}
