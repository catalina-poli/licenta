import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string ='';
  password : string = '';
  constructor(private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {
  }

  login(){
    console.log('loggin in with username: ', this.username);
    console.log('password: ', this.password);
    this.loginService.obtainAccessToken(this.username, this.password)
      .subscribe(
        rez=>{
          console.log('login server zice: ', rez);
          localStorage.setItem('CHEIE_OAUTH', rez['access_token']);
          this.router.navigate(['/anunturile'])
        },
        err=>{
          console.log('err: ', err);
        }
      );
  }

}
