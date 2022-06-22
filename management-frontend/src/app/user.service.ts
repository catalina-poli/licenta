import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private serviciuHttpClient: HttpClient, private loginService: LoginService, public dialog: MatDialog) { }

  // TODO: find all users of type (e.g. studenti, profesori etc.)
  findAllUsers(): Observable<any[]> {
    return this.serviciuHttpClient.get<any[]>(`http://localhost:8080/rest/useri/all`, this.loginService.configureHeaderOptionsForOAuth());
  }

  findAllUsersForCerere(): Observable<any[]> {
    return this.serviciuHttpClient.get<any[]>(`http://localhost:8080/rest/useri/all-cerere`, this.loginService.configureHeaderOptionsForOAuth());
  }

  findAllUsersForCustomFlowAddMember(customFlowId: number): Observable<any[]> {
    return this.serviciuHttpClient.get<any[]>(`http://localhost:8080/rest/useri/all-users-for-add-to-flow/${customFlowId}`, this.loginService.configureHeaderOptionsForOAuth());
  }
  

  registerUser(username: string, password: string, type: string, nume: string, prenume: string, phone: string, selectedRoles: any[]): Observable<any> {
    const userObj = {
      "email": username,
      "password": password,
      status: type,
      nume: nume, 
      prenume: prenume, 
      phone: phone,
      selectedRoles : selectedRoles
    };
    return this.serviciuHttpClient.post(`http://localhost:8080/security/useri/register`, userObj);
  }

  getMyDetails(): Observable<any> {
    return this.serviciuHttpClient.get<any[]>(`http://localhost:8080/rest/useri/my-details`, this.loginService.configureHeaderOptionsForOAuth());
  }

  getMyRoles() {
    const details = localStorage.getItem('MY_DETAILS');
    let userDetails = JSON.parse(details ? details : '{}');
    let roles: any[] = []//userDetails.userRoles.map(x => x['roleName']);
    if (userDetails.userRoles && userDetails.userRoles.length > 0) {
      for (let r of userDetails.userRoles) {
        roles.push(r['roleName']);
      }
    }
    return roles;
  }
  canISee(okRoles: string[]): boolean {
    let roles = this.getMyRoles();
    for (let okRole of okRoles) {
      if (roles.indexOf(okRole) != -1) {
        return true;
      }
    }

    return false;
  }
}
