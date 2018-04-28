import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material';

import { MovieService } from './services/movie.service';
import { UserService } from './services/user.service';
import { CommonService } from './services/common.service';
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  declarations: [],
  providers: [
  	MovieService,
  	UserService,
  	CommonService,
  	LoginService,
    AuthGuardService
  ]
})
export class SharedModule { }
