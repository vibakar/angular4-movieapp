import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCarouselModule } from 'ngx-carousel';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { RouterModule } from '@angular/router';
import 'hammerjs';

import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { MovieBannerComponent } from './movie-banner/movie-banner.component';
import { SearchedMovieComponent } from './searched-movie/searched-movie.component';

@NgModule({
  imports: [
    CommonModule,
    NgxCarouselModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule.forChild([{
    	path:'search',
    	component: SearchedMovieComponent
    }])
    ],
  declarations: [MovieDisplayComponent, MovieBannerComponent, SearchedMovieComponent]
})
export class MovieModule { }
