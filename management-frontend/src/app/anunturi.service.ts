import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { AddAnuntComponent } from './add-anunt/add-anunt.component';
import { LoginService } from './login.service';
import { Anunt } from './model/anunt';

@Injectable({
  providedIn: 'root'
})
export class AnunturiService {

  constructor(private serviciuHttpClient: HttpClient, private loginService: LoginService,
    public dialog: MatDialog) { }

  findAllAnunturi(): Observable<Anunt[]> {
    return this.serviciuHttpClient.get<Anunt[]>('http://localhost:8080/rest/anunturi/all', this.loginService.configureHeaderOptionsForOAuth());
  }
  findAllMatTable(sort: string, order: SortDirection, page: number): Observable<any> {

    const reqUrlLocal = `http://localhost:8080/rest/anunturi/all-paginated/${page}/5/${sort}/${order}`;
    return this.serviciuHttpClient.get<any>(reqUrlLocal, this.loginService.configureHeaderOptionsForOAuth());
  }

  findOneAnunt(id: number): Observable<Anunt> {
    return this.serviciuHttpClient.get<Anunt>('http://localhost:8080/rest/anunturi/select-by-id/' + id, this.loginService.configureHeaderOptionsForOAuth());
  }

  saveAnunt(anunt: Anunt): Observable<Anunt> {
    return this.serviciuHttpClient.post('http://localhost:8080/rest/anunturi/save', anunt, this.loginService.configureHeaderOptionsForOAuth())
  }

  deleteAnunt(anunt: Anunt): Observable<Anunt> {
    return this.serviciuHttpClient.delete('http://localhost:8080/rest/anunturi/delete/' + anunt.id, this.loginService.configureHeaderOptionsForOAuth());
  }


  updateAnunt(anunt: Anunt): Observable<Anunt> {
    return this.serviciuHttpClient.put('http://localhost:8080/rest/anunturi/update', anunt, this.loginService.configureHeaderOptionsForOAuth());
  }

  functieSir(): string {
    return 'hello';
  }




  openDialog(message: string): Observable<any> {
    const dialogRef = this.dialog.open(AddAnuntComponent, {
      width: '250px',
      data: { message: message, rezultat: {} }
    });

    return dialogRef.afterClosed();
  }

}
