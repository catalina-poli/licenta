import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  constructor(private serviciuHttpClient: HttpClient, private loginService : LoginService, public dialog: MatDialog) { }

  // TODO: find all users of type (e.g. studenti, profesori etc.)
  findAllUsers() : Observable<any[]>{
    return this.serviciuHttpClient.get<any[]>(`http://localhost:8080/rest/useri/all`, this.loginService.configureHeaderOptionsForOAuth());
  }
}
