import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  registerStatusTypes: string[] = ['MILITAR', 'CIVIL'];
  registerStatusTypeSelected: string = 'CIVIL';

  registerNume: string = '';
  registerPrenume: string = '';
  registerPhone: string = '';
  roles: any[] = [];
  selectedRoles: any[] = [];

  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  constructor(private loginService: LoginService, private router: Router, private userService: UserService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginService.findAllRoles()
      .subscribe(
        rez => {
          this.roles = rez;
          console.log('all roles: ', this.roles);
        },
        err => {
          console.log('err: ', err);
        }
      );
  }

  register() {
    if(!this.username || !this.password || !this.registerNume
      || !this.registerPrenume
      || !this.registerPhone
      || this.selectedRoles.length == 0){
      this.openSnackBar('Toate field-urile sunt obligatorii', 'Close');
      return;
    }
    this.userService.registerUser(this.username, this.password,
       this.registerStatusTypeSelected,
       this.registerNume,
       this.registerPrenume,
       this.registerPhone,
       this.selectedRoles)
      .subscribe(
        newUser => {
          console.log('new user saved: ', newUser);
        },
        err => {
          console.log('could not save user, err = ', err);
        }
      );
  }

  login() {
    console.log('loggin in with username: ', this.username);
    console.log('password: ', this.password);

    if(!this.username || !this.password){
      this.openSnackBar('Email si parola obligatorii', 'Close');
      return;
    }
    this.loginService.obtainAccessToken(this.username, this.password)
      .subscribe(
        rez => {
          console.log('login server zice: ', rez);
          localStorage.setItem('CHEIE_OAUTH', rez['access_token']);

          this.userService.getMyDetails()
            .subscribe(rez => {
              localStorage.setItem('MY_DETAILS', JSON.stringify(rez));
              let myRoles = this.userService.getMyRoles();
              console.log('MY ROLES ARE: ', myRoles);
            },
              err => {
                console.log("Could not load my details: ", err);
              });
          this.router.navigate(['/anunturile'])
        },
        err => {
          console.log('err: ', err);
        }
      );
  }

}
