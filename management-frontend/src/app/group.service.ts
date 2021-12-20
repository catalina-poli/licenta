import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private serviciuHttpClient: HttpClient, private loginService : LoginService, public dialog: MatDialog) { }

  findAllGroups() : Observable<any[]>{
    return this.serviciuHttpClient.get<any[]>(`http://localhost:8080/rest/groups/all`, this.loginService.configureHeaderOptionsForOAuth());
  }

  removeUserFromGroup(idUser: number, idGroup: number): Observable<any>{
    // /remove-user/{idUser}/{idGroup}
    return this.serviciuHttpClient.delete(`http://localhost:8080/rest/groups/remove-user/${idUser}/${idGroup}`, this.loginService.configureHeaderOptionsForOAuth());
  }
  addUserToGroup(idUser: number, idGroup: number): Observable<any>{
    // /remove-user/{idUser}/{idGroup}
    return this.serviciuHttpClient.post(`http://localhost:8080/rest/groups/add-user/${idUser}/${idGroup}`, {}, this.loginService.configureHeaderOptionsForOAuth());
  }
}
