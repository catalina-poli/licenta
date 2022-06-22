import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  // send the access token with a request
  configureHeaderOptionsForOAuth() {
    let headers =
      new HttpHeaders({
        // 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem("CHEIE_OAUTH")
      });
    const options = {
      headers: headers
    }
    return options;
  }

  findAllRoles() : Observable<any[]>{
    return this.httpClient.get<any[]>(`${environment.serverPath}/security/useri/all-roles`);
  }
  // configureHeaderOptionsForOAuthPOST() {
  //   let headers =
  //     new HttpHeaders({
  //       'Authorization': 'Bearer ' + localStorage.getItem("CHEIE_OAUTH")
  //     });
  //   const options = {
  //     headers: headers
  //   }
  //   return options;
  // }


  configureHeaderOptionsForOAuthPdf() {
    let headers =
      new HttpHeaders({
        // 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + localStorage.getItem("CHEIE_OAUTH")
      });
    headers.set('Accept', 'application/pdf');
    const options = {
      headers: headers,
      responseType: 'blob'
    }
    return options;
  }

  // called from login
  obtainAccessToken(username: string, password: string): Observable<any> {
    // let params = new URLSearchParams();
    const params2 = {
      username: username,
      password: password,
      grant_type: 'password',
      client_id: 'my-client'
    };

    let headers =
      new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa("my-client:my-secret")
      });
    const options = {
      headers: headers,
      params: params2
    }




    return this.httpClient.post('http://localhost:8080/oauth/token', params2, options);
    // .map(res => res.json())
    // .subscribe(
    //   data => this.saveToken(data),
    //   err => alert('Invalid Credentials')); 
  }

 
}
