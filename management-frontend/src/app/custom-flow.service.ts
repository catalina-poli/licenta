import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { DtoSaveCustomFlow } from './model-dto/dto-save-custom-flow';
import { CustomFlowModel } from './model/custom-flow';

@Injectable({
  providedIn: 'root'
})
export class CustomFlowService {

  constructor(private serviciuHttpClient: HttpClient, private loginService : LoginService, public dialog: MatDialog) { }

  findAllMyCustomFlow() : Observable<CustomFlowModel[]>{
    return this.serviciuHttpClient.get<CustomFlowModel[]>(`http://localhost:8080/rest/custom-flow/my-custom-flows`, this.loginService.configureHeaderOptionsForOAuth());
  }

  saveCustomFlow(customFlowDto: DtoSaveCustomFlow): Observable<CustomFlowModel>{
    return this.serviciuHttpClient.post<CustomFlowModel>(`http://localhost:8080/rest/custom-flow/save-flow`, customFlowDto, this.loginService.configureHeaderOptionsForOAuth());

  }

  // openDialog(message : string, flowItem: any, status: boolean): Observable<any> {
  //   const dialogRef = this.dialog.open(CereriFlowMyStatusDialogComponent, {
  //     width: '250px',
  //     data: {message : message, rezultat : {}, flowItem: flowItem, status: status} 
  //   });

  //   return dialogRef.afterClosed();
  // }

}
