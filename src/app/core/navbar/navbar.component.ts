import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { CommonService } from '../../shared/services/common.service';
import { UserService } from '../../shared/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router, private loginService:LoginService, private commonService:CommonService, private userService:UserService) { }
  username: string;
  isLoggedIn: boolean = false;
  ngOnInit() {
    this.isLoggedIn = this.commonService.isLoggedIn();
    if(this.isLoggedIn){
      this.userService.getUsername().subscribe(response=>{
        this.username = response.json().username;
      })
    }
  }

  home() {
    this.router.navigate(['/']);
  }

  searchMovie(value){
  	if(value.length > 0){
  		this.router.navigate(['/search'],  { queryParams: { movie: value } });
  	}
  }

  favourites(){
    this.router.navigate(['/favourites']);
  }

  openLoginForm(){
    this.loginService.loginForm();
  }

  logout(){
    this.userService.logout().subscribe(response=>{
      this.commonService.deleteCookie("U_SESSION_ID");
      this.router.navigate(['/']);
      location.reload();
    },error=>{
      console.log("Something went wrong");
    })
  }
}
