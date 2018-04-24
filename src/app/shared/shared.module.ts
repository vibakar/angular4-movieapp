import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieService } from './services/movie.service';
import { UserService } from './services/user.service';
import { CommonService } from './services/common.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
  	MovieService,
  	UserService,
  	CommonService
  ]
})
export class SharedModule { }
