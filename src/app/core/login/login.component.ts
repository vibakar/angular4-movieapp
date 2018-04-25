import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { environment }  from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }
  showsignupForm:boolean = true;
  disableSignupBtn:boolean = true;
  disableLoginBtn:boolean = true;
  usernameTooltip:string = environment.tooltip.username;
  passwordTooltip:string = environment.tooltip.password;
  signupInputs = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  loginInputs = {
    email: '',
    password: ''
  }

  ngOnInit() { }

  toggleForm(){
  	this.showsignupForm = !this.showsignupForm;
  }

  validateSignupForm(){
    if(environment.regex.username.test(this.signupInputs.username) && environment.regex.email.test(this.signupInputs.email)
      && environment.regex.password.test(this.signupInputs.password) && (this.signupInputs.password) && (this.signupInputs.password === this.signupInputs.confirmPassword)){
      this.disableSignupBtn = false;
    }else{
      this.disableSignupBtn = true;
    }
  }

  validateLoginForm(){
    if(this.loginInputs.email && this.loginInputs.password){
      this.disableLoginBtn = false;
    } else {
      this.disableLoginBtn = true;
    }
  }
}
