import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCarouselModule } from 'ngx-carousel';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import 'hammerjs';

import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { MovieBannerComponent } from './movie-banner/movie-banner.component';

@NgModule({
  imports: [
    CommonModule,
    NgxCarouselModule,
    Ng4LoadingSpinnerModule.forRoot()
    ],
  declarations: [MovieDisplayComponent, MovieBannerComponent]
})
export class MovieModule { }
