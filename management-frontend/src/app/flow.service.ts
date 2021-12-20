import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(private serviciuHttpClient: HttpClient, private loginService : LoginService, public dialog: MatDialog) { }

  findAllFlowByCerere(idCerere: number) : Observable<any[]>{
    return this.serviciuHttpClient.get<any[]>(`http://localhost:8080/rest/flow/by-cerere-id/${idCerere}`, this.loginService.configureHeaderOptionsForOAuth());
  }

}
