import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SortDirection } from '@angular/material/sort';
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


  // document
  findAllMatTable(type: string, sort: string, order: SortDirection, page: number): Observable<any> {
    console.log('cereri service - findAllMatTable with pagination')
    const reqUrlLocal = `http://localhost:8080/rest/cerere/all-paginated/${type}/${page}/5/${sort}/${order}`;
    return this.serviciuHttpClient.get<any>(reqUrlLocal, this.loginService.configureHeaderOptionsForOAuth());
  }


  // detailed
  findAllMatTableDetailed(type: string, sort: string, order: SortDirection, page: number): Observable<any> {
    console.log('cereri service - findAllMatTable with pagination')
    const reqUrlLocal = `http://localhost:8080/rest/cerere/all-paginated-detailed/${type}/${page}/5/${sort}/${order}`;
    return this.serviciuHttpClient.get<any>(reqUrlLocal, this.loginService.configureHeaderOptionsForOAuth());
  }


  // http://localhost:8080/rest/cerere/get-groups-for-cerere/2
  findAllGrupuriForCerere(idCererii: number) : Observable<Cerere[]>{
    return this.serviciuHttpClient.get<any[]>('http://localhost:8080/rest/cerere/get-groups-for-cerere/' + idCererii, this.loginService.configureHeaderOptionsForOAuth());
  }
  

  findById(id : number) : Observable<Cerere>{
    return this.serviciuHttpClient.get<Cerere>('http://localhost:8080/rest/cerere/by-id/'+id, this.loginService.configureHeaderOptionsForOAuth());

  }

  saveCerere(cerere : any){
      return this.serviciuHttpClient.post('http://localhost:8080/rest/cerere/save', cerere, this.loginService.configureHeaderOptionsForOAuth())
  }
  


  // save-with-users-cerere-detailed


  // saveCerereDetailedWithUsersAndPriority(cerereDetailed: any, usersSelected: any[]){
  //   for(let u of usersSelected){
  //     u.canInterrupt = u.canInterrupt ? 1 : 0;
  //   }
  //   const obiect = {
  //     cerereDetailed: cerereDetailed,
  //     usersSelected: usersSelected
  //   };
  //   return this.serviciuHttpClient.post('http://localhost:8080/rest/cerere/save-with-users-cerere-detailed', obiect, this.loginService.configureHeaderOptionsForOAuth())

  // }
  

  saveCerereWithUsersAndPriority(cerere: any, cerereDetailed: any, usersSelected: any[], type: string) : Observable<Cerere>{
    for(let u of usersSelected){
      u.canInterrupt = u.canInterrupt ? 1 : 0;
    }
    // comment - saved o cerere nu o cerere detailed
    // const obiect = {
    //   cerere: cerere,
    //   usersSelected: usersSelected
    // };
    const obiect = {
      cerere: cerere,
      usersSelected: usersSelected,
      cerereDetailed: cerereDetailed

    };
    return this.serviciuHttpClient.post<Cerere>(`http://localhost:8080/rest/cerere/save-with-users/${type}`, obiect, this.loginService.configureHeaderOptionsForOAuth())

  }
  
  openDialog(message : string): Observable<any> {
    const dialogRef = this.dialog.open(AddCerereComponent, {
      width: '250px',
      data: {message : message, rezultat : {}} 
    });

    return dialogRef.afterClosed();
  }
}
