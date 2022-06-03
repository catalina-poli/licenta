import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CereriFlowMyStatusDialogComponent } from './cereri-flow-my-status-dialog/cereri-flow-my-status-dialog.component';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(private serviciuHttpClient: HttpClient, private loginService : LoginService, public dialog: MatDialog) { }

  findAllFlowByCerere(idCerere: number) : Observable<any[]>{
    return this.serviciuHttpClient.get<any[]>(`http://localhost:8080/rest/flow/by-cerere-id/${idCerere}`, this.loginService.configureHeaderOptionsForOAuth());
  }
  findAllFlowByCerereDetailed(idCerere: number) : Observable<any[]>{
    return this.serviciuHttpClient.get<any[]>(`http://localhost:8080/rest/flow/by-cerere-detailed-id/${idCerere}`, this.loginService.configureHeaderOptionsForOAuth());
  }

  findAllFlowByMe():  Observable<any[]>{
    return this.serviciuHttpClient.get<any[]>(`http://localhost:8080/rest/cerere/flow/accept-refuse/by-me`, this.loginService.configureHeaderOptionsForOAuth());
  }
  findAllFlowPrevious():  Observable<any[]>{
    return this.serviciuHttpClient.get<any[]>(`http://localhost:8080/rest/cerere/flow/to-be-seen-by-me`, this.loginService.configureHeaderOptionsForOAuth());
  }


  modifyFlowItemStatus(dto: any){
    return this.serviciuHttpClient.put(`http://localhost:8080/rest/flow/update-status`, dto, this.loginService.configureHeaderOptionsForOAuth());
  }

  openDialog(message : string, flowItem: any, status: boolean): Observable<any> {
    const dialogRef = this.dialog.open(CereriFlowMyStatusDialogComponent, {
      width: '250px',
      data: {message : message, rezultat : {}, flowItem: flowItem, status: status} 
    });

    return dialogRef.afterClosed();
  }

}
