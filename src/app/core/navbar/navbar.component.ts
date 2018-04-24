import { Component, OnInit } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
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
}
