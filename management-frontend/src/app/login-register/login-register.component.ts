import { Component, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class LoginRegisterComponent  {
    title = 'demoApp';
    email:string | undefined;
    password:string | undefined;
    remail:string| undefined;
    rpassword:string| undefined;
    rcpassword:string| undefined;

  constructor(private snackBar:MatSnackBar){

  }
  register() {

  }
  login() {
    if(this.email=="admin" && this.password=="admin"){
        this.snackBar.open('Login Successful','',{duration:1000})
    }else{
      this.snackBar.open('Login error','',{duration:1000})
    }
  }

}
