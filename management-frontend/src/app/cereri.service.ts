import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddCerereComponent } from './add-cerere/add-cerere.component';
import { LoginService } from './login.service';
import { Cerere } from './model/cerere';

@Injectable({
  providedIn: 'root'
})
export class CereriService {

  constructor(private serviciuHttpClient: HttpClient, private loginService : LoginService, public dialog: MatDialog) { }

  findAllCereri() : Observable<Cerere[]>{
    return this.serviciuHttpClient.get<Cerere[]>('http://localhost:8080/rest/cerere/all', this.loginService.configureHeaderOptionsForOAuth());
  }

  findById(id : number) : Observable<Cerere>{
    return this.serviciuHttpClient.get<Cerere>('http://localhost:8080/rest/cerere/by-id/'+id, this.loginService.configureHeaderOptionsForOAuth());

  }

  saveCerere(cerere : any){
      return this.serviciuHttpClient.post('http://localhost:8080/rest/cerere/save', cerere, this.loginService.configureHeaderOptionsForOAuth())
  }
  
  openDialog(message : string): Observable<any> {
    const dialogRef = this.dialog.open(AddCerereComponent, {
      width: '250px',
      data: {message : message, rezultat : {}} 
    });

    return dialogRef.afterClosed();
  }
}
