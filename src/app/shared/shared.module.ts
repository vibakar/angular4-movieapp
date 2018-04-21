import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieService } from './services/movie.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
  	MovieService
  ]
})
export class SharedModule { }
