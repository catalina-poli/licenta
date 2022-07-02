import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { UserService } from '../user.service';

class User {
  id?: number;
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-useri',
  templateUrl: './useri.component.html',
  styleUrls: ['./useri.component.css']
})
export class UseriComponent implements OnInit {

  useri: User[] = [];
  useriNotConfirmed: User[] = [];
  userNou: User = new User();

  constructor(private serviciuHttpClient: HttpClient, private loginService: LoginService,
    private userService: UserService) { }


  refresh() {
    this.serviciuHttpClient.get<User[]>('http://localhost:8080/rest/useri/all', this.loginService.configureHeaderOptionsForOAuth())
      .subscribe(userii => {
        console.log('server zice: ', userii);
        this.useri = userii;
      });

    this.userService.findAllUsersByStatusNotYet()
      .subscribe(
        rez => {
          this.useriNotConfirmed = rez;
          console.log('useriNotConfirmed: ', this.useriNotConfirmed);
        },
        err => {
          console.log('err: ', err)
        }
      );
  }

  ngOnInit(): void {
    this.refresh();

  }

  register() {
    console.log('saving user: ', this.userNou);
    this.serviciuHttpClient.post('http://localhost:8080/rest/useri/register', this.userNou, this.loginService.configureHeaderOptionsForOAuth())
      .subscribe(raspuns => {
        console.log('raspuns server save user: ', raspuns);
        this.useri.push(raspuns);
      });
  }

  confirmUser(userId: number, status: number): void {
    this.userService.confirmUserAccount(userId, status)
      .subscribe(
        rez => {
          console.log('rez: ', rez);
          this.refresh();
        },
        err => {
          console.log('err: ', err)
        }
      );
  }
}

