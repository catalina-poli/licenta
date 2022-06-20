import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import {environment} from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EsSearchService {

  
  constructor(private serviciuHttpClient: HttpClient, private loginService : LoginService, public dialog: MatDialog) { }

  // TODO: add un enum pentru categorii
  // search(categorieSearch: string, cuvantCautat: string) : Observable<any[]>{
  //   return this.serviciuHttpClient.get<any[]>(`${environment.serverPath}/es/cereri/search-by/${categorieSearch}/${cuvantCautat}`, this.loginService.configureHeaderOptionsForOAuth());
  // }

  searchMatTable( cuvantCautat: string,sort: string, order: SortDirection, page: number): Observable<any> {
    console.log('cereri service - findAllMatTable with pagination')
    const reqUrlLocal = `${environment.serverPath}/es/cereri/search-by/${cuvantCautat}/${page}/5/${sort}/${order}`;
    return this.serviciuHttpClient.get<any>(reqUrlLocal, this.loginService.configureHeaderOptionsForOAuth());
  }

}
