import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private userService:UserService) { }
  showsignupForm:boolean = true;
  showLoginForm:boolean = false;

  disableSignupBtn:boolean = true;
  disableLoginBtn:boolean = true;
  disableVcodeBtn:boolean = true;
  disableResendVcode:boolean = false;

  hideSignupPwd:boolean = true;
  hideSignupCPwd:boolean = true;
  hideLoginPwd:boolean = true;

  emailNotVerified:boolean = false;
  showSeconds:boolean = false;
  emailVerifyFailed = '';
  vcode = '';
  seconds = 100;

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

  signupFailMsg = '';
  loginFailMsg = '';

  ngOnInit() { }

  toggleForm(){
  	this.showsignupForm = !this.showsignupForm;
    this.showLoginForm = !this.showLoginForm;
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

  validateVcode(){
    if(this.vcode.trim().length == 6 ){
      this.disableVcodeBtn = false;
    } else {
      this.disableVcodeBtn = true;
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

  signup(){
    this.disableSignupBtn = true;
    this.userService.signup(this.signupInputs).subscribe(response=>{
      this.signupFailMsg = '';
      this.showsignupForm = false;
      this.emailNotVerified = true;
    },error=>{
      this.disableSignupBtn = false;
      this.signupFailMsg = (error.status == 504) ? "Service Unavailable,Try Later" : error.json().errMsg;
    })
  }

  login(){
    this.disableLoginBtn = true;
     this.userService.login(this.loginInputs).subscribe(response=>{
      this.loginFailMsg = '';
      this.dialogRef.close(true);
      location.reload();
    },error=>{
      this.disableLoginBtn = false;
       if(error.status == 504) {
         this.loginFailMsg = "Service Unavailable,Try Later";
       }
       if(error.json().code == 403) {
         this.loginFailMsg = error.json().errMsg;
         this.showsignupForm = false;
         this.showLoginForm = false;
         this.emailNotVerified = true;
       }
       else {
         this.loginFailMsg = error.json().errMsg;
       }
    })
  }

  verifyCode(){
    this.userService.verifyEmail({code: parseInt(this.vcode)}).subscribe(response=>{
      this.dialogRef.close(true);
      location.reload();
    },error=>{
      this.vcode = '';
      this.emailVerifyFailed = error.json().errMsg;
    })
  }

  resendVcode(){
    this.disableResendVcode = true;
    this.showSeconds = true;
    let interval = setInterval(()=>{
      this.seconds--;
      if(this.seconds == 0){
        this.seconds = 100;
        clearInterval(interval);
        this.disableResendVcode = false;
        this.showSeconds = false;
      }
    }, 1000)
    this.userService.resendVerificationCode().subscribe();
  }

}
