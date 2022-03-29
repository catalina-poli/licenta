import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { Mesaj } from './model/mesaj';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private serviciuHttpClient: HttpClient, private loginService: LoginService, public dialog: MatDialog) { }

  // TODO: find all users of type (e.g. studenti, profesori etc.)
  findMyMessages(): Observable<Mesaj[]> {
    return this.serviciuHttpClient.get<Mesaj[]>(`http://localhost:8080/rest/messages/by-user-logged-in`, this.loginService.configureHeaderOptionsForOAuth());
  }

  deleteMessage(m: Mesaj) : Observable<Mesaj>{
    return this.serviciuHttpClient.delete<Mesaj>(`http://localhost:8080/rest/messages/delete/${m.id}`, this.loginService.configureHeaderOptionsForOAuth());

  }
}
