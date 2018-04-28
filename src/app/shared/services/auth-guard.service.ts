import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CommonService } from './common.service';


@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private commonService:CommonService) { 
  }

  canActivate(route, state:RouterStateSnapshot){
  	if(this.commonService.isLoggedIn()){
  		return  true;
  	} else {
  		this.router.navigate(['/']);
  		return false;
  	}
}
