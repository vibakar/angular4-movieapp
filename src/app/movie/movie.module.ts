import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

import { MovieDisplayComponent } from './movie-display/movie-display.component';

@NgModule({
  imports: [
    CommonModule,
    NgxCarouselModule
    ],
  declarations: [MovieDisplayComponent]
})
export class MovieModule { }
