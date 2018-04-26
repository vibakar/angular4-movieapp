import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

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

  hideSignupPwd = true;
  hideSignupCPwd = true;
  hideLoginPwd = true;

  regex = {
    username: /^[a-zA-Z]{4,20}$/,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}/
  }

  errCheck = {
      usernameErr: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(this.regex.username)]),
      emailErr: new FormControl('', [Validators.required, Validators.pattern(this.regex.email)]),
      passwordErr: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(this.regex.password)]),
      confirmPasswordErr: new FormControl('', [Validators.required])
  }

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
    if(this.regex.username.test(this.signupInputs.username) && this.regex.email.test(this.signupInputs.email)
      && this.regex.password.test(this.signupInputs.password) && (this.signupInputs.password) && (this.signupInputs.password === this.signupInputs.confirmPassword)){
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

  getUsernameErr() {
    return this.errCheck.usernameErr.hasError('required') ? 'Name is required' :
            this.errCheck.usernameErr.hasError('minlength') ? 'Must contain minimum 4 characters' :
            this.errCheck.usernameErr.hasError('maxlength') ? 'Name cannot exceed 20 characters' :
            this.errCheck.usernameErr.hasError('pattern') ? 'Only letters are allowed' :
            '';
  }

  getEmailErr() {
    return this.errCheck.emailErr.hasError('required') ? 'Email is required' :
            this.errCheck.emailErr.hasError('pattern') ? 'Enter a valid Email' :
            '';
  }

  getPasswordErr() {
    return this.errCheck.passwordErr.hasError('required') ? 'Password is required' :
           this.errCheck.passwordErr.hasError('minlength') ? 'Must contain minimum 6 characters' :
           this.errCheck.passwordErr.hasError('maxlength') ? 'Password cannot exceed 20 characters' :
           this.errCheck.passwordErr.hasError('pattern') ? 'Should contain atleast 1 uppercase, 1 lowercase, 1 digits & 1 special characters' : 
           '';
  }

  getConfirmPasswordErr() {
    return this.errCheck.confirmPasswordErr.hasError('required') ? 'Confirm Password is required' :
           '';
  }
}
