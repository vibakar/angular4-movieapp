import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieService } from './services/movie.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
  	MovieService,
  	UserService
  ]
})
export class SharedModule { }
