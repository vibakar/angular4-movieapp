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
    this.getFavMovies();
  }

  getFavMovies(){
    this.spinner.show();
    this.userService.getFavMovies()
        .subscribe(response=>{
          this.spinner.hide();
          this.favMovies = response.json();
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

  removeFromFav(movie){
    this.userService.delFavMovie(movie.id)
        .subscribe(response=>{
          this.favMovies = this.favMovies.filter(m=>m.id!==movie.id);
          this.snackbar.open(response.json().response, 'OK', {
                            duration: 3000
                          }); 
        },error=>{
          if(error.json().code == 403){
            this.commonService.deleteCookie("U_SESSION_ID");
            this.router.navigate(['/']);
            location.reload();
          } else {
             this.snackbar.open(error.json().errMsg, 'OK', {
              duration: 3000
            }); 
          }
        })
  }

}
