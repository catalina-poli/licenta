import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string ='';
  password : string = '';
  constructor(private loginService : LoginService, private router : Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  register(){
    this.userService.registerUser(this.username, this.password)
      .subscribe(
        newUser=> {
          console.log('new user saved: ', newUser);
        },
        err =>{
          console.log('could not save user, err = ', err);
        }
      );
  }

  login(){
    console.log('loggin in with username: ', this.username);
    console.log('password: ', this.password);
    this.loginService.obtainAccessToken(this.username, this.password)
      .subscribe(
        rez=>{
          console.log('login server zice: ', rez);
          localStorage.setItem('CHEIE_OAUTH', rez['access_token']);

          this.userService.getMyDetails()
            .subscribe(rez => {
               localStorage.setItem('MY_DETAILS', JSON.stringify(rez));
               let myRoles = this.userService.getMyRoles();
               console.log('MY ROLES ARE: ', myRoles);
            },
              err=>{
                console.log("Could not load my details: ", err);
              });
          this.router.navigate(['/anunturile'])
        },
        err=>{
          console.log('err: ', err);
        }
      );
  }

}
