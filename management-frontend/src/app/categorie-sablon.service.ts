import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { CategorieSablonModel } from './model/categorie-sablon';

@Injectable({
  providedIn: 'root'
})
export class CategorieSablonService {

  constructor(
    private serviciuHttpClient: HttpClient,
    private loginService: LoginService,
    public dialog: MatDialog) {

  }

  findAllCategoriiSablonRadacina() : Observable<CategorieSablonModel[]>{
    return this.serviciuHttpClient.get<CategorieSablonModel[]>('http://localhost:8080/rest/sabloane-categorii/get-root-categorii', this.loginService.configureHeaderOptionsForOAuth());
  }

  
  findAllCategoriiSablonChildrenForParent(idParent: number) : Observable<CategorieSablonModel[]>{
    return this.serviciuHttpClient.get<CategorieSablonModel[]>(`http://localhost:8080/rest/sabloane-categorii/get-children/${idParent}`, this.loginService.configureHeaderOptionsForOAuth());
  }

  



}
