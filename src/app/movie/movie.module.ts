import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCarouselModule } from 'ngx-carousel';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { MovieBannerComponent } from './movie-banner/movie-banner.component';
import { SearchedMovieComponent } from './searched-movie/searched-movie.component';
import { MovieCarouselComponent } from './movie-carousel/movie-carousel.component';
import { FavMoviesComponent } from './fav-movies/fav-movies.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';


@NgModule({
  imports: [
    CommonModule,
    NgxCarouselModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forChild([{
    	path:'search',
    	component: SearchedMovieComponent
    },{
        path:'favourites',
        component: FavMoviesComponent,
        canActivate: [AuthGuardService]
    },{
        path: 'detail/:id',
        component: MovieDetailComponent
    }])
    ],
  declarations: [MovieDisplayComponent, MovieBannerComponent, SearchedMovieComponent, MovieCarouselComponent, FavMoviesComponent, MovieDetailComponent]
})
export class MovieModule { }
