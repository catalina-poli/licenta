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



  /**
   * 
   * @param categorySearch enum motiv|judet|email
   * @param cuvantCautat 
   * @param sort 
   * @param order 
   * @param page 
   * @returns 
   */
  searchMatTable(categorySearch: string, cuvantCautat: string,sort: string, order: SortDirection, page: number): Observable<any> {
    console.log('cereri service - findAllMatTable with pagination')
    const reqUrlLocal = `${environment.serverPath}/es/cereri/search-by/${categorySearch}/${cuvantCautat}/${page}/5/${sort}/${order}`;
    return this.serviciuHttpClient.get<any>(reqUrlLocal, this.loginService.configureHeaderOptionsForOAuth());
  }

  searchMatTableNoFilter(sort: string, order: SortDirection, page: number): Observable<any> {
    console.log('cereri service - findAllMatTable with pagination')
    // cereri-pagination/{page}/{size}/{sort}/{order}
    const reqUrlLocal = `${environment.serverPath}/es/cereri-pagination/${page}/5/${sort}/${order}`;
    return this.serviciuHttpClient.get<any>(reqUrlLocal, this.loginService.configureHeaderOptionsForOAuth());
  }

}
